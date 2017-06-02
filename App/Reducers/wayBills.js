/**
 * Created by Calvin Huang on 2/24/17.
 */

import humps from 'humps';

import {
  REQUESTED_WAYBILLS,
  RECEIVED_WAYBILLS_SUCCESS,
  RECEIVED_WAYBILLS_FAILED,
  START_REFRESHING_WAYBILLS,
  REFRESH_WAYBILLS_SUCCESS,
  REFRESH_WAYBILLS_FAILED,
} from '../Constants/actionTypes';

import { WayBillState } from '../Constants/states';

const initialState = {
  data: [],
  currentPage: 1,
  isRefreshing: false,
  isFetching: false,
  error: null,
  amount: 0,
};

export default function wayBills(state = initialState, action) {
  const filterCondition = wayBill => (
    wayBill.status !== WayBillState.PICKED_UP && wayBill.status !== WayBillState.UNKNOWN_OWNER
  );

  switch (action.type) {
    case REQUESTED_WAYBILLS:
      return {
        ...state,
        isRefreshing: false,
        isFetching: true,
        error: null,
      };
    case RECEIVED_WAYBILLS_SUCCESS: {
      const { data, per_page: perPage, current_page: currentPage, total } = action.response;
      const hasNextPage = (perPage * currentPage) < total;

      const allData = [...state.data, ...humps.camelizeKeys(data.filter(filterCondition))];
      const amount = allData
        .reduce((accumulator, currentValue) => {
          if (currentValue.status === WayBillState.ARRIVED) {
            return accumulator + currentValue.fee + currentValue.stockFee;
          }

          return accumulator;
        }, 0);

      return {
        data: allData,
        currentPage,
        isRefreshing: false,

        // TRUE when need to fetch next page for infinity scroll.
        isFetching: hasNextPage,
        error: null,
        amount,
      };
    }
    case RECEIVED_WAYBILLS_FAILED:
      return {
        ...state,
        currentPage: action.atPage,
        isRefreshing: false,
        isFetching: false,
        error: action.error,
      };
    case START_REFRESHING_WAYBILLS:
      return {
        ...state,
        isRefreshing: true,
        isFetching: false,
        error: null,
      };
    case REFRESH_WAYBILLS_SUCCESS: {
      const { data, per_page: perPage, current_page: currentPage, total } = action.response;
      const hasNextPage = (perPage * currentPage) < total;

      const allData = humps.camelizeKeys(data.filter(filterCondition));
      const amount = allData
        .reduce((accumulator, currentValue) => {
          if (currentValue.status === WayBillState.ARRIVED) {
            return accumulator + currentValue.fee + currentValue.stockFee;
          }

          return accumulator;
        }, 0);

      return {
        data: allData,
        currentPage,
        isRefreshing: false,

        // TRUE when need to fetch next page for infinity scroll.
        isFetching: hasNextPage,
        error: null,
        amount,
      };
    }
    case REFRESH_WAYBILLS_FAILED:
      return {
        data: [],
        currentPage: 1,
        isRefreshing: false,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
