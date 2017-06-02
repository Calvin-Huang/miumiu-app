/**
 * Created by calvin.huang on 28/03/2017.
 */

import {
  FETCH_CONTACT_INFO,
  FETCH_CONTACT_INFO_SUCCESS,
  FETCH_CONTACT_INFO_FAILED,
} from '../Constants/actionTypes';

const initialState = {
  isRequesting: false,
  data: null,
  error: null,
};

export function contactInfo(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONTACT_INFO:
      return {
        ...state,
        isRequesting: true,
        error: null,
      };
    case FETCH_CONTACT_INFO_SUCCESS: {
      const { wechat, mobile, email } = action.response.contact;
      return {
        isRequesting: false,
        data: {
          wechat,
          mobile,
          email,
        },
        error: null,
      };
    }
    case FETCH_CONTACT_INFO_FAILED:
      return {
        ...state,
        isRequesting: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export default contactInfo;
