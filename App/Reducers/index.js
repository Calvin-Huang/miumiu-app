/**
 * Created by Calvin Huang on 2/24/17.
 */

import { combineReducers } from 'redux';

import generalRequest from './generalRequest';
import wayBill from './wayBill';
import wayBills from './wayBills';
import calculator from './calculator';
import deliveryInfo from './deliveryInfo';
import deliveryInfoList from './deliveryInfoList';
import serviceStore from './serviceStore';
import serviceStores from './serviceStores';
import FAQ from './FAQ';
import FAQs from './FAQs';
import navigationBar from './navigationBar';
import sideDrawer from './sideDrawer';
import user, { register, resendConfirmCode, requestResetPassword, resendResetPasswordConfirmCode, userQRCodeModal } from './user';
import { contactInfo } from './setting';

export default combineReducers({
  generalRequest,
  wayBill,
  wayBills,
  calculator,
  deliveryInfo,
  deliveryInfoList,
  serviceStore,
  serviceStores,
  FAQ,
  FAQs,
  navigationBar,
  sideDrawer,
  user,
  register,
  resendConfirmCode,
  userQRCodeModal,
  requestResetPassword,
  resendResetPasswordConfirmCode,
  contactInfo,
});
