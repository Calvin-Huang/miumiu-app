/**
 * Created by calvin.huang on 28/03/2017.
 */

import { FCM_SUBSCRIBE_STATE_UPDATED } from '../Constants/actionTypes';

const initialState = {
  subscribed: {
    toAll: false,
    toMe: false,
  }
};

export default function FCM(state = initialState, action) {
  switch (action.type) {
    case FCM_SUBSCRIBE_STATE_UPDATED:
      const { toAll, toMe } = action;
      let result = {};
      if (toAll !== null) {
        result.toAll = toAll;
      }
      if (toMe !== null) {
        result.toMe = toMe;
      }

      return {
        subscribed: {
          ...state.subscribed,
          ...result,
        }
      };
    default:
      return state;
  }
}
