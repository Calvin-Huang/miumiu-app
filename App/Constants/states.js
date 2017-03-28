/**
 * Created by Calvin Huang on 2/15/17.
 */

export const WayBillState = {
  CONFIRMING: 5,
  SHIPPING: 1,
  ARRIVED: 2,
  PICKED_UP: 3,
  UNKNOWN_OWNER: 4,
};

export const UrgentState = {
  NORMAL: 0,
  REQUESTED: 1,
  APPROVED: 2,
  DECLINED: 3,
};

export const stateInfoMapping = {
  [WayBillState.CONFIRMING]: {
    icon: 'md-swap',
    iconColor: '#C4C0C5',
    title: '待確認',
  },
  [WayBillState.SHIPPING]: {
    icon: 'md-time',
    iconColor: '#757575',
    title: '貨運中',
  },
  [WayBillState.ARRIVED]: {
    icon: 'md-checkmark',
    iconColor: '#AED581',
    title: '已到倉',
  },
};
