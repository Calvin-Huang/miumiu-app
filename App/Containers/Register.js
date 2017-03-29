/**
 * Created by Calvin Huang on 3/4/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
  Navigator,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { MKTextField, MKCheckbox } from 'react-native-material-kit';

import { NavigatorComponent } from '../Components';
import ConfirmRegistrationCode from './ConfirmRegistrationCode';
import { MiumiuTheme } from '../Styles';
import { generalRequestFailed, userRegister } from '../Actions';
import WebInspector from './WebInspector';
import { DOMAIN } from '../Constants/config';

class Register extends NavigatorComponent {
  constructor(props) {
    super(props);

    this.state = {
      account: null,
      name: null,
      password: null,
      passwordConfirmation: null,
    }
  }

  componentWillReceiveProps(props) {
    if (!props.isRequesting && !props.error && props.timestamp) {
      const { timestamp } = this.props;
      const { account, password } = this.state;

      this.pushToNextComponent(ConfirmRegistrationCode, { account, password, timestamp });
    }
  }

  submitRegistration() {
    if (this.props.isRequesting) {
      return;
    }

    const { account, name, password, passwordConfirmation, checkedServiceTerm } = this.state;
    if (password !== passwordConfirmation) {
      this.props.generalRequestFailed(new Error('密碼確認錯誤，請檢查密碼'));
    } else if (!checkedServiceTerm) {
      this.props.generalRequestFailed(new Error('請同意使用協議'));
    } else if (name) {
      this.props.generalRequestFailed(new Error('請輸入名稱'));
    } else {
      this.props.userRegister(account, name, password, passwordConfirmation);
    }
  }

  openServiceTerm() {
    dismissKeyboard();
    this.pushToNextComponent(WebInspector, { title: '服務條款', uri: `${DOMAIN}/auth/term?back=0` }, Navigator.SceneConfigs.FloatFromBottom);
  }

  render() {
    const { account, name, password, passwordConfirmation } = this.state;
    const { isRequesting, error } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => { dismissKeyboard(); }}>
        <LinearGradient
          start={{ x: 0.510023057, y: 1.09617584 }} end={{ x: 0.51374295, y: -0.0557819706 }}
          locations={[0, 0.23, 0.66, 1]}
          colors={['#57C9EB', '#55BCE3', '#4E9ACF', '#487ABD']}
          style={styles.container}
        >
          <View style={styles.body}>
            <View style={MiumiuTheme.textFieldGroup}>
              <MKTextField
                autoCapitalize="none"
                keyboardType="email-address"
                floatingLabelEnabled={true}
                textInputStyle={{ height: 31 }}
                underlineSize={1}
                highlightColor="#D8D8D8"
                placeholder="手機號碼或Email信箱"
                placeholderTextColor="#9E9E9E"
                style={styles.textField}
                onChangeText={(account) => { this.setState({ account }); }}
                value={account}
              />
            </View>
            <View style={MiumiuTheme.textFieldGroup}>
              <MKTextField
                floatingLabelEnabled={true}
                textInputStyle={{ height: 31 }}
                underlineSize={1}
                highlightColor="#D8D8D8"
                placeholder="名稱"
                placeholderTextColor="#9E9E9E"
                style={styles.textField}
                onChangeText={(name) => { this.setState({ name }); }}
                value={name}
              />
            </View>
            <View style={MiumiuTheme.textFieldGroup}>
              <MKTextField
                password={true}
                floatingLabelEnabled={true}
                textInputStyle={{ height: 31 }}
                underlineSize={1}
                highlightColor="#D8D8D8"
                placeholder="密碼"
                placeholderTextColor="#9E9E9E"
                style={{ backgroundColor: 'white' }}
                onChangeText={(password) => { this.setState({ password }); }}
                value={password}
              />
            </View>
            <View style={MiumiuTheme.textFieldGroup}>
              <MKTextField
                password={true}
                floatingLabelEnabled={true}
                textInputStyle={{ height: 31 }}
                underlineSize={1}
                highlightColor="#D8D8D8"
                placeholder="再次確認密碼"
                placeholderTextColor="#9E9E9E"
                style={{ backgroundColor: 'white' }}
                onChangeText={(passwordConfirmation) => { this.setState({ passwordConfirmation }); }}
                value={passwordConfirmation}
              />
            </View>
            { error &&
              <View style={MiumiuTheme.textFieldGroup}>
                <Text style={MiumiuTheme.errorText}>
                  {error.message}
                </Text>
              </View>
            }
            <View style={styles.serviceTermGroup}>
              <MKCheckbox
                fillColor="white"
                checked={this.state.checkedServiceTerm}
                onCheckedChange={() => this.setState({ checkedServiceTerm: !this.state.checkedServiceTerm })}
              />
              <TouchableOpacity
                onPress={() => this.setState({ checkedServiceTerm: !this.state.checkedServiceTerm })}
              >
                <Text style={styles.serviceTermCheckboxText}>註冊喵喵代收同時您已經同意了我們的</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.openServiceTerm.bind(this)}>
                <Text style={styles.serviceTermButtonText}>服務條款</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.roundButton }}
            onPress={this.submitRegistration.bind(this)}
          >
            <LinearGradient
              start={{ x: 0.485544682, y: 1.44908902 }} end={{ x: 0.485544682, y: -0.811377672 }}
              locations={[0, 0.0770538389, 0.605226529, 1]}
              colors={['#57C9EB', '#55BCE3', '#4E9ACF', '#487ABD']}
              style={styles.roundButtonBackground}
            />
            <Text style={MiumiuTheme.buttonText}>
              註冊
            </Text>
            { isRequesting &&
              <ActivityIndicator color="white" style={MiumiuTheme.buttonActivityIndicator} />
            }
          </TouchableOpacity>
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
    marginTop: 74,
  },
  inlineFieldGroup: {
    flexDirection: 'row',
    paddingTop: 4.5,
    paddingBottom: 0,
  },
  registerHintText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 14,
    textAlign: 'center',
  },
  serviceTermGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  serviceTermCheckboxText: {
    fontSize: 14,
    color: 'white',
  },
  serviceTermButtonText: {
    marginLeft: 10,
    fontSize: 14,
    color: 'white',
    textDecorationLine: 'underline',
  },
  roundButtonBackground: {
    borderRadius: 22,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}

const mapStateToProps = (state, ownProps) => {
  const { register, generalRequest } = state;
  return {
    ...ownProps,
    timestamp: register.timestamp,
    isRequesting: generalRequest.isRequesting,
    error: generalRequest.error,
  };
}

export default connect(
  mapStateToProps,
  { generalRequestFailed, userRegister }
)(Register);
