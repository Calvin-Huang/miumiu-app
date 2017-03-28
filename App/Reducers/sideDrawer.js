/**
 * Created by Calvin Huang on 2/26/17.
 */

import { OPEN_SIDE_DRAWER, CLOSE_SIDE_DRAWER } from '../Constants/actionTypes';

const initialState = {
  isOpened: false,
};

export default function sideDrawer(state = initialState, action) {
  switch (action.type) {
    case OPEN_SIDE_DRAWER:
      return { isOpened: true };
    case CLOSE_SIDE_DRAWER:
      return { isOpened: false };
    default:
      return state;
  }
}
