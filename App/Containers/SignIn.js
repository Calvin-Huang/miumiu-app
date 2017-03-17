/**
 * Created by Calvin Huang on 3/1/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback ,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { MKTextField } from 'react-native-material-kit';

import { userSignIn } from '../Actions/userActions';
import { NavigatorComponent } from '../Components';
import WayBills from './WayBills';
import Register from './Register';
import { MiumiuTheme, NavigatorStyle } from '../Styles';

const SignInType = {
  Phone: 0,
  Email: 1,
}

class SignIn extends NavigatorComponent {
  static navLeftButton(route, navigator, index, navState) {
    return (<View />);
  }

  constructor(props) {
    super(props);

    this.state = {
      account: null,
      password: null,
    }
  }

  componentWillReceiveProps(props) {
    if (props.currentUser) {
      dismissKeyboard();

      this.props.navigator.replacePreviousAndPop({
        index: 0,
        component: WayBills,
      });
    }
  }

  signInButtonClicked() {
    this.props.userSignIn('calvin.peak', '12364362')
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => { dismissKeyboard(); }}>
        <LinearGradient
          start={{ x: 0.510023057, y: 1.09617584 }} end={{ x: 0.51374295, y: -0.0557819706 }}
          locations={[0, 0.23, 0.66, 1]}
          colors={['#57C9EB', '#55BCE3', '#4E9ACF', '#487ABD']}
          style={styles.container}
        >
          <View style={NavigatorStyle.titleView}>
            <Image source={require('../../assets/images/icon-miumiu.png')} />
          </View>
          <View style={styles.body}>
            <View style={MiumiuTheme.textFieldGroup}>
              <MKTextField
                keyboardType="email-address"
                floatingLabelEnabled={true}
                textInputStyle={{ height: 31 }}
                underlineSize={1}
                highlightColor="#D8D8D8"
                placeholder="手機號碼或Email信箱"
                placeholderTextColor="#9E9E9E"
                onChangeText={(account) => { this.setState({ account }); }}
                value={this.state.account}
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
                value={this.state.password}
              />
            </View>
            <TouchableOpacity
              style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.roundButton }}
              onPress={this.signInButtonClicked.bind(this)}
            >
              <LinearGradient
                start={{ x: 0.485544682, y: 1.44908902 }} end={{ x: 0.485544682, y: -0.811377672 }}
                locations={[0, 0.0770538389, 0.605226529, 1]}
                colors={['#57C9EB', '#55BCE3', '#4E9ACF', '#487ABD']}
                style={styles.signInButtonBackground}
              />
              <Text style={MiumiuTheme.buttonText}>
                登入
              </Text>
            </TouchableOpacity>
            <View style={style.otherWays}>
              <TouchableOpacity style={styles.forgetButton}>
                <Text style={styles.forgetButtonText}>
                  忘記帳號或密碼了嗎？
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separatorContainer}>
              <View style={styles.separator} />
              <Text style={styles.separatorText}>
                或是
              </Text>
              <View style={styles.separator} />
            </View>
            <TouchableOpacity
              style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.buttonWarning, ...MiumiuTheme.roundButton }}
              onPress={() => { dismissKeyboard(); this.pushToNextComponent(Register); }}
            >
              <Text style={{ ...MiumiuTheme.buttonText, ...MiumiuTheme.textShadow }}>
                註冊
              </Text>
            </TouchableOpacity>
          </View>
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
    marginTop: 92,
    alignItems: 'center',
  },
  forgetButton: {
    padding: 14,
  },
  forgetButtonText: {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  separatorText: {
    color: 'white',
    fontSize: 14,
    paddingHorizontal: 14,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  separatorContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    height: 0.5,
    marginVertical: 14,
  },
  signInButtonBackground: {
    borderRadius: 22,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

export default connect(
  (state, ownProps) => {
    return {
      ...ownProps,
      currentUser: state.user.currentUser,
    }
  },
  { userSignIn }
)(SignIn);
