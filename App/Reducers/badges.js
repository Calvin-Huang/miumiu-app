/**
 * Created by calvin.huang on 10/05/2017.
 */

import { UPDATE_BADGES } from '../Constants/actionTypes';

const initialState = [];

export default function badges(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BADGES:
      return action.badges;
    default:
      return state;
  }
}
