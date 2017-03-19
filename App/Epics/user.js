/**
 * Created by Calvin Huang on 3/1/17.
 */

import { AsyncStorage } from 'react-native';

import * as ActionTypes from '../Constants/actionTypes';
import { userSignInSuccess, userSignInFailed, userSignOutSuccess } from '../Actions';
import { currentUser, signOut } from '../Utils/authentication';

import { post } from '../Utils/api';

export function checkUserSignedIn(action$) {
  return action$.ofType(ActionTypes.CHECK_USER_SIGNED_IN)
    .switchMap(async (_) => {
      const user = await currentUser();
      if (user) {
        return userSignInSuccess(user);
      } else {
        return userSignInFailed({ errorMessage: '尚未登入', statusCode: 401 });
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
        return userSignInFailed({ errorMessage: error.message, statusCode: error.code });
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
