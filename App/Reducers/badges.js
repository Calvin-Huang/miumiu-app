/**
 * Created by calvin.huang on 10/05/2017.
 */

import { UPDATE_BADGES, USER_SIGN_OUT_SUCCESS } from '../Constants/actionTypes';

const initialState = [];

export default function badges(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BADGES:
      return action.badges;
    case USER_SIGN_OUT_SUCCESS:
      return [];
    default:
      return state;
  }
}
