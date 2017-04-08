/**
 * Created by Calvin Huang on 2/24/17.
 */

import React from 'react-native';

import { Observable } from 'rxjs';

import * as ActionTypes from '../Constants/actionTypes';
import {
  fetchWayBillsSuccess,
  fetchWayBillsFailed,
  refreshWayBillsSuccess,
  refreshWayBillsFailed,
  addWayBillSuccess,
  addWayBillFailed,
} from '../Actions/wayBillActions';
import { generalRequest, generalRequestSuccess, generalRequestFailed } from '../Actions/generalRequestActions';

import { get, post, del } from '../Utils/api';

export function fetchWayBills(action$) {
  return action$.ofType(ActionTypes.REQUESTED_WAYBILLS)
    .exhaustMap(async (action) => {
      try {
        const response = await get(`shipping?page=${action.currentPage}`);

        return fetchWayBillsSuccess(response);
      } catch (error) {
        return fetchWayBillsFailed(error, action.currentPage);
      }
    });
}

export function refreshingWayBills(action$) {
  return action$.ofType(ActionTypes.START_REFRESHING_WAYBILLS)
    .switchMap(async (_) => {
      try {
        // Reset to first page.
        const response = await get(`shipping?page=1`);

        return refreshWayBillsSuccess(response);
      } catch (error) {
        return refreshWayBillsFailed(error);
      }
    });
}

export function addingWayBill(action$) {
  return action$.ofType(ActionTypes.ADD_WAYBILL)
    .switchMap(async (action) => {
      try {
        const response = await post('shipping', { shipping_no: action.shippingNo });

        return addWayBillSuccess(response);
      } catch (error) {
        return addWayBillFailed(error);
      }
    });
}

export function urgentWayBill(action$) {
  return action$.ofType(ActionTypes.URGENT_WAYBILL)
    .switchMap((action) => {
      return Observable.concat(
        Observable.of(generalRequest()),
        (async () => {
          try {
            await post('shipping/urgent', { shipping_no: action.shippingNo, logistic: action.logistic });

            return generalRequestSuccess();
          } catch (error) {
            return generalRequestFailed(error);
          }
        })(),
      );
    });
}

export function deleteWayBill(action$) {
  return action$.ofType(ActionTypes.DELETE_WAYBILL)
    .switchMap((action) => {
      return Observable.concat(
        Observable.of(generalRequest()),
        (async () => {
          try {
            await del(`shipping/${action.hex}`);

            return generalRequestSuccess();
          } catch (error) {
            return generalRequestFailed(error);
          }
        })(),
      );
    });
}
