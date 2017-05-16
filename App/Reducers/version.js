/**
 * Created by calvin.huang on 27/04/2017.
 */

import { SHOW_VERSION_OUTDATED_HINT, HIDE_VERSION_OUTDATED_HINT } from '../Constants/actionTypes';

const initialState = {
  show: false,
  versionName: '',
  forceUpdate: false,
};

export function needUpdateModal(state = initialState, action) {
  switch (action.type) {
    case SHOW_VERSION_OUTDATED_HINT:
      return {
        show: true,
        versionName: action.versionName,
        forceUpdate: action.isForceUpdate,
      };
    case HIDE_VERSION_OUTDATED_HINT:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
}
