/**
 * Created by Calvin Huang on 3/1/17.
 */

import {
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAILED,
  USER_SIGN_OUT,
  SHOW_USER_QRCODE,
  HIDE_USER_QRCODE,
} from '../Constants/actionTypes';

const initialState = {

  // Empty user for first time check in app launched.
  currentUser: {},
  result: {
    signedIn: null,
    errorMessage: null,
    statusCode: null,
  }
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_SIGN_IN_SUCCESS:
      return {
        currentUser: action.user,
        result: {
          signedIn: true,
          errorMessage: null,
          statusCode: null,
        }
      };
    case USER_SIGN_IN_FAILED:
      return {
        currentUser: null,
        result: {
          signedIn: false,
          errorMessage: action.errorMessage,
          statusCode: action.statusCode,
        }
      };
    case USER_SIGN_OUT:
      return {
        ...initialState,
        currentUser: null,
      };
    default:
      return state;
  }
}

export function userQRCodeModal(state , action) {
  switch (action.type) {
    case SHOW_USER_QRCODE:
      return {
        show: true,
      };
    case HIDE_USER_QRCODE:
      return {
        show: false,
      };
    default:
      return {
        show: false,
      };
  }
}
