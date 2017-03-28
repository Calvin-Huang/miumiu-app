/**
 * Created by calvin.huang on 28/03/2017.
 */

import * as Actions from '../Constants/actionTypes';

export function checkFCMSubscribeStatus() {
  return {
    type: Actions.CHECK_FCM_SUBSCRIBE_STATUS,
  };
}

export function FCMSubscribeStateResult(toAll, toMe) {
  return {
    type: Actions.FCM_SUBSCRIBE_STATUS_RESULT,
    toAll,
    toMe,
  };
}

export function FCMSubscribeStateUpdated() {
  return {
    type: Actions.FCM_SUBSCRIBE_STATE_UPDATED,
  };
}
