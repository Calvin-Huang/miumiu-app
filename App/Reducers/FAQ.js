/**
 * Created by calvin.huang on 24/03/2017.
 */

import { FETCH_FAQ, FETCH_FAQ_SUCCESS, FETCH_FAQ_FAILED } from '../Constants/actionTypes';

const initialState = {
  isFetching: false,
  data: null,
  error: null,
};

export default function FAQ(state = initialState, action) {
  switch (action.type) {

    // Concat existed FAQ.
    case FETCH_FAQ:
      return {
        isFetching: true,
        data: {
          ...action.FAQ,
        },
        error: null,
      };
    case FETCH_FAQ_SUCCESS:
      return {
        isFetching: false,
        data: {
          ...action.response,
        },
        error: null,
      };
    case FETCH_FAQ_FAILED:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    default:
      return state;
  }
}
