/**
 * Created by Calvin Huang on 3/10/17.
 */

import React from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import { MKTextField } from 'react-native-material-kit';

import { NavigatorComponent, MiumiuThemeNavigatorBackground, HUD } from '../Components';
import { MiumiuTheme, NavigatorStyle } from '../Styles';
import { openSideDrawer, updateUserInfo, userSignOut, FCMSubscribeStateResult } from '../Actions';
import store from '../storeInstance';

const styles = {
  body: {
    flex: 1,
  },
  listViewRow: {
    ...MiumiuTheme.listViewRow,
    paddingHorizontal: 17,
  },
  listViewText: {
    ...MiumiuTheme.listViewText,
    marginVertical: 16,
  },
  updateButton: {
    ...MiumiuTheme.button,
    ...MiumiuTheme.buttonDefault,
    marginVertical: 16,
    marginHorizontal: 17,
  },
  section: {
    marginTop: 27,
  },
};

class Settings extends NavigatorComponent {
  static navLeftButton() {
    return (
      <TouchableOpacity onPress={() => { store.dispatch(openSideDrawer()); }}>
        <View style={NavigatorStyle.itemButton}>
          <Icon name="md-menu" size={24} color="white" />
        </View>
      </TouchableOpacity>
    );
  }

  constructor(props) {
    super(props);

    const { subscribed: { toAll, toMe }, currentUser } = props;

    this.state = {
      currentUser,
      toAll,
      toMe,
    };
  }

  componentWillReceiveProps(props) {
    // Prevent from triggering update from other components.
    if (!this.isCurrentRoute) {
      return;
    }

    const { subscribed: { toAll, toMe }, currentUser } = props;

    this.setState({
      currentUser,
      toAll,
      toMe,
    });

    if (this.props.isRequesting !== props.isRequesting) {
      if (!props.isRequesting) {
        dismissKeyboard();

        if (!props.error) {
          this.HUD.flash(1.5);
        } else {
          Alert.alert(
            '發生了一點問題',
            props.error.message,
          );
        }
      }
    }
  }

  render() {
    const { toAll, toMe, currentUser } = this.state;
    const { name } = currentUser || {};
    return (
      <TouchableWithoutFeedback onPress={() => { dismissKeyboard(); }}>
        <View style={MiumiuTheme.container}>
          <MiumiuThemeNavigatorBackground>
            <View style={NavigatorStyle.titleView}>
              <Text style={NavigatorStyle.titleText}>
                設定
              </Text>
            </View>
          </MiumiuThemeNavigatorBackground>
          <View style={styles.body}>
            <View style={styles.section}>
              <View style={MiumiuTheme.textFieldGroup}>
                <MKTextField
                  floatingLabelEnabled
                  textInputStyle={{ height: 31 }}
                  underlineSize={1}
                  highlightColor="#D8D8D8"
                  placeholder="你的名稱"
                  placeholderTextColor="#9E9E9E"
                  style={{ backgroundColor: 'white' }}
                  editable={this.state.disableShippingNoTextField}
                  onChangeText={text => this.setState({ currentUser: { ...currentUser, name: text } })}
                  value={name}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.updateButton} onPress={() => { this.props.updateUserInfo(name); }}>
              <Text style={MiumiuTheme.buttonText}>
                更新個人資訊
              </Text>
              { this.props.isRequesting &&
                <ActivityIndicator color="white" style={MiumiuTheme.buttonActivityIndicator} />
              }
            </TouchableOpacity>
            <View style={styles.section}>
              <View style={styles.listViewRow}>
                <Text style={styles.listViewText}>貨單通知推播</Text>
                <Switch
                  value={toMe}
                  onValueChange={(value) => {
                    this.setState({ toMe: value });
                    this.props.FCMSubscribeStateResult(toAll, value);
                  }}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.updateButton} onPress={() => { this.props.userSignOut(); }}>
              <Text style={MiumiuTheme.buttonText}>登出</Text>
            </TouchableOpacity>
          </View>

          <HUD ref={(ref) => { this.HUD = ref; }} type="success" message="更新成功" />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { FCM: { subscribed }, generalRequest, user: { currentUser } } = state;
  return {
    ...ownProps,
    subscribed,
    isRequesting: generalRequest.isRequesting,
    error: generalRequest.error,
    currentUser,
  };
};

export default connect(
  mapStateToProps,
  { openSideDrawer, updateUserInfo, userSignOut, FCMSubscribeStateResult },
)(Settings);
