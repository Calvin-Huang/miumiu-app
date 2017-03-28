/**
 * Created by calvin.huang on 24/03/2017.
 */

import { FETCH_FAQ, FETCH_FAQ_SUCCESS, FETCH_FAQ_FAILED } from '../Constants/actionTypes';

const initialState = {
  id: null,
  isFetching: false,
  error: null,
};

export default function FAQ(state = initialState, action) {
  switch (action.type) {

    // Concat existed FAQ.
    case FETCH_FAQ:
      return {
        id: action.id,
        isFetching: true,
        error: null,
      };
    case FETCH_FAQ_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    case FETCH_FAQ_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
