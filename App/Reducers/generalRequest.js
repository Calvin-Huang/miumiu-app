/**
 * Created by calvin.huang on 23/03/2017.
 */

import { GENERAL_REQUEST, GENERAL_REQUEST_SUCCESS, GENERAL_REQUEST_FAILED } from '../Constants/actionTypes';

const initialState = {
  isRequesting: false,
  error: null,
};

export default function generalRequest(state = initialState, action) {
  switch (action.type) {
    case GENERAL_REQUEST:
      return {
        isRequesting: true,
        error: null,
      };
    case GENERAL_REQUEST_SUCCESS:
      return {
        isRequesting: false,
        error: null,
      };
    case GENERAL_REQUEST_FAILED:
      return {
        isRequesting: false,
        error: action.error,
      };
    default:
      return state;
  }
}
