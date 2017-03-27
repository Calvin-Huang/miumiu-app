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

export function userSignInFailed(error) {
  return {
    type: ActionTypes.USER_SIGN_IN_FAILED,
    error,
  };
}

export function userRegister(account, password, passwordConfirmation) {
  return {
    type: ActionTypes.USER_REGISTER,
    account,
    password,
    passwordConfirmation,
  };
}

export function userRegisterSuccess(response) {
  return {
    type: ActionTypes.USER_REGISTER_SUCCESS,
    response,
  };
}

export function userConfirmRegistration(phone, confirmCode) {
  return {
    type: ActionTypes.USER_CONFIRM_REGISTRATION_CODE,
    phone,
    confirmCode,
  };
}

export function userResendConfirmCode(account) {
  return {
    type: ActionTypes.USER_RESEND_CONFIRM_CODE,
    account,
  };
}

export function userResendConfirmCodeSuccess(response) {
  return {
    type: ActionTypes.USER_RESEND_CONFIRM_CODE_SUCCESS,
    response,
  };
}

export function userResendConfirmCodeFailed(error) {
  return {
    type: ActionTypes.USER_RESEND_CONFIRM_CODE_FAILED,
    error,
  };
}

export function userRequestResetPassword(account) {
  return {
    type: ActionTypes.USER_REQUEST_RESET_PASSWORD,
    account,
  };
}

export function userRequestResetPasswordSuccess(response) {
  return {
    type: ActionTypes.USER_REQUEST_RESET_PASSWORD_SUCCESS,
    response,
  };
}

export function userConfirmResetPasswordCode(phone, confirmCode) {
  return {
    type: ActionTypes.USER_CONFIRM_RESET_PASSWORD_CODE,
    phone,
    confirmCode,
  };
}

export function userResendResetPasswordConfirmCode(account) {
  return {
    type: ActionTypes.USER_RESEND_RESET_PASSWORD_CONFIRM_CODE,
    account,
  };
}

export function userResendResetPasswordConfirmCodeSuccess(response) {
  return {
    type: ActionTypes.USER_RESEND_RESET_PASSWORD_CONFIRM_CODE_SUCCESS,
    response,
  };
}

export function userResendResetPasswordConfirmCodeFailed(error) {
  return {
    type: ActionTypes.USER_RESEND_RESET_PASSWORD_CONFIRM_CODE_FAILED,
    error,
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
