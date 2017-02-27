/**
 * Created by Calvin Huang on 2/24/17.
 */

import { combineEpics } from 'redux-observable';

import fetchWayBills from './fetchWaybills';

export default combineEpics(
  fetchWayBills,
);
export default combineEpics;
