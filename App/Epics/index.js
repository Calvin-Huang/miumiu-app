/**
 * Created by Calvin Huang on 2/24/17.
 */

import 'rxjs';
import { combineEpics } from 'redux-observable';

import * as userEpics from './user';
import * as wayBillEpics from './wayBill';
import * as calculator from './calculator';
import * as FAQ from './FAQ';

// export default combineEpics;

export default combineEpics(
  wayBillEpics.fetchWayBills,
  wayBillEpics.refreshingWayBills,
  wayBillEpics.addingWayBill,
  wayBillEpics.urgentWayBill,
  calculator.calculate,
  FAQ.fetchFAQs,
  FAQ.refreshFAQs,
  FAQ.fetchFAQ,
  userEpics.checkUserSignedIn,
  userEpics.userSignIn,
  userEpics.userSignOut,
);
