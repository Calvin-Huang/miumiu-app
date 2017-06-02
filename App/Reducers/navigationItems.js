/**
 * Created by calvin.huang on 09/05/2017.
 */

import { Component } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { NAVIGATION_ITEM_SELECTED, UPDATE_BADGES } from '../Constants/actionTypes';

import WayBills from '../Containers/WayBills';
import UrgentProcessing from '../Containers/UrgentProcessing';
import Calculator from '../Containers/Calculator';
import DeliveryInfoList from '../Containers/DeliveryInfoList';
import ServiceStores from '../Containers/ServiceStores';
// import PickUpPassword from '../Containers/PickUpPassword';
import BulletinBoard from '../Containers/BulletinBoard';
import FAQ from '../Containers/FAQ';
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
    badge: {
      prefix: 'shipping',
      count: 0,
    },
  }, {
    icon: {
      component: IconFasterShipping,
      size: 16,
    },
    name: '加急服務',
    component: UrgentProcessing,
    isSelected: false,
    badge: null,
  }, {
    icon: {
      name: 'md-calculator',
    },
    name: '試算運費',
    component: Calculator,
    isSelected: false,
    badge: null,
  }, {
    icon: {
      component: FontAwesomeIcon,
      name: 'qrcode',
      size: 20,
    },
    name: 'QRCode 取貨',
    component: Component,
    isSelected: false,
    badge: null,
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
    badge: null,
  }, {
    icon: {
      name: 'md-home',
    },
    name: '門市資訊',
    component: ServiceStores,
    isSelected: false,
    badge: null,
  }, {
    icon: {
      name: 'md-text',
    },
    name: '公告事項',
    component: BulletinBoard,
    isSelected: false,
    badge: {
      prefix: 'board',
      count: 0,
    },
  }, {
    icon: {
      name: 'md-help-circle',
    },
    name: '注意事項',
    component: FAQ,
    isSelected: false,
    badge: null,
  }, {
    icon: {
      name: 'md-chatboxes',
    },
    name: '聯絡我們',
    component: ContactUs,
    isSelected: false,
    badge: null,
  }, {
    icon: {
      name: 'md-settings',
    },
    name: '設定',
    component: Settings,
    isSelected: false,
    badge: null,
  },
];

export default function navigationItems(state = initialState, action) {
  switch (action.type) {
    case NAVIGATION_ITEM_SELECTED:

      return state.map(
        item => ({
          ...item,
          isSelected: (item === action.selectedItem),
        }),
      );
    case UPDATE_BADGES: {
      return state
        .map((item) => {
          const { badge } = item;
          const { prefix } = badge || {};

          if (!badge || prefix === 0) {
            return item;
          }

          return {
            ...item,
            badge: {
              ...badge,
              count: action.badges.filter(_badge => _badge.startsWith(prefix)).length,
            },
          };
        });
    }
    default:
      return state;
  }
}
