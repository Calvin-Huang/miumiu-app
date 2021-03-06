/**
 * Created by Calvin Huang on 3/1/17.
 */

import {
  USER_SIGN_IN,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAILED,
  USER_SIGN_OUT,
  USER_REGISTER_SUCCESS,
  USER_RESEND_CONFIRM_CODE,
  USER_RESEND_CONFIRM_CODE_SUCCESS,
  USER_RESEND_CONFIRM_CODE_FAILED,
  USER_REQUEST_RESET_PASSWORD_SUCCESS,
  USER_RESEND_RESET_PASSWORD_CONFIRM_CODE,
  USER_RESEND_RESET_PASSWORD_CONFIRM_CODE_SUCCESS,
  USER_RESEND_RESET_PASSWORD_CONFIRM_CODE_FAILED,
  USER_INFO_UPDATED,
  SHOW_USER_QRCODE,
  HIDE_USER_QRCODE,
} from '../Constants/actionTypes';

const initialState = {

  isSigningIn: false,

  // Empty user for first time check in app launched.
  currentUser: {},
  previousSendTimestamp: null,
  result: {
    signedIn: null,
    error: null,
  },
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_SIGN_IN:
      return {
        ...state,
        previousSendTimestamp: null,
        isSigningIn: true,
      };
    case USER_SIGN_IN_SUCCESS:
      return {
        isSigningIn: false,
        previousSendTimestamp: null,
        currentUser: action.user,
        result: {
          signedIn: true,
          error: null,
        },
      };
    case USER_SIGN_IN_FAILED: {
      const { timestamp } = action.error;

      return {
        isSigningIn: false,
        currentUser: null,
        previousSendTimestamp: timestamp,
        result: {
          signedIn: false,
          error: (timestamp ? null : action.error),
        },
      };
    }
    case USER_SIGN_OUT:
      return {
        ...initialState,
        previousSendTimestamp: null,
        isSigningIn: false,
        currentUser: null,
      };
    case USER_INFO_UPDATED:
      return {
        ...state,
        currentUser: action.user,
      };
    default:
      return state;
  }
}

export function register(state = { timestamp: null }, action) {
  switch (action.type) {
    case USER_REGISTER_SUCCESS:
      return {
        timestamp: action.response.timestamp,
      };
    default:
      return state;
  }
}

export function resendConfirmCode(state = { isRequesting: false, timestamp: null, error: null }, action) {
  switch (action.type) {
    case USER_RESEND_CONFIRM_CODE:
      return {
        isRequesting: true,
        timestamp: null,
        error: null,
      };
    case USER_RESEND_CONFIRM_CODE_SUCCESS:
      return {
        isRequesting: false,
        timestamp: action.response.timestamp,
        error: null,
      };
    case USER_RESEND_CONFIRM_CODE_FAILED:
      return {
        isRequesting: false,
        timestamp: null,
        error: action.error,
      };
    default:
      return state;
  }
}

export function requestResetPassword(state = { timestamp: null }, action) {
  switch (action.type) {
    case USER_REQUEST_RESET_PASSWORD_SUCCESS:
      return {
        timestamp: action.response.timestamp,
      };
    default:
      return state;
  }
}

export function resendResetPasswordConfirmCode(state = { isRequesting: false, timestamp: null, error: null }, action) {
  switch (action.type) {
    case USER_RESEND_RESET_PASSWORD_CONFIRM_CODE:
      return {
        isRequesting: true,
        timestamp: null,
        error: null,
      };
    case USER_RESEND_RESET_PASSWORD_CONFIRM_CODE_SUCCESS:
      return {
        isRequesting: false,
        timestamp: action.response.timestamp,
        error: null,
      };
    case USER_RESEND_RESET_PASSWORD_CONFIRM_CODE_FAILED:
      return {
        isRequesting: false,
        timestamp: null,
        error: action.error,
      };
    default:
      return state;
  }
}

export function userQRCodeModal(state = { show: false }, action) {
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
      return state;
  }
}
