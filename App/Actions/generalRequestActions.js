/**
 * Created by calvin.huang on 23/03/2017.
 */

import * as ActionsTypes from '../Constants/actionTypes';

export function generalRequest() {
  return {
    type: ActionsTypes.GENERAL_REQUEST,
  };
}

export function generalRequestSuccess() {
  return {
    type: ActionsTypes.GENERAL_REQUEST_SUCCESS,
  };
}

export function generalRequestFailed(error) {
  return {
    type: ActionsTypes.GENERAL_REQUEST_FAILED,
    error,
  };
}
