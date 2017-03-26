/**
 * Created by calvin.huang on 26/03/2017.
 */

import { FETCH_DELIVERY_INFO, FETCH_DELIVERY_INFO_SUCCESS, FETCH_DELIVERY_INFO_FAILED } from '../Constants/actionTypes';

const initialState = {
  id: null,
  isFetching: false,
  error: null,
};

export default function deliveryInfo(state = initialState, action) {
  switch (action.type) {

    // Concat existed DeliveryInfo.
    case FETCH_DELIVERY_INFO:
      return {
        id: action.id,
        isFetching: true,
        error: null,
      };
    case FETCH_DELIVERY_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    case FETCH_DELIVERY_INFO_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
