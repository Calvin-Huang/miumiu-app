/**
 * Created by Calvin Huang on 3/4/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
  Navigator,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import leftPad from 'left-pad';

import { NavigatorComponent, HUD } from '../Components';
import RegistrationCompleted from './RegistrationCompleted';
import { MiumiuTheme } from '../Styles';
import { userResendConfirmCode, userConfirmRegistration } from '../Actions/userActions';
import { validateEmail } from '../Utils/validator';
import { COUNTDOWN_SECONDS } from '../Constants/config';

class ConfirmRegistrationCode extends NavigatorComponent {
  constructor(props) {
    super(props);

    const { route: { data } } = props;

    this.state = {
      codes: [ '', '', '', '' ],
      isAccountTypeEmail: validateEmail(data.account),
      timestamp: data.timestamp,
      remainingTime: '0:00',
      canRetry: false,
    };
  }

  componentWillMount() {
    this.timer = setInterval(() => {
      this.countDown();
    }, 0.5);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentWillReceiveProps(props) {
    const { route: { data }, confirmState, resendConfirmCode } = props;
    if ((this.props.resendConfirmCode.isRequesting !== resendConfirmCode.isRequesting) && !resendConfirmCode.isRequesting) {
      if (resendConfirmCode.error) {
        Alert.alert(
          '發生了一點問題',
          props.error.message,
        );

      } else if (resendConfirmCode.timestamp && this.state.timestamp !== resendConfirmCode.timestamp) {
        this.setState({ canRetry: false, timestamp: resendConfirmCode.timestamp });

        this.timer = setInterval(() => {
          this.countDown();
        }, 0.5);

        this.refs.HUD.flash(2);
      }
    }

    if ((this.props.confirmState.isRequesting !== confirmState.isRequesting) && !confirmState.isRequesting && !confirmState.error) {

      // Disable swipe back gesture.
      this.pushToNextComponent(RegistrationCompleted, data, { ...Navigator.SceneConfigs.PushFromRight, gestures: {} });
    }
  }

  codeFieldTextChanged(codeFieldNumber, text) {
    const nextCodeField = this.refs[`codeField${codeFieldNumber + 1}`];

    const codes = this.state.codes;
    codes[codeFieldNumber] = text;
    this.setState({
      codes
    });

    if (text !== '') {
      if (nextCodeField) {
        nextCodeField.focus();
      } else {
        dismissKeyboard();
      }
    }
  }

  countDown() {
    const { timestamp } = this.state;

    const diffSeconds = moment.unix(timestamp).add(COUNTDOWN_SECONDS, 'seconds').diff(moment(), 'seconds');

    if (diffSeconds > 0) {
      this.setState({ remainingTime: `${Math.floor(diffSeconds / 60)}:${leftPad(diffSeconds % 60, 2, '0')}` });
    } else {
      this.setState({ remainingTime: '0:00', canRetry: true });
      clearInterval(this.timer);
    }
  }

  resendRegistrationConfirmCode() {
    const { resendConfirmCode, route: { data: { account } } } = this.props;
    const { canRetry } = this.state;

    if (!canRetry || resendConfirmCode.isRequesting) {
      return;
    }

    this.props.userResendConfirmCode(account);
  }

  submitConfirmCode() {
    const { confirmState, route: { data: { account: phone } } } = this.props;
    const { isAccountTypeEmail, codes } = this.state;

    if (isAccountTypeEmail || confirmState.isRequesting) {
      return;
    }

    this.props.userConfirmRegistration(phone, codes.join(''));
  }

  render() {
    const { route: { data: { account, timestamp } }, confirmState, resendConfirmCode } = this.props;
    const { isAccountTypeEmail, remainingTime, canRetry } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => { dismissKeyboard(); }}>
        <LinearGradient
          start={{ x: 0.510023057, y: 1.09617584 }} end={{ x: 0.51374295, y: -0.0557819706 }}
          locations={[0, 0.23, 0.66, 1]}
          colors={['#57C9EB', '#55BCE3', '#4E9ACF', '#487ABD']}
          style={styles.container}
        >
          <View style={styles.body}>
            <Text style={styles.registerHintText}>
              { isAccountTypeEmail ? '請收取驗證信件，信件可能延遲一兩分鐘送出' : '請收取驗證碼，訊息可能延遲一兩分鐘送出' }
            </Text>
            { isAccountTypeEmail &&
              <Icon style={{ alignSelf: 'center' }} name="md-mail" color="white" size={40} />
            }
            { !isAccountTypeEmail &&
              <View style={styles.codeFieldGroup}>
                <TextInput ref="codeField1" keyboardType="numeric" maxLength={1} style={styles.codeField} autoFocus={true} onChangeText={this.codeFieldTextChanged.bind(this, 1)} />
                <TextInput ref="codeField2" keyboardType="numeric" maxLength={1} style={styles.codeField} onChangeText={this.codeFieldTextChanged.bind(this, 2)} />
                <TextInput ref="codeField3" keyboardType="numeric" maxLength={1} style={styles.codeField} onChangeText={this.codeFieldTextChanged.bind(this, 3)} />
                <TextInput ref="codeField4" keyboardType="numeric" maxLength={1} style={styles.codeField} onChangeText={this.codeFieldTextChanged.bind(this, 4)} />
              </View>
            }
            { confirmState.error &&
            <Text style={{ ...styles.registerHintText, color: 'red' }}>{confirmState.error.message}</Text>
            }
            <Text style={styles.registerHintText}>
              如果沒有收到驗證{ isAccountTypeEmail ? '信件' : '碼' }，您可以在 <Text style={{ fontWeight: 'bold' }}>{remainingTime}</Text> 後
            </Text>
            <TouchableOpacity
              disabled={!canRetry}
              onPress={this.resendRegistrationConfirmCode.bind(this)}
            >
              <Text style={{
                ...MiumiuTheme.buttonText,
                ...styles.underline,
                opacity: canRetry ? 1 : 0.7,
              }}>重新發送驗證{ isAccountTypeEmail ? '信件' : '碼' }</Text>
              { resendConfirmCode.isRequesting &&
                <ActivityIndicator color="white" style={{ ...MiumiuTheme.buttonActivityIndicator, paddingRight: 60 }} />
              }
            </TouchableOpacity>
          </View>
          { !isAccountTypeEmail &&
            <TouchableOpacity
              style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.roundButton }}
              onPress={this.submitConfirmCode.bind(this)}
            >
              <LinearGradient
                start={{ x: 0.485544682, y: 1.44908902 }} end={{ x: 0.485544682, y: -0.811377672 }}
                locations={[0, 0.0770538389, 0.605226529, 1]}
                colors={['#57C9EB', '#55BCE3', '#4E9ACF', '#487ABD']}
                style={styles.roundButtonBackground}
              />
              <Text style={MiumiuTheme.buttonText}>
                送出
              </Text>
              { confirmState.isRequesting &&
                <ActivityIndicator color="white" style={MiumiuTheme.buttonActivityIndicator} />
              }
            </TouchableOpacity>
          }
          <HUD ref="HUD" type="success" message="送出成功" />
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  body: {
    marginTop: 64,
  },
  registerHintText: {
    fontSize: 14,
    color: 'white',
    margin: 14,
    textAlign: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  roundButtonBackground: {
    borderRadius: 22,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  codeFieldGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  codeField: {
    width: 40,
    height: 54,
    marginHorizontal: 16,
    marginVertical: 24,
    backgroundColor: 'white',
    borderRadius: 2,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    textAlign: 'center',
  },
}

const mapStateToProps = (state, ownProps) => {
  const { generalRequest, resendConfirmCode } = state;
  return {
    ...ownProps,
    resendConfirmCode,
    confirmState: generalRequest,
  };
};

export default connect(
  mapStateToProps,
  { userResendConfirmCode, userConfirmRegistration }
)(ConfirmRegistrationCode);
