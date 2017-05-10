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
  Linking,
  AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  BackAndroid,
  Platform,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import QRCode from 'react-native-qrcode-svg';
import DeviceBrightness from 'react-native-device-brightness';
import Color from 'color';
import FCM, { FCMEvent } from 'react-native-fcm';

import WayBills from '../Containers/WayBills';
import SignIn from '../Containers/SignIn';
import RegistrationCompleted from '../Containers/RegistrationCompleted';
import ResetPasswordCompleted from '../Containers/ResetPasswordCompleted';

import { Menu, Navigator } from '../Components';

import { MiumiuTheme } from '../Styles';
import { DEEP_LINK_PROTOCOL, APPSTORE_URL, GOOGLEPLAY_URL, APK_DOWNLOAD_URL } from '../Constants/config';
import { errors as APIErrors } from '../Utils/api';
import { showNavigationBar } from '../Actions/navigationBarActions';
import { navigationItemSelected } from '../Actions/navigationItemActions';
import { openSideDrawer, closeSideDrawer } from '../Actions/sideDrawerActions';
import { checkUserSignedIn, userSignOut, showUserQRCode, hideUserQRCode } from '../Actions/userActions';
import { checkFCMSubscribeStatus } from '../Actions/FCMActions';
import { fetchContactInfo } from '../Actions/settingActions';
import { fetchBadges } from '../Actions/badgeActions';
import { fetchCurrentVersionInfo, hideVersionOutdatedHint } from '../Actions/checkVersionActions';
import { resetGeneralRequest } from '../Actions/generalRequestActions';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayOpacityValue: new Animated.Value(0),
    };

    this.handleOpenURL = this.handleOpenURL.bind(this);
    this.androidBackHandler = this.androidBackHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUser === null) {
      this.refs.navigator.push({
        index: 1,
        component: SignIn,
        transition: Navigator.SceneConfigs.FloatFromBottom,
      });

    } else {
      this.props.checkUserSignedIn();
    }

    FCM.requestPermissions();
    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
      this.props.checkFCMSubscribeStatus();
    });

    Linking.getInitialURL()
      .then((url) => {
        this.handleOpenURL({ url });
      })
      .catch(() => { /* Do nothing */ });

    Linking.addEventListener('url', this.handleOpenURL);
    APIErrors.on('JWTRefresh', () => {
      this.props.showNavigationBar();
      this.props.closeSideDrawer();
      this.props.userSignOut();
    });

    BackAndroid.addEventListener('hardwareBackPress', this.androidBackHandler);

    this.props.fetchCurrentVersionInfo();
  }

  componentWillReceiveProps(props) {
    if (this.props.currentUser !== props.currentUser) {
      if (props.currentUser) {

        // Reset menu status.
        this.props.navigationItemSelected(this.props.navigationItems[0]);
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

    if (this.props.badges !== props.badges) {
      FCM.setBadgeNumber(props.badges.length);
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
    BackAndroid.removeEventListener('hardwareBackPress', this.androidBackHandler);
    this.refreshTokenListener.remove();
  }

  handleOpenURL({ url }) {
    if (!url) {
      return;
    }

    const urlComponents = url.split('?');
    const domain = urlComponents[0];
    const queries = (urlComponents[1] || '')
      .split('&')
      .map((query) => {
        const p = query.split('=');
        let object = {};
        object[p[0]] = p[1];
        return object;
      })
      .reduce((result, object) => {
        return {
          ...result,
          ...object,
        };
      });
    let componentMap = {};
    componentMap[`${DEEP_LINK_PROTOCOL}://register/complete`] = RegistrationCompleted;
    componentMap[`${DEEP_LINK_PROTOCOL}://forgot/complete`] = ResetPasswordCompleted;

    if (componentMap[domain]) {
      const { token } = queries;
      if (token) {

        // Disable swipe back gesture.
        this.refs.navigator.immediatelyResetRouteStack([
          {
            index: 0,
            component: WayBills,
          }, {
            index: 1,
            component: componentMap[domain],
            data: { token },
            transition: { ...Navigator.SceneConfigs.FloatFromBottom, gestures: {} },
          }
        ]);
      }
    }
  }

  androidBackHandler() {
    const { navigator } = this.refs;
    const { sideDrawerOpened, showNavigator, closeSideDrawer, showNavigationBar } = this.props;
    if (sideDrawerOpened) {
      closeSideDrawer();
      return true;

    } else if (!showNavigator) {
      showNavigationBar();
      return true;

    } else if (navigator.getCurrentRoutes().length > 1) {

      const currentRoute = navigator.getCurrentRoutes()[navigator.getCurrentRoutes().length - 1];

      if (currentRoute.component.displayName === 'Connect(SignIn)') {
        return false;

      } else {
        navigator.pop();
        return true;
      }
    }
    return false;
  }

  fadeInOutOverlay(opacity) {
    Animated.timing(
      this.state.overlayOpacityValue,
      {
        toValue: opacity,
        duration: 250,
        easing: Easing.linear
      }
    ).start();
  }

  navigationItemClicked(itemData) {
    this.props.closeSideDrawer();

    if (itemData.component !== Component) {
      this.props.navigationItemSelected(itemData);

      this.refs.navigator.replace({ index: 0, component: itemData.component });
    } else {
      this.props.showUserQRCode();
    }
  }

  updateButtonClicked(updateSourceUrl) {
    Linking.openURL(updateSourceUrl);
  }

  render() {
    const routes = [
      { index: 0, component: WayBills },
    ];

    const { currentUser } = this.props;
    const user = currentUser || {};

    return (
      <Drawer
        open={!this.props.needUpdateModal.show && this.props.sideDrawerOpened}
        ref="sideDrawer"
        type="overlay"
        content={
          <Menu
            navigationItems={this.props.navigationItems}
            onItemPress={this.navigationItemClicked.bind(this)}
            userId={user.id}
          />
        }
        tapToClose={true}
        openDrawerOffset={56}
        onClose={() => { this.props.closeSideDrawer(); }}
        onOpenStart={this.fadeInOutOverlay.bind(this, 1)}
        onCloseStart={this.fadeInOutOverlay.bind(this, 0)}
      >
        <StatusBar barStyle="light-content" backgroundColor="#3D73BA" />
        <Navigator
          ref="navigator"
          style={styles.container}
          initialRoute={routes[0]}
          initialRouteStack={routes}
          onWillFocus={this.props.resetGeneralRequest}
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
          onRequestClose={this.props.hideUserQRCode.bind(this)}
        >
          <TouchableOpacity
            style={MiumiuTheme.modalContainer}
            onPress={this.props.hideUserQRCode.bind(this)}
          >
            <View style={MiumiuTheme.modalBody}>
              <View style={styles.qrCode}>
                <QRCode value={user.account} size={140} />
              </View>
              <Text style={styles.qrCodeInfo}>
                {user.account}
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
                  onPress={this.props.hideUserQRCode.bind(this)}
                >
                  <Text style={MiumiuTheme.buttonText}>
                    關閉
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.needUpdateModal.show}
          onRequestClose={this.props.needUpdateModal.forceUpdate ? () => {} : this.props.hideVersionOutdatedHint.bind(this)}
        >
          <TouchableWithoutFeedback
            onPress={this.props.needUpdateModal.forceUpdate ? () => {} : this.props.hideVersionOutdatedHint.bind(this)}
          >
            <View style={MiumiuTheme.modalContainer}>
              <View style={MiumiuTheme.modalBody}>
                <View style={MiumiuTheme.modalTitle}>
                  <Text style={MiumiuTheme.modalTitleText}>
                    有新版本發佈囉
                  </Text>
                </View>
                <View style={MiumiuTheme.modalContent}>
                  <Text style={MiumiuTheme.modalContentText}>
                    最新的版本是 {this.props.needUpdateModal.versionName} 版{"\n"}使用最新的版本獲取最棒的使用體驗吧！
                  </Text>
                </View>
                <View
                  style={{
                    alignSelf: 'stretch',
                    borderRadius: MiumiuTheme.button.borderRadius,
                    backgroundColor: Color(MiumiuTheme.buttonPrimary.backgroundColor).lighten(0.2)
                  }}
                >
                  <TouchableOpacity
                    style={{ ...MiumiuTheme.button, ...MiumiuTheme.buttonPrimary }}
                    onPress={this.updateButtonClicked.bind(this, Platform.OS === 'ios' ? APPSTORE_URL : GOOGLEPLAY_URL)}
                  >
                    <Text style={MiumiuTheme.buttonText}>
                      前往 {Platform.OS === 'ios' ? 'AppStore' : 'GooglePlay'}
                    </Text>
                  </TouchableOpacity>
                </View>
                { Platform.OS === 'android' &&
                  <TouchableOpacity
                    style={MiumiuTheme.button}
                    onPress={this.updateButtonClicked.bind(this, APK_DOWNLOAD_URL)}
                  >
                    <Text style={{ ...MiumiuTheme.contentText, textDecorationLine: 'underline' }}>
                      下載 apk
                    </Text>
                  </TouchableOpacity>
                }
                { !this.props.needUpdateModal.forceUpdate &&
                  <TouchableOpacity
                    style={{ ...MiumiuTheme.button }}
                    onPress={this.props.hideVersionOutdatedHint.bind(this)}
                  >
                    <Text style={MiumiuTheme.contentText}>下次再說</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
          </TouchableWithoutFeedback>
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
      navigationItems: state.navigationItems,
      sideDrawerOpened: state.sideDrawer.isOpened,
      currentUser: state.user.currentUser,
      showUserQRCodeModal: state.userQRCodeModal.show,
      needUpdateModal: state.needUpdateModal,
      badges: state.badges,
    };
  },
  {
    showNavigationBar,
    navigationItemSelected,
    openSideDrawer,
    closeSideDrawer,
    checkUserSignedIn,
    checkFCMSubscribeStatus,
    userSignOut,
    showUserQRCode,
    hideUserQRCode,
    fetchContactInfo,
    fetchBadges,
    fetchCurrentVersionInfo,
    hideVersionOutdatedHint,
    resetGeneralRequest,
  },
)(Main);
