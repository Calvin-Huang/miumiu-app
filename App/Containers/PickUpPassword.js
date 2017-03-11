/**
 * Created by Calvin Huang on 3/11/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import { connect } from 'react-redux';
import { MKTextField } from 'react-native-material-kit';
import Color from 'color';
import Icon from 'react-native-vector-icons/Ionicons';

import dismissKeyboard from 'dismissKeyboard';

import { NavigatorComponent, MiumiuThemeNavigatorBackground } from '../Components';
import { MiumiuTheme, NavigatorStyle } from '../Styles';
import { openSideDrawer } from '../Actions';
import store from '../storeInstance';

class PickUpPassword extends NavigatorComponent {
  static navLeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={() => {
          dismissKeyboard();
          store.dispatch(openSideDrawer());
        }}
      >
        <View style={NavigatorStyle.itemButton}>
          <Icon name="md-menu" size={24} color="white" />
        </View>
      </TouchableOpacity>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      codes: [ '', '', '', '' ],
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
    return (
      <TouchableWithoutFeedback onPress={() => { dismissKeyboard(); }}>
        <View style={MiumiuTheme.container}>
          <MiumiuThemeNavigatorBackground>
            <View style={NavigatorStyle.titleView}>
              <Text style={NavigatorStyle.titleText}>
                取貨鎖設定
              </Text>
            </View>
          </MiumiuThemeNavigatorBackground>
          <View style={styles.body}>
            <View style={styles.pickUpPasswordSection}>
              <Text style={MiumiuTheme.sectionText}>
                請輸入取貨鎖密碼
              </Text>
              <View style={styles.codeFieldGroup}>
                <TextInput ref="codeField1" keyboardType="numeric" maxLength={1} style={styles.codeField} onChangeText={this.codeFieldTextChanged.bind(this, 1)} />
                <TextInput ref="codeField2" keyboardType="numeric" maxLength={1} style={styles.codeField} onChangeText={this.codeFieldTextChanged.bind(this, 2)} />
                <TextInput ref="codeField3" keyboardType="numeric" maxLength={1} style={styles.codeField} onChangeText={this.codeFieldTextChanged.bind(this, 3)} />
                <TextInput ref="codeField4" keyboardType="numeric" maxLength={1} style={styles.codeField} onChangeText={this.codeFieldTextChanged.bind(this, 4)} />
              </View>
            </View>
            <Text style={MiumiuTheme.sectionText}>
              * 基於安全考量，請你協助我們確認是本人在操作
            </Text>
            <View style={MiumiuTheme.textFieldGroup}>
              <MKTextField
                floatingLabelEnabled={true}
                textInputStyle={{ height: 31 }}
                underlineSize={1}
                highlightColor="#D8D8D8"
                placeholder="請輸入密碼"
                placeholderTextColor="#9E9E9E"
                style={{ backgroundColor: 'white' }}
                onChangeText={(password) => { this.setState({ password }); }}
                value={this.state.password}
              />
            </View>
          </View>
          <KeyboardAvoidingView behavior="padding">
            <View style={{ backgroundColor: Color(MiumiuTheme.buttonPrimary.backgroundColor).lighten(0.2), }}>
              <TouchableOpacity
                style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.buttonPrimary }}
                onPress={() => {
                dismissKeyboard();
              }}
              >
                <Text style={MiumiuTheme.actionButtonText}>確認</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  };
}

const styles = {
  body: {
    flex: 1,
  },
  pickUpPasswordSection: {
    alignItems: 'center',
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
    marginBottom: 21,
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
  forgetButton: {
    ...MiumiuTheme.button,
    marginTop: 20,
  },
  forgetButtonText: {
    ...MiumiuTheme.contextText,
    textDecorationLine: 'underline',
  },
};

const mapStateToProps = (state, ownProps) => {
  return ownProps;
}

export default connect(
  mapStateToProps,
  {}
)(PickUpPassword);
