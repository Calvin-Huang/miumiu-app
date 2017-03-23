/**
 * Created by Calvin Huang on 2/24/17.
 */

import { combineReducers } from 'redux';

import wayBill from './wayBill';
import wayBills from './wayBills';
import navigationBar from './navigationBar';
import sideDrawer from './sideDrawer';
import user, { userQRCodeModal } from './user';

export default combineReducers({
  wayBill,
  wayBills,
  navigationBar,
  sideDrawer,
  user,
  userQRCodeModal,
});
