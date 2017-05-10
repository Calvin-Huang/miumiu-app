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
  userResendResetPasswordConfirmCodeSuccess,
  userResendResetPasswordConfirmCodeFailed,
  userInfoUpdated,
  fetchBadges,
  checkFCMSubscribeStatus,
  generalRequest,
  generalRequestSuccess,
  generalRequestFailed,
  openSideDrawer,
} from '../Actions';
import { currentUser, signOut } from '../Utils/authentication';
import { DEEP_LINK_PROTOCOL } from '../Constants/config';

import { post, put } from '../Utils/api';

export function checkUserSignedIn(action$) {
  return action$.ofType(ActionTypes.CHECK_USER_SIGNED_IN)
    .exhaustMap((_) => {
      return new Observable(async (observer) => {
        const user = await currentUser();
        if (user) {
          observer.next(userSignInSuccess(user));
          observer.next(checkFCMSubscribeStatus());
          observer.next(fetchBadges());
        } else {
          observer.next(userSignInFailed(new HttpError(401, '尚未登入')));
        }

        observer.complete();
      })
    });
}

export function userSignIn(action$) {
  return action$.ofType(ActionTypes.USER_SIGN_IN)
    .switchMap(({ account, password }) => {
      return new Observable(async (observer) => {

        try {
          await post('auth/login', { account, password });

          const user = await currentUser();

          observer.next(userSignInSuccess(user));
          observer.next(checkFCMSubscribeStatus());
          observer.next(fetchBadges());
        } catch (error) {
          observer.next(userSignInFailed(error));
        }
        observer.complete();
      });
    });
}

export function afterUserSignIn(action$) {
  return action$.ofType(ActionTypes.USER_SIGN_IN_SUCCESS)
    .map((_) => {
      return openSideDrawer();
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
          const { account, name, password, passwordConfirmation: confirm } = action;
          const response = await post('auth/register', { account, name, password, confirm, redirect_uri: `${DEEP_LINK_PROTOCOL}://register/complete` });

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

        observer.complete();
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
          const response = await post('auth/forgot', { account, redirect_uri: `${DEEP_LINK_PROTOCOL}://forgot/complete` });

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
          const { phone: mobile, confirmCode: code, password, passwordConfirmation: confirm } = action;
          await post('auth/forgot/mobile', { mobile, code, password, confirm });

          observer.next(generalRequestSuccess());
        } catch (error) {
          observer.next(generalRequestFailed(error));
        }

        observer.complete();
      });
    });
}

export function userResendResetPasswordConfirmCode(action$) {
  return action$.ofType(ActionTypes.USER_RESEND_RESET_PASSWORD_CONFIRM_CODE)
    .switchMap(async (action) => {
      try {
        const { account } = action;
        const response = await post('auth/forgot', { account, redirect_uri: `${DEEP_LINK_PROTOCOL}://forgot/complete` });

        return userResendResetPasswordConfirmCodeSuccess(response);
      } catch (error) {
        return userResendResetPasswordConfirmCodeFailed(error);
      }
    });
}

export function userInfo(action$) {
  return action$.ofType(ActionTypes.UPDATE_USER_INFO)
    .switchMap((action) => {
      return new Observable(async (observer) => {
        observer.next(generalRequest());

        try {
          const { name } = action;
          await put('me', { name });

          // Update cached currentUser
          const user = await currentUser();
          observer.next(userInfoUpdated(user));
          observer.next(generalRequestSuccess());
        } catch (error) {
          observer.next(generalRequestFailed(error));
        }

        observer.complete();
      });
    });
}
