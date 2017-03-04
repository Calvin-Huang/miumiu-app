/**
 * Created by Calvin Huang on 3/1/17.
 */

import { USER_SIGN_IN_SUCCESS, USER_SIGN_IN_FAILED, USER_SIGN_OUT } from '../Constants/actionTypes';

const initialState = {
  currentUser: null,
  result: {
    signedIn: null,
    errorMessage: null,
    statusCode: null,
  }
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_SIGN_IN_SUCCESS:
      return {
        currentUser: action.user,
        result: {
          signedIn: true,
          errorMessage: null,
          statusCode: null,
        }
      };
    case USER_SIGN_IN_FAILED:
      return {
        currentUser: null,
        result: {
          signedIn: false,
          errorMessage: action.errorMessage,
          statusCode: action.statusCode,
        }
      };
    case USER_SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
