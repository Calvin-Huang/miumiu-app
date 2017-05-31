/**
 * Created by calvin.huang on 27/03/2017.
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { MKTextField } from 'react-native-material-kit';

import { NavigatorComponent } from '../Components';
import ConfirmResetPasswordCode from './ConfirmResetPasswordCode';
import { MiumiuTheme } from '../Styles';
import { generalRequestFailed, userRequestResetPassword } from '../Actions';

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
};

class ForgetPassword extends NavigatorComponent {
  constructor(props) {
    super(props);

    this.state = {
      account: null,
    };

    this.submitRequest = this.submitRequest.bind(this);
  }

  componentWillReceiveProps(props) {
    const { navigator, route } = props;
    const currentRoute = navigator.getCurrentRoutes()[navigator.getCurrentRoutes().length - 1];
    if (currentRoute.index === route.index && !props.isRequesting && !props.error && props.timestamp) {
      const { timestamp } = this.props;
      const { account } = this.state;

      this.pushToNextComponent(ConfirmResetPasswordCode, { account, timestamp });
    }
  }

  submitRequest() {
    if (this.props.isRequesting) {
      return;
    }

    const { account } = this.state;
    if (account) {
      this.props.userRequestResetPassword(account);
    }
  }

  render() {
    const { account } = this.state;
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
                floatingLabelEnabled
                textInputStyle={{ height: 31 }}
                underlineSize={1}
                highlightColor="#D8D8D8"
                placeholder="手機號碼"
                placeholderTextColor="#9E9E9E"
                style={{ backgroundColor: 'white' }}
                onChangeText={(text) => { this.setState({ account: text }); }}
                value={account}
              />
            </View>
            { error &&
              <View style={MiumiuTheme.textFieldGroup}>
                <Text style={MiumiuTheme.errorText}>
                  {error.message}
                </Text>
              </View>
            }
          </View>
          <TouchableOpacity
            style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.roundButton }}
            onPress={this.submitRequest}
          >
            <LinearGradient
              start={{ x: 0.485544682, y: 1.44908902 }} end={{ x: 0.485544682, y: -0.811377672 }}
              locations={[0, 0.0770538389, 0.605226529, 1]}
              colors={['#57C9EB', '#55BCE3', '#4E9ACF', '#487ABD']}
              style={styles.roundButtonBackground}
            />
            <Text style={MiumiuTheme.buttonText}>
              重設密碼
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

const mapStateToProps = (state, ownProps) => {
  const { requestResetPassword, generalRequest } = state;
  return {
    ...ownProps,
    timestamp: requestResetPassword.timestamp,
    isRequesting: generalRequest.isRequesting,
    error: generalRequest.error,
  };
};

export default connect(
  mapStateToProps,
  { generalRequestFailed, userRequestResetPassword },
)(ForgetPassword);
