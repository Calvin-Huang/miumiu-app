/**
 * Created by calvin.huang on 24/03/2017.
 */

import humps from 'humps';

import { CALCULATE_FEE_DONE } from '../Constants/actionTypes';

const initialState = {
  data: null,
};

export default function calculate(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_FEE_DONE:
      return {
        data: humps.camelizeKeys(action.response),
      };
    default:
      return state;
  }
}
