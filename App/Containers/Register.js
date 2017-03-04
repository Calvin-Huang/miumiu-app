/**
 * Created by Calvin Huang on 3/4/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { MKTextField, MKCheckbox } from 'react-native-material-kit';

import { NavigatorComponent } from '../Components';
import ConfirmRegistrationCode from './ConfirmRegistrationCode';
import { MiumiuTheme } from '../Styles';

export default class Register extends NavigatorComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      phone: null,
      password: null,
    }
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
          <View style={styles.body}>
            <Text style={styles.registerHintText}>
              手機或信箱可以擇一填寫
            </Text>
            <View style={{ ...MiumiuTheme.textFieldGroup, ...styles.inlineFieldGroup }}>
              <TouchableOpacity style={styles.dropDownButton}>
                <Text style={styles.dropDownButtonText}>
                  +81
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
                  style={styles.textField}
                  onChangeText={(text) => { this.setState({ width: text }); }}
                  value={this.state.phone}
                />
              </View>
            </View>
            <View style={MiumiuTheme.textFieldGroup}>
              <MKTextField
                keyboardType="email-address"
                floatingLabelEnabled={true}
                textInputStyle={{ height: 31 }}
                underlineSize={1}
                highlightColor="#D8D8D8"
                placeholder="Email"
                placeholderTextColor="#9E9E9E"
                style={styles.textField}
                onChangeText={(text) => { this.setState({ width: text }); }}
                value={this.state.email}
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
                onChangeText={(text) => { this.setState({ weight: text }); }}
                value={this.state.password}
              />
            </View>
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
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.serviceTermButtonText}>使用協議</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.roundButton }}
            onPress={() => { this.pushToNextComponent(ConfirmRegistrationCode); }}
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
    marginTop: 64,
  },
  inlineFieldGroup: {
    flexDirection: 'row',
    paddingTop: 4.5,
    paddingBottom: 0,
  },
  registerHintText: {
    fontSize: 14,
    color: 'white',
    margin: 14,
    textAlign: 'center',
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
    width: 50,
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
