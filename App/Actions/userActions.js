/**
 * Created by Calvin Huang on 3/1/17.
 */

import * as ActionTypes from '../Constants/actionTypes';

export function checkUserSignedIn() {
  return {
    type: ActionTypes.CHECK_USER_SIGNED_IN,
  };
}

export function userSignIn(account, password) {
  return {
    type: ActionTypes.USER_SIGN_IN,
    account: account,
    password: password,
  };
}

export function userSignInSuccess(user) {
  return {
    type: ActionTypes.USER_SIGN_IN_SUCCESS,
    user,
  };
}

export function userSignInFailed({ errorMessage, statusCode }) {
  return {
    type: ActionTypes.USER_SIGN_IN_FAILED,
    errorMessage: errorMessage,
    statusCode: statusCode,
  };
}

export function userSignOut() {
  return {
    type: ActionTypes.USER_SIGN_OUT,
  };
}

export function userSignOutSuccess() {
  return {
    type: ActionTypes.USER_SIGN_OUT_SUCCESS,
  };
}

export function showUserQRCode() {
  return {
    type: ActionTypes.SHOW_USER_QRCODE,
  };
}

export function hideUserQRCode() {
  return {
    type: ActionTypes.HIDE_USER_QRCODE,
  };
}
