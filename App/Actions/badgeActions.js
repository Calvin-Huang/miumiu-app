/**
 * Created by calvin.huang on 10/05/2017.
 */

import * as actionTypes from '../Constants/actionTypes';

export function fetchBadges() {
  return {
    type: actionTypes.FETCH_BADGES,
  }
}

export function updateBadges(badges) {
  return {
    type: actionTypes.UPDATE_BADGES,
    badges,
  }
}
