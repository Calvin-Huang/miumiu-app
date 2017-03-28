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

export function fetchWayBillsFailed(error, atPage) {
  return {
    type: Actions.RECEIVED_WAYBILLS_FAILED,
    error,
    atPage,
  }
}

export function refreshWayBills() {
  return {
    type: Actions.START_REFRESHING_WAYBILLS,
  }
}

export function refreshWayBillsSuccess(response) {
  return {
    type: Actions.REFRESH_WAYBILLS_SUCCESS,
    response,
  }
}

export function refreshWayBillsFailed(error) {
  return {
    type: Actions.REFRESH_WAYBILLS_FAILED,
    error,
  }
}

export function addWayBill(shippingNo) {
  return {
    type: Actions.ADD_WAYBILL,
    shippingNo,
  }
}

export function addWayBillSuccess(response) {
  return {
    type: Actions.ADD_WAYBILL_SUCCESS,
    response,
  }
}

export function addWayBillFailed(error) {
  return {
    type: Actions.ADD_WAYBILL_FAILED,
    error,
  }
}

export function urgentWayBill(shippingNo, logistic) {
  return {
    type: Actions.URGENT_WAYBILL,
    shippingNo,
    logistic,
  }
}
