/**
 * Created by Calvin Huang on 3/4/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Navigator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import { NavigatorComponent, HUD } from '../Components';
import WayBills from './WayBills';
import { MiumiuTheme, NavigatorStyle } from '../Styles';
import { userSignIn } from '../Actions';
import store from '../storeInstance';

class RegistrationCompleted extends NavigatorComponent {
  static navLeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity onPress={() => {
          const { account, password } = route.data;
          store.dispatch(userSignIn(account, password));
        }}>
        <View style={NavigatorStyle.itemButton}>
          <Icon name="md-close" size={24} color="white" />
        </View>
      </TouchableOpacity>
    );
  }

  componentWillReceiveProps(props) {
    if (props.currentUser) {
      this.props.navigator.replace({ index: 0, component: WayBills });
    }

    if (props.errorMessage && this.props.errorMessage !== props.errorMessage) {
      Alert.alert(
        '發生了一點問題',
        props.errorMessage,
      );
    }
  }

  signIn() {
    const { isSigningIn, route: { data: { account, password } } } = this.props;
    if (isSigningIn) {
      return;
    }

    this.props.userSignIn(account, password);
  }

  render() {
    const { isSigningIn } = this.props;
    return (
      <LinearGradient
        start={{ x: 0.510023057, y: 1.09617584 }} end={{ x: 0.51374295, y: -0.0557819706 }}
        locations={[0, 0.23, 0.66, 1]}
        colors={['#57C9EB', '#55BCE3', '#4E9ACF', '#487ABD']}
        style={styles.container}
      >
        <View style={styles.body}>
          <Icon name="md-checkmark-circle-outline" size={80} color="white" style={styles.statusIcon} />
          <Text style={styles.heroText}>註冊成功！{'\n'}開始使用喵喵代收吧</Text>
        </View>
        <TouchableOpacity
          style={{ ...MiumiuTheme.actionButton, ...styles.transparentButton }}
          onPress={this.signIn.bind(this)}
        >
          <Text style={{ ...MiumiuTheme.actionButtonText, ...MiumiuTheme.textShadow }}>
            好的！
          </Text>
        </TouchableOpacity>
        <HUD visible={isSigningIn} type="progress" message="登入中" />
      </LinearGradient>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginTop: 64,
    alignItems: 'center',
  },
  statusIcon: {
    marginTop: 40,
  },
  roundButtonBackground: {
    borderRadius: 22,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  heroText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginVertical: 30,
    lineHeight: 28,
  },
  transparentButton: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.25)',
  },
}

const mapStateToProps = (state, ownProps) => {
  const { user } = state;

  return {
    ...ownProps,
    isSigningIn: user.isSigningIn,
    currentUser: user.currentUser,
    errorMessage: user.result.error ? user.result.error.message : null,
  };
};

export default connect(
  mapStateToProps,
  { userSignIn }
)(RegistrationCompleted);
