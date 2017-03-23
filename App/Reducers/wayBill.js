/**
 * Created by calvin.huang on 23/03/2017.
 */

import humps from 'humps';

import { ADD_WAYBILL, ADD_WAYBILL_SUCCESS, ADD_WAYBILL_FAILED } from '../Constants/actionTypes';

const initialState = {
  isRequesting: false,
  data: null,
  error: null,
};

export default function wayBill(state = initialState, action) {
  switch (action.type) {
    case ADD_WAYBILL:
      return {
        isRequesting: true,
        data: {
          shippingNo: action.shippingNo,
        },
        error: null,
      };
    case ADD_WAYBILL_SUCCESS:
      const wayBill = humps.camelizeKeys(action.response);

      return {
        isRequesting: false,
        data: {
          ...wayBill,
        },
        error: null,
      };
    case ADD_WAYBILL_FAILED:
      return {
        ...state,
        isRequesting: false,
        error: action.error,
      };
    default:
      return state;
  }
}
