/**
 * Created by Calvin Huang on 2/24/17.
 */

import { combineReducers } from 'redux';

import generalRequest from './generalRequest';
import wayBill from './wayBill';
import wayBills from './wayBills';
import calculator from './calculator';
import FAQs from './FAQs';
import navigationBar from './navigationBar';
import sideDrawer from './sideDrawer';
import user, { userQRCodeModal } from './user';

export default combineReducers({
  generalRequest,
  wayBill,
  wayBills,
  calculator,
  FAQs,
  navigationBar,
  sideDrawer,
  user,
  userQRCodeModal,
});
