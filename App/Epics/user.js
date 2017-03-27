/**
 * Created by Calvin Huang on 3/1/17.
 */

import { AsyncStorage } from 'react-native';

import { Observable } from 'rxjs';

import HttpError from 'standard-http-error';

import * as ActionTypes from '../Constants/actionTypes';
import {
  userSignInSuccess,
  userSignInFailed,
  userSignOutSuccess,
  userRegisterSuccess,
  userResendConfirmCodeSuccess,
  userResendConfirmCodeFailed,
  userRequestResetPasswordSuccess,
  generalRequest,
  generalRequestSuccess,
  generalRequestFailed,
} from '../Actions';
import { currentUser, signOut } from '../Utils/authentication';
import { DEEP_LINK_PROTOCOL } from '../Constants/config';

import { post } from '../Utils/api';

export function checkUserSignedIn(action$) {
  return action$.ofType(ActionTypes.CHECK_USER_SIGNED_IN)
    .switchMap(async (_) => {
      const user = await currentUser();
      if (user) {
        return userSignInSuccess(user);
      } else {
        return userSignInFailed(new HttpError(401, '尚未登入'));
      }
    });
}

export function userSignIn(action$) {
  return action$.ofType(ActionTypes.USER_SIGN_IN)
    .switchMap(async ({ account, password }) => {

      try {
        await post('auth/login', { account, password });

        const user = await currentUser();

        return userSignInSuccess(user);
      } catch (error) {
        return userSignInFailed(error);
      }
    });
}

export function userSignOut(action$) {
  return action$.ofType(ActionTypes.USER_SIGN_OUT)
    .switchMap(async (_) => {

      // Remove stored token
      await signOut();

      return userSignOutSuccess();
    })
}

export function userRegister(action$) {
  return action$.ofType(ActionTypes.USER_REGISTER)
    .switchMap((action) => {
      return new Observable(async (observer) => {
        observer.next(generalRequest());

        try {
          const { account, password, passwordConfirmation: confirm } = action;
          const response = await post('auth/register', { account, password, confirm, redirect_uri: `${DEEP_LINK_PROTOCOL}://register/complete` });

          observer.next(userRegisterSuccess(response));
          observer.next(generalRequestSuccess());
        } catch (error) {
          observer.next(generalRequestFailed(error));
        }

        observer.complete();
      });
    });
}

export function userConfirmRegistration(action$) {
  return action$.ofType(ActionTypes.USER_CONFIRM_REGISTRATION_CODE)
    .switchMap((action) => {
      return new Observable(async (observer) => {
        observer.next(generalRequest());

        try {
          const { phone: mobile, confirmCode: code } = action;
          await post('auth/confirm', { mobile, code });

          observer.next(generalRequestSuccess());
        } catch (error) {
          observer.next(generalRequestFailed(error));
        }
      });
    });
}

export function userResendConfirmCode(action$) {
  return action$.ofType(ActionTypes.USER_RESEND_CONFIRM_CODE)
    .switchMap(async (action) => {
      try {
        const { account } = action;
        const response = await post('auth/register/retry', { account });

        return userResendConfirmCodeSuccess(response);
      } catch (error) {
        return userResendConfirmCodeFailed(error);
      }
    });
}

export function userRequestResetPassword(action$) {
  return action$.ofType(ActionTypes.USER_REQUEST_RESET_PASSWORD)
    .switchMap((action) => {
      return new Observable(async (observer) => {
        observer.next(generalRequest());

        try {
          const { account } = action;
          const response = await post('auth/forget', { account, redirect_uri: `${DEEP_LINK_PROTOCOL}://forget/complete` });

          observer.next(userRequestResetPasswordSuccess(response));
          observer.next(generalRequestSuccess());
        } catch (error) {
          observer.next(generalRequestFailed(error));
        }

        observer.complete();
      });
    });
}

export function userConfirmResetPasswordCode(action$) {
  return action$.ofType(ActionTypes.USER_CONFIRM_RESET_PASSWORD_CODE)
    .switchMap((action) => {
      return new Observable(async (observer) => {
        observer.next(generalRequest());

        try {
          const { phone: mobile, confirmCode: code, password, confirmPassword: confirm } = action;
          await post('auth/forget/mobile', { mobile, code, password, confirm });

          observer.next(generalRequestSuccess());
        } catch (error) {
          observer.next(generalRequestFailed(error));
        }
      });
    });
}
