/**
 * Created by calvin.huang on 26/03/2017.
 */

import * as ActionTypes from '../Constants/actionTypes';
import {
  fetchDeliveryInfoListSuccess,
  fetchDeliveryInfoListFailed,
  refreshDeliveryInfoListSuccess,
  fetchDeliveryInfoSuccess,
  fetchDeliveryInfoFailed,
} from '../Actions/deliveryInfoActions';

import { get } from '../Utils/api';

export function fetchDeliveryInfoList(action$) {
  return action$.ofType(ActionTypes.FETCH_DELIVERY_INFO_LIST)
    .switchMap(async (_) => {
      try {
        const response = await get('store');

        console.log('>>>>>>>>>>>>>.');
        console.log(response);

        return fetchDeliveryInfoListSuccess(response);
      } catch (error) {
        return fetchDeliveryInfoListFailed(error);
      }
    });
}

export function refreshDeliveryInfoList(action$) {
  return action$.ofType(ActionTypes.REFRESH_DELIVERY_INFO_LIST)
    .switchMap(async (_) => {
      try {
        const response = await get('store');

        return refreshDeliveryInfoListSuccess(response);
      } catch (error) {
        return fetchFAQsFailed(error);
      }
    });
}

export function fetchDeliveryInfo(action$) {
  return action$.ofType(ActionTypes.FETCH_DELIVERY_INFO)
    .switchMap(async (action) => {
      try {
        const response = await get(`store/${action.id}`);

        return fetchDeliveryInfoSuccess(response);
      } catch (error) {
        return fetchDeliveryInfoFailed(error);
      }
    });
}
