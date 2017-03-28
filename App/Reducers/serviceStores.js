/**
 * Created by calvin.huang on 26/03/2017.
 */

import {
  FETCH_SERVICE_STORES,
  FETCH_SERVICE_STORES_SUCCESS,
  FETCH_SERVICE_STORES_FAILED,
  REFRESH_SERVICE_STORES,
  REFRESH_SERVICE_STORES_SUCCESS,
  FETCH_SERVICE_STORE_SUCCESS,
} from '../Constants/actionTypes';

import humps from 'humps';

const initialState = {
  isFetching: false,
  isRefreshing: false,
  data: [],
  error: null,
};

export default function serviceStores(state = initialState, action) {
  switch (action.type) {
    case FETCH_SERVICE_STORES:
      return {
        isFetching: true,
        isRefreshing: false,
        data: [],
        error: null,
      };
    case FETCH_SERVICE_STORES_SUCCESS:
      return {
        isFetching: false,
        isRefreshing: false,
        data: action.response,
        error: null,
      };
    case FETCH_SERVICE_STORES_FAILED:
      return {
        isFetching: false,
        isRefreshing: false,
        data: [],
        error: action.error,
      };
    case REFRESH_SERVICE_STORES:
      return {
        ...state,
        isFetching: false,
        isRefreshing: true,
        error: null,
      };
    case REFRESH_SERVICE_STORES_SUCCESS:
      return {
        isFetching: false,
        isRefreshing: false,
        data: action.response,
        error: null,
      };
    case FETCH_SERVICE_STORE_SUCCESS:
      const { data } = state;
      const { response } = action;

      const serviceStore = data.find((eachData) => eachData.id === response.id);

      if (serviceStore) {
        data[data.indexOf(serviceStore)] = { ...serviceStore, ...humps.camelizeKeys(response) };
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
