/**
 * Created by Calvin Huang on 2/24/17.
 */

import 'rxjs';
import { combineEpics } from 'redux-observable';

import * as userEpics from './user';
import * as wayBillEpics from './wayBill';
import * as calculator from './calculator';
import * as deliveryInfo from './deliveryInfo';
import * as serviceStore from './serviceStore';
import * as FAQ from './FAQ';

// export default combineEpics;

export default combineEpics(
  wayBillEpics.fetchWayBills,
  wayBillEpics.refreshingWayBills,
  wayBillEpics.addingWayBill,
  wayBillEpics.urgentWayBill,
  calculator.calculate,
  deliveryInfo.fetchDeliveryInfoList,
  deliveryInfo.refreshDeliveryInfoList,
  deliveryInfo.fetchDeliveryInfo,
  serviceStore.fetchServiceStores,
  serviceStore.refreshServiceStores,
  serviceStore.fetchServiceStore,
  FAQ.fetchFAQs,
  FAQ.refreshFAQs,
  FAQ.fetchFAQ,
  userEpics.checkUserSignedIn,
  userEpics.userSignIn,
  userEpics.userSignOut,
  userEpics.userRegister,
  userEpics.userConfirmRegistration,
  userEpics.userResendConfirmCode,
  userEpics.userRequestResetPassword,
  userEpics.userConfirmResetPasswordCode,
);
