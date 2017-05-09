/**
 * Created by calvin.huang on 09/05/2017.
 */

import { FETCH_BULLETIN, FETCH_BULLETIN_SUCCESS, FETCH_BULLETIN_FAILED } from '../Constants/actionTypes';

const initialState = {
  id: null,
  isFetching: false,
  error: null,
};

export default function bulletin(state = initialState, action) {
  switch (action.type) {

    // Concat existed bulletin board.
    case FETCH_BULLETIN:
      return {
        id: action.id,
        isFetching: true,
        error: null,
      };
    case FETCH_BULLETIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    case FETCH_BULLETIN_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
