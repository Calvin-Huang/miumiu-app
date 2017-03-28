/**
 * Created by Calvin Huang on 2/24/17.
 */

import { SHOW_NAVIGATION_BAR, HIDE_NAVIGATION_BAR } from '../Constants/actionTypes';

const initialState = { isShown: true };

export default function navigationBar(state = initialState, action) {
  switch (action.type) {
    case SHOW_NAVIGATION_BAR:
      return { isShown: true };
    case HIDE_NAVIGATION_BAR:
      return { isShown: false };
    default:
      return state;
  }
}
