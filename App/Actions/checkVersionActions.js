/**
 * Created by calvin.huang on 25/04/2017.
 */

import * as ActionTypes from '../Constants/actionTypes';

export function fetchCurrentVersionInfo() {
  return {
    type: ActionTypes.FETCH_CURRENT_VERSION_INFO,
  };
}

export function showVersionOutdatedHint(versionName, isForceUpdate) {
  return {
    type: ActionTypes.SHOW_VERSION_OUTDATED_HINT,
    versionName,
    isForceUpdate,
  };
}

export function hideVersionOutdatedHint() {
  return {
    type: ActionTypes.HIDE_VERSION_OUTDATED_HINT,
  };
}
