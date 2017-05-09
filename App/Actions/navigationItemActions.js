/**
 * Created by calvin.huang on 09/05/2017.
 */

import * as actionTypes from '../Constants/actionTypes';

export function navigationItemSelected(item) {
  return {
    type: actionTypes.NAVIGATION_ITEM_SELECTED,
    selectedItem: item,
  }
}
