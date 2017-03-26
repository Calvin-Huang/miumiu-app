/**
 * Created by calvin.huang on 26/03/2017.
 */

import * as ActionTypes from '../Constants/actionTypes';
import {
  fetchServiceStoresSuccess,
  fetchServiceStoresFailed,
  refreshServiceStoresSuccess,

  fetchFAQFailed,
} from '../Actions/serviceStoreActions';

import { get } from '../Utils/api';

export function fetchServiceStores(action$) {
  return action$.ofType(ActionTypes.FETCH_SERVICE_STORES)
    .switchMap(async (_) => {
      try {
        const response = await get('location');

        return fetchServiceStoresSuccess(response);
      } catch (error) {
        return fetchServiceStoresFailed(error);
      }
    });
}

export function refreshServiceStores(action$) {
  return action$.ofType(ActionTypes.REFRESH_SERVICE_STORES)
    .switchMap(async (_) => {
      try {
        const response = await get('location');

        return refreshServiceStoresSuccess(response);
      } catch (error) {
        return fetchFAQsFailed(error);
      }
    });
}

export function fetchServiceStore(action$) {
  return action$.ofType(ActionTypes.FETCH_SERVICE_STORE)
    .switchMap(async (action) => {
      try {
        const response = await get(`location/${action.id}`);

        return fetchFAQSuccess(response);
      } catch (error) {
        return fetchFAQFailed(error);
      }
    });
}
