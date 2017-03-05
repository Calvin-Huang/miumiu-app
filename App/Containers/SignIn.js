/**
 * Created by Calvin Huang on 3/1/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Picker,
  Animated,
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
      areaCode: '+853',
      email: null,
      phone: null,
      password: null,
      signInType: SignInType.Phone,
      pickerToBottom: new Animated.Value(-255),
    }
  }

  componentWillReceiveProps(props) {
    if (props.currentUser) {
      dismissKeyboard();

      this.props.navigator.popToTop();
    }
  }

  signInButtonClicked() {
    this.props.userSignIn('calvin.peak', '12364362')
  }

  showAreaCodePicker() {
    Animated.timing(
      this.state.pickerToBottom,
      {
        toValue: 0,
        duration: 250,
        easing: Easing.inOut(Easing.quad),
      }
    ).start();
  }

  hideAreaCodePicker() {
    Animated.timing(
      this.state.pickerToBottom,
      {
        toValue: -255,
        duration: 250,
        easing: Easing.inOut(Easing.quad),
      }
    ).start();
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
            <View style={styles.switchButtonGroup}>
              <TouchableOpacity
                style={{ ...styles.switchButton, ...(this.state.signInType === SignInType.Phone ? styles.switchButtonActive : {}) }}
                onPress={() => this.setState({ signInType: SignInType.Phone })}
              >
                <Text style={{ ...styles.switchButtonText }}>
                  手機號碼登入
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.switchButton, ...(this.state.signInType === SignInType.Email ? styles.switchButtonActive : {}) }}
                onPress={() => this.setState({ signInType: SignInType.Email })}
              >
                <Text style={{ ...styles.switchButtonText }}>
                  信箱登入
                </Text>
              </TouchableOpacity>
            </View>
            { this.state.signInType === SignInType.Phone &&
              <View style={{ ...MiumiuTheme.textFieldGroup, ...styles.inlineFieldGroup }}>
                <TouchableOpacity
                  style={styles.dropDownButton}
                  onPress={this.showAreaCodePicker.bind(this)}
                >
                  <Text style={styles.dropDownButtonText}>
                    {this.state.areaCode}
                  </Text>
                  <View style={styles.triangle} />
                </TouchableOpacity>
                <View style={MiumiuTheme.fixMKTextFieldStyleError}>
                  <MKTextField
                    keyboardType="numeric"
                    floatingLabelEnabled={true}
                    textInputStyle={{ height: 31 }}
                    underlineSize={1}
                    highlightColor="#D8D8D8"
                    placeholder="手機號碼"
                    placeholderTextColor="#9E9E9E"
                    onChangeText={(text) => { this.setState({ width: text }); }}
                    value={this.state.phone}
                  />
                </View>
              </View>
            }
            { this.state.signInType === SignInType.Email &&
              <View style={MiumiuTheme.textFieldGroup}>
                <MKTextField
                  keyboardType="email-address"
                  floatingLabelEnabled={true}
                  textInputStyle={{ height: 31 }}
                  underlineSize={1}
                  highlightColor="#D8D8D8"
                  placeholder="Email"
                  placeholderTextColor="#9E9E9E"
                  onChangeText={(text) => { this.setState({ width: text }); }}
                  value={this.state.email}
                />
              </View>
            }
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
                onChangeText={(text) => { this.setState({ weight: text }); }}
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
          <Animated.View
            style={{
              ...styles.areaCodePicker,
              bottom: this.state.pickerToBottom,
            }}
          >
            <View style={MiumiuTheme.pickerToolBar}>
              <TouchableOpacity onPress={this.hideAreaCodePicker.bind(this)}>
                <Text style={MiumiuTheme.pickerToolBarButtonText}>
                  關閉
                </Text>
              </TouchableOpacity>
            </View>
            <Picker
              style={MiumiuTheme.picker}
              selectedValue={this.state.areaCode}
              onValueChange={(code) => this.setState({areaCode: code})}
            >
              <Picker.Item label="澳門 (+853)" value="+853" />
              <Picker.Item label="中國 (+86)" value="+86" />
              <Picker.Item label="香港 (+852)" value="+852" />
            </Picker>
          </Animated.View>
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
    alignItems: 'center',
  },
  inlineFieldGroup: {
    flexDirection: 'row',
    paddingTop: 4.5,
    paddingBottom: 0,
  },
  switchButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  switchButton: {
    marginHorizontal: 18,
  },
  switchButtonText: {
    flex: 0,
    color: 'white',
    fontSize: 16,
    padding: 6,
  },
  switchButtonActive: {
    borderBottomColor: 'white',
    borderBottomWidth: 3,
  },
  dropDownButton: {
    marginTop: 11,
    marginRight: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(155, 155, 155, 0.1)',
  },
  dropDownButtonText: {
    fontSize: 16,
    color: '#9E9E9E',
    paddingVertical: 8,
    width: 60,
    textAlign: 'center',
  },
  triangle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderTopWidth: 12,
    borderTopColor: '#F5C163',
    borderRightWidth: 12,
    borderRightColor: 'transparent',
    transform: [
      { rotate: '180deg' }
    ],
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
  areaCodePicker: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
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
