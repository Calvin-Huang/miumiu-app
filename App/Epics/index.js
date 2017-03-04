/**
 * Created by Calvin Huang on 2/24/17.
 */

import 'rxjs';
import { combineEpics } from 'redux-observable';

import * as userEpics from './user';
// import fetchWayBills from './fetchWaybills';

// export default combineEpics;

export default combineEpics(
  userEpics.checkUserSignedIn,
  userEpics.userSignIn,
  userEpics.userSignOut,
);
