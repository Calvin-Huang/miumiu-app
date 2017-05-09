/**
 * Created by calvin.huang on 09/05/2017.
 */

import { Component } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { NAVIGATION_ITEM_SELECTED } from '../Constants/actionTypes';

import WayBills from '../Containers/WayBills';
import UrgentProcessing from '../Containers/UrgentProcessing';
import Calculator from '../Containers/Calculator';
import DeliveryInfoList from '../Containers/DeliveryInfoList';
import ServiceStores from '../Containers/ServiceStores';
import PickUpPassword from '../Containers/PickUpPassword';
import BulletinBoard from '../Containers/BulletinBoard';
import FAQ from './FAQ';
import ContactUs from '../Containers/ContactUs';
import Settings from '../Containers/Settings';

import { IconFasterShipping } from '../Components';

const initialState = [
  {
    icon: {
      name: 'md-list-box',
    },
    name: '貨單管理',
    component: WayBills,
    isSelected: true,
  }, {
    icon: {
      component: IconFasterShipping,
      size: 16,
    },
    name: '加急服務',
    component: UrgentProcessing,
    isSelected: false,
  }, {
    icon: {
      name: 'md-calculator'
    },
    name: '試算運費',
    component: Calculator,
    isSelected: false,
  }, {
    icon: {
      component: FontAwesomeIcon,
      name: 'qrcode',
      size: 20,
    },
    name: 'QRCode 取貨',
    component: Component,
    isSelected: false,
    // }, {
    //   icon: {
    //     name: 'md-lock',
    //   },
    //   name: '取貨鎖設定',
    //   component: PickUpPassword,
    //   isSelected: false,
  }, {
    icon: {
      name: 'md-flag',
    },
    name: '收貨地址',
    component: DeliveryInfoList,
    isSelected: false,
  }, {
    icon: {
      name: 'md-home',
    },
    name: '門市資訊',
    component: ServiceStores,
    isSelected: false,
  }, {
    icon: {
      name: 'md-text',
    },
    name: '公告事項',
    component: BulletinBoard,
    isSelected: false,
  }, {
    icon: {
      name: 'md-help-circle',
    },
    name: '注意事項',
    component: FAQ,
    isSelected: false,
  }, {
    icon: {
      name: 'md-chatboxes',
    },
    name: '聯絡我們',
    component: ContactUs,
    isSelected: false,
  }, {
    icon: {
      name: 'md-settings',
    },
    name: '設定',
    component: Settings,
    isSelected: false,
  },
]

export default function navigationItems(state = initialState, action) {
  switch (action.type) {
    case NAVIGATION_ITEM_SELECTED:

      return state.map((item) => {
        item.isSelected = (item === action.selectedItem);

        return item;
      });
    default:
      return state;
  }
}
