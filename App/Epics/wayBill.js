/**
 * Created by Calvin Huang on 2/24/17.
 */

import React from 'react-native';

import * as ActionTypes from '../Constants/actionTypes';
import {
  fetchWayBillsSuccess,
  fetchWayBillsFailed,
  refreshWayBillsSuccess,
  refreshWayBillsFailed,
} from '../Actions/wayBillActions';
import { get } from '../Utils/api';

export function fetchWayBills(action$) {
  return action$.ofType(ActionTypes.REQUESTED_WAYBILLS)
    .concatMap(async (action) => {
      try {
        const response = await get('shipping', { page: action.currentPage });

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
        const response = await get('shipping', { page: 1 });

        return refreshWayBillsSuccess(response);
      } catch (error) {
        return refreshWayBillsFailed(error);
      }
    });
}
