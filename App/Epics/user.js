/**
 * Created by Calvin Huang on 3/1/17.
 */

import { AsyncStorage } from 'react-native';

import * as ActionTypes from '../Constants/actionTypes';
import { userSignInSuccess, userSignInFailed, userSignOutSuccess } from '../Actions';

export function checkUserSignedIn(action$) {
  return action$.ofType(ActionTypes.CHECK_USER_SIGNED_IN)
    .switchMap(async (_) => {
      const user = JSON.parse((await AsyncStorage.getItem('user')));
      if (user) {
        return userSignInSuccess(user);
      } else {
        return userSignInFailed({ errorMessage: '尚未登入', statusCode: 403 });
      }
    });
}

export function userSignIn(action$) {
  return action$.ofType(ActionTypes.USER_SIGN_IN)
    .switchMap(async ({ username, password }) => {
      if (username === 'calvin.peak' && password === '12364362') {
        const user = {
          id: 'fb:1231o23i1924812',
          name: 'Calvin Huang',
          gender: 'male',
        };

        AsyncStorage.setItem('user', JSON.stringify(user));

        return userSignInSuccess(user);
      } else {
        return userSignInFailed({ errorMessage: '帳號密碼錯誤', statusCode: 403 });
      }
    });
}

export function userSignOut(action$) {
  return action$.ofType(ActionTypes.USER_SIGN_OUT)
    .switchMap(async (_) => {

      await AsyncStorage.removeItem('user');

      return userSignOutSuccess();
    })
}
