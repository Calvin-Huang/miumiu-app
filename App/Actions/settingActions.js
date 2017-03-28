/**
 * Created by calvin.huang on 28/03/2017.
 */

import * as ActionTypes from '../Constants/actionTypes';

export function fetchContactInfo() {
  return {
    type: ActionTypes.FETCH_CONTACT_INFO,
  };
}

export function fetchContactInfoSuccess(response) {
  return {
    type: ActionTypes.FETCH_CONTACT_INFO_SUCCESS,
    response,
  };
}

export function fetchContactInfoFailed(error) {
  return {
    type: ActionTypes.FETCH_CONTACT_INFO_FAILED,
    error,
  };
}
