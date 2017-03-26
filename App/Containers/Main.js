/**
 * Created by Calvin Huang on 2/24/17.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  Modal,
  AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import QRCode from 'react-native-qrcode-svg';
import DeviceBrightness from 'react-native-device-brightness';
import Color from 'color';

import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType,
} from 'react-native-fcm';

import { IconFasterShipping } from '../Components';

import WayBills from './WayBills';
import UrgentProcessing from './UrgentProcessing';
import Calculator from './Calculator';
import DeliveryInfoList from './DeliveryInfoList';
import ServiceStores from './ServiceStores';
import PickUpPassword from './PickUpPassword';
import FAQ from './FAQ';
import Settings from './Settings';
import SignIn from './SignIn';
import { Menu, Navigator } from '../Components';
import { MiumiuTheme } from '../Styles';

import { openSideDrawer, closeSideDrawer } from '../Actions/sideDrawerActions';
import { checkUserSignedIn, showUserQRCode, hideUserQRCode } from '../Actions/userActions';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayOpacityValue: new Animated.Value(0),
      navigationItems: [
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
            name: 'md-help-circle',
          },
          name: '常見問題',
          component: FAQ,
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
    };
  }

  componentDidMount() {
    this.props.checkUserSignedIn();

    FCM.requestPermissions();
    FCM.getFCMToken()
      .then((token) => {
        
      });
  }

  componentWillReceiveProps(props) {
    if (this.props.currentUser !== props.currentUser) {
      if (props.currentUser) {

        // Reset menu status.
        this.setState({
          navigationItems: this.state.navigationItems.map((item, index) => {
            item.isSelected = (index === 0);

            return item;
          })
        });


        setTimeout(() => {
          this.props.openSideDrawer();
        }, 200);
      } else {
        this.refs.navigator.push({
          index: 1,
          component: SignIn,
          transition: Navigator.SceneConfigs.FloatFromBottom,
        });
      }
    }

    if (this.props.sideDrawerOpened !== props.sideDrawerOpened) {
      if (props.sideDrawerOpened) {
        dismissKeyboard();
      }
    }

    if (this.props.showUserQRCodeModal !== props.showUserQRCodeModal) {
      if (props.showUserQRCodeModal) {

        DeviceBrightness.getBrightnessLevel()
          .then((brightnessLevel) => {
            AsyncStorage.setItem('brightnessLevel', `${brightnessLevel}`);
            DeviceBrightness.setBrightnessLevel(1.0);
          });
      } else {
        AsyncStorage.getItem('brightnessLevel')
          .then((brightnessLevel) => {
            DeviceBrightness.setBrightnessLevel(parseFloat(brightnessLevel, 10));
          });
      }
    }
  }

  fadeInOutOverlay() {
    const nextOpacityValue = -(this.state.overlayOpacityValue._value - 1);

    Animated.timing(
      this.state.overlayOpacityValue,
      {
        toValue: nextOpacityValue,
        duration: 250,
        easing: Easing.linear
      }
    ).start();
  }

  navigationItemClicked(itemData) {
    this.props.closeSideDrawer();

    if (itemData.component !== Component) {
      this.setState({
        navigationItems: this.state.navigationItems.map((item) => {
          item.isSelected = (item === itemData);

          return item;
        })
      });

      this.refs.navigator.replace({ index: 0, component: itemData.component });
    } else {
      this.props.showUserQRCode();
    }
  }

  render() {
    const routes = [
      { index: 0, component: WayBills },
    ]

    return (
      <Drawer
        open={this.props.sideDrawerOpened}
        ref="sideDrawer"
        type="overlay"
        content={
          <Menu
            navigationItems={this.state.navigationItems}
            onItemPress={this.navigationItemClicked.bind(this)}
          />
        }
        tapToClose={true}
        openDrawerOffset={56}
        onClose={() => { this.props.closeSideDrawer(); }}
        onOpenStart={this.fadeInOutOverlay.bind(this)}
        onCloseStart={this.fadeInOutOverlay.bind(this)}
      >
        <StatusBar barStyle='light-content' />
        <Navigator
          ref="navigator"
          style={styles.container}
          initialRoute={routes[0]}
          initialRouteStack={routes}
          navigationBar={
            (this.props.showNavigator &&
              <Navigator.NavigationBar style={{ flex: 1 }} />
            )
          }
        />
        { this.props.sideDrawerOpened &&
          <Animated.View style={{ ...styles.overlay, opacity: this.state.overlayOpacityValue }} />
        }

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.showUserQRCodeModal}
        >
          <TouchableOpacity
            style={MiumiuTheme.modalContainer}
            onPress={() => { this.props.hideUserQRCode(); }}
          >
            <TouchableWithoutFeedback>
              <View style={MiumiuTheme.modalBody}>
                <View style={styles.qrCode}>
                  <QRCode value="+998988008752" size={140} />
                </View>
                <Text style={styles.qrCodeInfo}>
                  +998988008752
                </Text>
                <Text style={styles.pickupInstruction}>
                  已提貨單號工作人員會將單號由APP註銷
                </Text>
                <View
                  style={{
                    alignSelf: 'stretch',
                     borderRadius: MiumiuTheme.button.borderRadius,
                     backgroundColor: Color(MiumiuTheme.buttonDefault.backgroundColor).lighten(0.2)
                  }}
                >
                  <TouchableOpacity
                    style={{ ...MiumiuTheme.button, ...MiumiuTheme.buttonDefault }}
                    onPress={() => { this.props.hideUserQRCode(); }}
                  >
                    <Text style={MiumiuTheme.buttonText}>
                      關閉
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </Drawer>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  qrCode: {
    marginTop: 30,
    marginBottom: 18,
  },
  qrCodeInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: MiumiuTheme.titleText.color,
    marginBottom: 10
  },
  pickupInstruction: {
    fontSize: 12,
    color: MiumiuTheme.titleText.color,
    marginBottom: 34
  },
};

export default connect(
  (state, ownProps) => {
    return {
      ...ownProps,
      showNavigator: state.navigationBar.isShown,
      sideDrawerOpened: state.sideDrawer.isOpened,
      currentUser: state.user.currentUser,
      showUserQRCodeModal: state.userQRCodeModal.show,
    };
  },
  { openSideDrawer, closeSideDrawer, checkUserSignedIn, showUserQRCode, hideUserQRCode },
)(Main);
