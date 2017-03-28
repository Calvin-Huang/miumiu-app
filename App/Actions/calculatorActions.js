/**
 * Created by calvin.huang on 24/03/2017.
 */

import * as ActionTypes from '../Constants/actionTypes';

export function calculateFee(width, height, length, weight) {
  return {
    type: ActionTypes.CALCULATE_FEE,
    width,
    height,
    length,
    weight,
  };
}

export function calculateFeeDone(response) {
  return {
    type: ActionTypes.CALCULATE_FEE_DONE,
    response,
  }
}
