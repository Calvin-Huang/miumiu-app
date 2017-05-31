/**
 * Created by Calvin Huang on 2/23/17.
 */

import * as ActionTypes from '../Constants/actionTypes';

export function openSideDrawer() {
  return {
    type: ActionTypes.OPEN_SIDE_DRAWER,
  };
}

export function closeSideDrawer() {
  return {
    type: ActionTypes.CLOSE_SIDE_DRAWER,
  };
}

export function toggleSideDrawer(open = false) {
  return {
    type: open ? ActionTypes.OPEN_SIDE_DRAWER : ActionTypes.CLOSE_SIDE_DRAWER,
  };
}
