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
      const subscribedBroadcastToAll = await AsyncStorage.getItem('fcm:broadcast:all');
      const subscribedBroadcastToMe = await AsyncStorage.getItem('fcm:broadcast:me');

      // If there is no stored value, default true.
      return FCMSubscribeStateResult(
        (subscribedBroadcastToAll === null) ? true : subscribedBroadcastToAll,
        (subscribedBroadcastToMe === null) ? true : subscribedBroadcastToMe,
      );
    });
}

export function subscribeBroadcastToAll(action$) {
  return action$.ofType(ActionTypes.SUBSCRIBE_FCM_BROADCAST_TO_ALL)
    .switchMap(async (action) => {
      await AsyncStorage.setItem('fcm:broadcast:all', true);

      return FCMSubscribeStateResult(true, null);
    });
}

export function unsubscribeBroadcastToAll(action$) {
  return action$.ofType(ActionTypes.UNSUBSCRIBE_FCM_BROADCAST_TO_ALL)
    .switchMap(async (action) => {
      await AsyncStorage.setItem('fcm:broadcast:all', false);

      return FCMSubscribeStateResult(false, null);

    });
}

export function subscribeBroadcastToMe(action$) {
  return action$.ofType(ActionTypes.SUBSCRIBE_FCM_BOARDCAST_TO_ME)
    .switchMap(async (action) => {
      await AsyncStorage.setItem('fcm:broadcast:me', true);

      return FCMSubscribeStateResult(null, true);
    });
}

export function unsubscribeBroadcastToMe(action$) {
  return action$.ofType(ActionTypes.UNSUBSCRIBE_FCM_BOARDCAST_TO_ME)
    .switchMap(async (action) => {
      await AsyncStorage.setItem('fcm:broadcast:me', false);

      return FCMSubscribeStateResult(null, false);
    });
}

export function updateSubscribe(action$) {
  return action$.ofType(ActionTypes.FCM_SUBSCRIBE_STATUS_RESULT)
    .switchMap(async (action) => {
      const { toAll, toMe } = action;
      try {
        if (toAll !== null) {
          if (toAll) {
            FCM.subscribeToTopic('/topics/general');
          } else {
            FCM.unsubscribeFromTopic('/topics/general');
          }
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
        }
      } catch (error) {
      }

      return FCMSubscribeStateUpdated();
    });
}
