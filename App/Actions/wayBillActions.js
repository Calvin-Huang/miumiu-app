/**
 * Created by Calvin Huang on 3/19/17.
 */

import * as Actions from '../Constants/actionTypes';

export function fetchWayBills(currentPage) {
  return {
    type: Actions.REQUESTED_WAYBILLS,
    currentPage,
  }
}

export function fetchWayBillsSuccess(response) {
  return {
    type: Actions.RECEIVED_WAYBILLS_SUCCESS,
    response,
  }
}

export function fetchWayBillsFailed(error) {
  return {
    type: Actions.RECEIVED_WAYBILLS_FAILED,
    error,
  }
}
