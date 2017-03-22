/**
 * Created by Calvin Huang on 2/24/17.
 */

import 'rxjs';
import { combineEpics } from 'redux-observable';

import * as userEpics from './user';
import * as wayBillEpics from './wayBill';

// export default combineEpics;

export default combineEpics(
  wayBillEpics.fetchWayBills,
  wayBillEpics.refreshingWayBills,
  userEpics.checkUserSignedIn,
  userEpics.userSignIn,
  userEpics.userSignOut,
);
