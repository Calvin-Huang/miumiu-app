/**
 * Created by calvin.huang on 26/03/2017.
 */

import { FETCH_SERVICE_STORE, FETCH_SERVICE_STORE_SUCCESS, FETCH_SERVICE_STORE_FAILED } from '../Constants/actionTypes';

const initialState = {
  id: null,
  isFetching: false,
  error: null,
};

export default function serviceStore(state = initialState, action) {
  switch (action.type) {

    // Concat existed ServiceStore.
    case FETCH_SERVICE_STORE:
      return {
        id: action.id,
        isFetching: true,
        error: null,
      };
    case FETCH_SERVICE_STORE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    case FETCH_SERVICE_STORE_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
