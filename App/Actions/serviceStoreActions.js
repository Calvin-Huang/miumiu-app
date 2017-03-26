/**
 * Created by calvin.huang on 26/03/2017.
 */

import * as Actions from '../Constants/actionTypes';

export function fetchServiceStores() {
  return {
    type: Actions.FETCH_SERVICE_STORES,
  };
}

export function fetchServiceStoresSuccess(response) {
  return {
    type: Actions.FETCH_SERVICE_STORES_SUCCESS,
    response,
  };
}

export function fetchServiceStoresFailed(error) {
  return {
    type: Actions.FETCH_SERVICE_STORES_FAILED,
    error,
  };
}

export function refreshServiceStores() {
  return {
    type: Actions.REFRESH_SERVICE_STORES,
  };
}

export function refreshServiceStoresSuccess(response) {
  return {
    type: Actions.REFRESH_SERVICE_STORES_SUCCESS,
    response,
  };
}

export function fetchServiceStore(id) {
  return {
    type: Actions.FETCH_FAQ,
    id,
  };
}

export function fetchServiceStoreSuccess(response) {
  return {
    type: Actions.FETCH_FAQ_SUCCESS,
    response,
  };
}

export function fetchServiceStoreFailed(error) {
  return {
    type: Actions.FETCH_FAQ_FAILED,
    error,
  };
}
