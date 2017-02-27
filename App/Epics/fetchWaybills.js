/**
 * Created by Calvin Huang on 2/24/17.
 */

import * as ActionTypes from '../Constants/actionTypes';

export default function fetchWayBills(action$) {
  return action$,ofType(ActionTypes.REQUESTED_WAYBILLS);
}
