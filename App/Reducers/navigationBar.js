/**
 * Created by Calvin Huang on 2/24/17.
 */

import { SHOW_NAVIGATION_BAR, HIDE_NAVIGATION_BAR } from '../Constants/actionTypes';

const initialState = { showNavigator: true };

export default function navigationBar(state = initialState, action) {
  switch (action.type) {
    case SHOW_NAVIGATION_BAR:
      return { showNavigator: true };
    case HIDE_NAVIGATION_BAR:
      return { showNavigator: false };
    default:
      return state;
  }
}
