/**
 * Created by calvin.huang on 26/03/2017.
 */

import * as Actions from '../Constants/actionTypes';

export function fetchDeliveryInfoList() {
  return {
    type: Actions.FETCH_DELIVERY_INFO_LIST,
  };
}

export function fetchDeliveryInfoListSuccess(response) {
  return {
    type: Actions.FETCH_DELIVERY_INFO_LIST_SUCCESS,
    response,
  };
}

export function fetchDeliveryInfoListFailed(error) {
  return {
    type: Actions.FETCH_DELIVERY_INFO_LIST_FAILED,
    error,
  };
}

export function refreshDeliveryInfoList() {
  return {
    type: Actions.REFRESH_DELIVERY_INFO_LIST,
  };
}

export function refreshDeliveryInfoListSuccess(response) {
  return {
    type: Actions.REFRESH_DELIVERY_INFO_LIST_SUCCESS,
    response,
  };
}

export function fetchDeliveryInfo(id) {
  return {
    type: Actions.FETCH_DELIVERY_INFO,
    id,
  };
}

export function fetchDeliveryInfoSuccess(response) {
  return {
    type: Actions.FETCH_DELIVERY_INFO_SUCCESS,
    response,
  };
}

export function fetchDeliveryInfoFailed(error) {
  return {
    type: Actions.FETCH_DELIVERY_INFO_FAILED,
    error,
  };
}
