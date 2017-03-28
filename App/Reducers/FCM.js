/**
 * Created by calvin.huang on 28/03/2017.
 */

import { FCM_SUBSCRIBE_STATUS_RESULT, FCM_SUBSCRIBE_STATE_UPDATED } from '../Constants/actionTypes';

const initialState = {
  subscribed: {
    toAll: false,
    toMe: false,
  }
};

export default function FCM(state = initialState, action) {
  switch (action.type) {
    case FCM_SUBSCRIBE_STATUS_RESULT:
      const { toAll, toMe } = action;
      let subscribed = state.subscribed;
      if (toAll !== null) {
        subscribed.toAll = toAll;
      }
      if (toMe !== null) {
        subscribed.toMe = toMe;
      }

      return {
        subscribed,
      };
    default:
      return state;
  }
}
