/**
 * Created by Calvin Huang on 2/23/17.
 */

import * as ActionTypes from '../Constants/actionTypes';

export function showNavigationBar() {
  return {
    type: ActionTypes.SHOW_NAVIGATION_BAR,
  };
}

export function hideNavigationBar() {
  return {
    type: ActionTypes.HIDE_NAVIGATION_BAR,
  };
}

export function toggleNavigationBar(open = false) {
  return {
    type: open ? ActionTypes.SHOW_NAVIGATION_BAR : ActionTypes.HIDE_NAVIGATION_BAR,
  }
}
