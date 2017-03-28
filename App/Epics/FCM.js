/**
 * Created by calvin.huang on 28/03/2017.
 */

import { AsyncStorage } from 'react-native';

import FCM from 'react-native-fcm';

import { put, del } from '../Utils/api';

import * as ActionTypes from '../Constants/actionTypes';
import {
  FCMSubscribeStateResult,
  FCMSubscribeStateUpdated,
} from '../Actions/FCMActions';

export function checkSubscribeStatus(action$) {
  return action$.ofType(ActionTypes.CHECK_FCM_SUBSCRIBE_STATUS)
    .switchMap(async (action) => {
      const json = await AsyncStorage.getItem('fcm:broadcast');
      const { toAll, toMe } = JSON.parse(json || '{}');

      // If there is no stored value, default true.
      return FCMSubscribeStateResult(
        (toAll === null || toAll === undefined) ? true : toAll,
        (toMe === null || toMe === undefined) ? true : toMe,
      );
    });
}

export function updateSubscribe(action$) {
  return action$.ofType(ActionTypes.FCM_SUBSCRIBE_STATUS_RESULT)
    .switchMap(async (action) => {
      const { toAll, toMe } = action;
      const json = await AsyncStorage.getItem('fcm:broadcast');
      const subscribed = JSON.parse(json || '{}');
      try {
        if (toAll !== null) {
          if (toAll) {
            FCM.subscribeToTopic('general');
          } else {
            FCM.unsubscribeFromTopic('general');
          }

          subscribed.toAll = toAll;
        }
      } catch (error) {
      }

      try {
        if (toMe !== null) {
          if (toMe) {
            const token = await FCM.getFCMToken();
            put('fcm_token', { fcm_token: token });
          } else {
            del('fcm_token');
          }

          subscribed.toMe = toMe;
        }
      } catch (error) {
      }

      await AsyncStorage.setItem('fcm:broadcast', JSON.stringify(subscribed));

      return FCMSubscribeStateUpdated();
    });
}
