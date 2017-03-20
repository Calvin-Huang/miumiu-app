/**
 * Created by Calvin Huang on 2/24/17.
 */

import React from 'react-native';

import * as ActionTypes from '../Constants/actionTypes';
import { fetchWayBillsSuccess, fetchWayBillsFailed } from '../Actions/wayBillActions';
import { get } from '../Utils/api';

export function fetchWayBills(action$) {
  return action$.ofType(ActionTypes.REQUESTED_WAYBILLS)
    .switchMap(async (action) => {
      try {
        const { data, per_page: perPage, current_page: currentPage, total } = await get('board', { page: action.page });
        const hasNextPage = (perPage * currentPage) > total;

        action.callback(data, { allLoaded: hasNextPage });

        return fetchWayBillsSuccess(data);
      } catch (error) {
        return fetchWayBillsFailed(error);
      }
    });
}
