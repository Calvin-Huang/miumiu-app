/**
 * Created by Calvin Huang on 2/24/17.
 */

import { combineReducers } from 'redux';

import wayBills from './wayBills';
import navigationBar from './navigationBar';

export default combineReducers({
  wayBills,
  navigationBar,
});
