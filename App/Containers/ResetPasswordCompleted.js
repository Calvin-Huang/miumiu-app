/**
 * Created by calvin.huang on 27/03/2017.
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import { NavigatorComponent, HUD } from '../Components';
import WayBills from './WayBills';
import { MiumiuTheme, NavigatorStyle } from '../Styles';
import { userSignIn, userSignInSuccess } from '../Actions';
import { setAuthenticationToken, currentUser } from '../Utils/authentication';
import store from '../storeInstance';

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
};

class ResetPasswordCompleted extends NavigatorComponent {
  static navLeftButton(route) {
    return (
      <TouchableOpacity
        onPress={() => {
          const { account, password } = route.data;
          store.dispatch(userSignIn(account, password));
        }}
      >
        <View style={NavigatorStyle.itemButton}>
          <Icon name="md-close" size={24} color="white" />
        </View>
      </TouchableOpacity>
    );
  }

  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.currentUser) {
      const { navigator } = this.props;
      navigator.immediatelyResetRouteStack([{ index: 0, component: WayBills }]);
    }

    if (props.errorMessage && this.props.errorMessage !== props.errorMessage) {
      // Wait animation done or alert will interrupt flow.
      setTimeout(() => {
        Alert.alert(
          '發生了一點問題',
          props.errorMessage,
        );
      }, 250);
    }
  }

  async signIn() {
    const { isSigningIn, route: { data: { account, password, token } } } = this.props;
    if (isSigningIn) {
      return;
    }

    if (token) {
      await setAuthenticationToken(token);
      const user = await currentUser();
      this.props.userSignInSuccess(user);
    } else {
      this.props.userSignIn(account, password);
    }
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
          <Icon name="md-bulb" size={80} color="white" style={styles.statusIcon} />
          <Text style={styles.heroText}>密碼更新成功！{'\n'}歡迎回來喵喵代收</Text>
        </View>
        <TouchableOpacity
          style={{ ...MiumiuTheme.actionButton, ...styles.transparentButton }}
          onPress={this.signIn}
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
  { userSignIn, userSignInSuccess },
)(ResetPasswordCompleted);
