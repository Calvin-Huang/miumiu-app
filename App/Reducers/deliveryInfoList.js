/**
 * Created by calvin.huang on 26/03/2017.
 */

import {
  FETCH_DELIVERY_INFO_LIST,
  FETCH_DELIVERY_INFO_LIST_SUCCESS,
  FETCH_DELIVERY_INFO_LIST_FAILED,
  REFRESH_DELIVERY_INFO_LIST,
  REFRESH_DELIVERY_INFO_LIST_SUCCESS,
  FETCH_DELIVERY_INFO_SUCCESS,
} from '../Constants/actionTypes';

import humps from 'humps';

const initialState = {
  isFetching: false,
  isRefreshing: false,
  data: [],
  error: null,
};

export default function deliveryInfoList(state = initialState, action) {
  switch (action.type) {
    case FETCH_DELIVERY_INFO_LIST:
      return {
        isFetching: true,
        isRefreshing: false,
        data: [],
        error: null,
      };
    case FETCH_DELIVERY_INFO_LIST_SUCCESS:
      return {
        isFetching: false,
        isRefreshing: false,
        data: action.response,
        error: null,
      };
    case FETCH_DELIVERY_INFO_LIST_FAILED:
      return {
        isFetching: false,
        isRefreshing: false,
        data: [],
        error: action.error,
      };
    case REFRESH_DELIVERY_INFO_LIST:
      return {
        ...state,
        isFetching: false,
        isRefreshing: true,
        error: null,
      };
    case REFRESH_DELIVERY_INFO_LIST_SUCCESS:
      return {
        isFetching: false,
        isRefreshing: false,
        data: action.response,
        error: null,
      };
    case FETCH_DELIVERY_INFO_SUCCESS:
      const { data } = state;
      const { response } = action;

      const deliveryInfo = data.find((eachData) => eachData.id === response.id);

      if (deliveryInfo) {
        data[data.indexOf(deliveryInfo)] = { ...deliveryInfo, ...humps.camelizeKeys(response) };
      } else {
        data.push({ ...humps.camelizeKeys(response) });
      }

      return {
        ...state,
        data,
      };
    default:
      return state;
  }
}
