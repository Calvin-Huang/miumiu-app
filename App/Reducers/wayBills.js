/**
 * Created by Calvin Huang on 2/24/17.
 */

import {
  REQUESTED_WAYBILLS,
  RECEIVED_WAYBILLS_SUCCESS,
  RECEIVED_WAYBILLS_FAILED,
} from '../Constants/actionTypes';

import humps from 'humps';

import { WayBillState } from '../Constants/states';

const initialState = {
  data: [],
  currentPage: 1,
  isFetching: false,
  error: null,
};

export default function wayBills(state = initialState, action) {
  const filterCondition = (wayBill) => {
    return wayBill.status !== WayBillState.PICKED_UP && wayBill.status !== WayBillState.UNKNOWN_OWNER
  } ;

  switch (action.type) {
    case REQUESTED_WAYBILLS:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case RECEIVED_WAYBILLS_SUCCESS: {

      const { data, per_page: perPage, current_page: currentPage, total } = action.response;
      const hasNextPage = (perPage * currentPage) < total;

      return {
        data: [ ...state.data, ...humps.camelizeKeys(data.filter(filterCondition)) ],
        currentPage,

        // TRUE when need to fetch next page for infinity scroll.
        isFetching: hasNextPage,
        error: null,
      };
    }
    case RECEIVED_WAYBILLS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
