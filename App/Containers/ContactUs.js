/**
 * Created by calvin.huang on 24/03/2017.
 */

import React from 'react';
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Clipboard,
  Linking,
  Platform,
} from 'react-native';

import { connect } from 'react-redux';
import dismissKeyboard from 'dismissKeyboard';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { NavigatorComponent, MiumiuThemeNavigatorBackground, HUD } from '../Components';
import { NavigatorStyle, MiumiuTheme } from '../Styles';
import { openSideDrawer } from '../Actions/sideDrawerActions';
import { fetchContactInfo } from '../Actions/settingActions';
import store from '../storeInstance';
import { currentUser } from '../Utils/authentication';

const styles = {
  body: {
    flex: 1,
    marginTop: 27,
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    height: 57,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  separatorContainer: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  separator: {
    flex: 1,
    marginLeft: 72,
    height: 1,
    backgroundColor: '#EFF0F4',
  },
  iconContainer: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    marginLeft: 12,
    marginRight: 29,
  },
};

class ContactUs extends NavigatorComponent {
  static navLeftButton(route) {
    if (route.index === 0) {
      return (
        <TouchableOpacity onPress={() => { store.dispatch(openSideDrawer()); }}>
          <View style={NavigatorStyle.itemButton}>
            <Icon name="md-menu" size={24} color="white" />
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  }

  static navRightButton(route, navigator) {
    if (route.index !== 0) {
      return (
        <TouchableOpacity
          onPress={() => {
            dismissKeyboard();
            navigator.pop();
          }}
        >
          <Text style={NavigatorStyle.itemTextButton}>
            取消
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
  }

  componentWillMount() {
    if (!this.props.contactInfo || this.props.error) {
      this.props.fetchContactInfo();
    }
  }

  wechatInfoTapped(wechat) {
    if (this.props.isRequesting) {
      return;
    }

    const copyString = wechat;

    Clipboard.setString(copyString);

    this.HUD.flash(2);

    // When user doesn't install wechat, copy string to clipboard.
    // console.log(`weixin://dl/chat?${wechat}`);
    // Linking
    //   .openURL(`weixin://dl/chat?${wechat}`)
    //   .catch((_) => {
    //     if (copyString) {
    //       Clipboard.setString(copyString);
    //
    //       this.HUD.flash(2);
    //     }
    //   });
  }

  phoneInfoTapped(mobile) {
    if (this.props.isRequesting) {
      return;
    }

    // Do nothing when user cancel phone call.
    Linking
      .openURL(`${Platform.OS !== 'android' ? 'telprompt' : 'tel'}:${mobile}`)
      .catch(() => {});
  }

  async emailInfoTapped(email) {
    if (this.props.isRequesting) {
      return;
    }

    const user = await currentUser();

    // Do nothing when user cancel sending email.
    // [喵喵代收] 會員編號: ${user.id}
    Linking
      .openURL(`mailto:${email}?subject=%5B%E5%96%B5%E5%96%B5%E4%BB%A3%E6%94%B6%5D%20%E6%9C%83%E5%93%A1%E7%B7%A8%E8%99%9F%3A%20${user.id}`)
      .catch(() => {});
  }

  render() {
    const { isRequesting, error, contactInfo } = this.props;
    const { mobile, email, wechat } = contactInfo || {};
    return (
      <View style={MiumiuTheme.container}>
        <MiumiuThemeNavigatorBackground>
          <View style={NavigatorStyle.titleView}>
            <Text style={NavigatorStyle.titleText}>
              聯絡我們
            </Text>
          </View>
        </MiumiuThemeNavigatorBackground>
        <View style={styles.body}>
          { error &&
            <TouchableOpacity
              style={{ ...MiumiuTheme.button, ...MiumiuTheme.buttonPrimary, margin: 10 }}
              onPress={() => { this.props.fetchContactInfo(); }}
            >
              <Text style={MiumiuTheme.buttonText}>↻ 讀取失敗，重試一次</Text>
            </TouchableOpacity>
          }
          { !error &&
            <View>
              <TouchableOpacity style={styles.row} onPress={() => this.wechatInfoTapped(wechat)}>
                <View style={styles.iconContainer}>
                  <FontAwesomeIcon name="weixin" size={24} color="gray" />
                </View>
                <Text style={MiumiuTheme.listViewText}>
                  {wechat}
                </Text>
                <Icon
                  style={MiumiuTheme.listViewForwardIndicator}
                  name="md-information-circle"
                  size={22}
                  color="#4285F4"
                />
              </TouchableOpacity>
              <View style={styles.separatorContainer}>
                <View style={styles.separator} />
              </View>
              <TouchableOpacity style={styles.row} onPress={() => this.phoneInfoTapped(mobile)}>
                <View style={styles.iconContainer}>
                  <Icon name="md-call" size={24} color="gray" />
                </View>
                <Text style={MiumiuTheme.listViewText}>
                  {mobile}
                </Text>
                <Icon
                  style={MiumiuTheme.listViewForwardIndicator}
                  name="md-information-circle"
                  size={22}
                  color="#4285F4"
                />
              </TouchableOpacity>
              <View style={styles.separatorContainer}>
                <View style={styles.separator} />
              </View>
              <TouchableOpacity style={styles.row} onPress={() => this.emailInfoTapped(email)}>
                <View style={styles.iconContainer}>
                  <Icon name="md-mail" size={24} color="gray" />
                </View>
                <Text style={MiumiuTheme.listViewText}>
                  {email}
                </Text>
                <Icon
                  style={MiumiuTheme.listViewForwardIndicator}
                  name="md-information-circle"
                  size={22} color="#4285F4"
                />
              </TouchableOpacity>
            </View>
          }
          { isRequesting &&
            <View style={MiumiuTheme.paginationView}>
              <ActivityIndicator />
            </View>
          }
        </View>
        <HUD ref={(ref) => { this.HUD = ref; }} type="success" message="已複製到剪貼簿" />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { contactInfo } = state;
  return {
    ...ownProps,
    contactInfo: contactInfo.data,
    isRequesting: contactInfo.isRequesting,
    error: contactInfo.error,
  };
};

export default connect(
  mapStateToProps,
  { fetchContactInfo },
)(ContactUs);
