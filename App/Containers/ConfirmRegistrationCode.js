/**
 * Created by Calvin Huang on 3/4/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Navigator,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import { NavigatorComponent } from '../Components';
import RegistrationCompleted from './RegistrationCompleted';
import { MiumiuTheme } from '../Styles';
import { validateEmail } from '../Utils/validator';

export default class ConfirmRegistrationCode extends NavigatorComponent {
  constructor(props) {
    super(props);

    this.state = {
      codes: [ '', '', '', '' ],
      isAccountTypeEmail: validateEmail(props.route.data.account),
    };
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

  render() {
    const { isAccountTypeEmail } = this.state;
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
            <Text style={styles.registerHintText}>
              如果沒有收到驗證{ isAccountTypeEmail ? '信件' : '碼' }，您可以在 <Text>0:20</Text> 後
            </Text>
            <TouchableOpacity>
              <Text style={{ ...MiumiuTheme.buttonText, ...styles.underline }}>重新發送驗證{ isAccountTypeEmail ? '信件' : '碼' }</Text>
            </TouchableOpacity>
          </View>
          { !isAccountTypeEmail &&
            <TouchableOpacity
              style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.roundButton }}
              onPress={() => {
                dismissKeyboard();

                // Disable swipe back gesture.
                this.pushToNextComponent(RegistrationCompleted, null, { ...Navigator.SceneConfigs.PushFromRight, gestures: {} });
              }}
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
            </TouchableOpacity>
          }
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
