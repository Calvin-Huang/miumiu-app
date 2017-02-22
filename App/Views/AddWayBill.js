/**
 * Created by Calvin Huang on 2/22/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

import { MKTextField } from 'react-native-material-kit';
import Color from 'color';
import { NavigatorComponent, MiumiuThemeNavigatorBackground } from '../Components';
import { NavigatorStyle, MiumiuTheme } from '../Styles';

export default class AddWayBill extends NavigatorComponent {
  static navRightButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity onPress={() => {
        dismissKeyboard();
        navigator.pop();
      }}>
        <Text style={NavigatorStyle.itemButton}>
          取消
        </Text>
      </TouchableOpacity>
    );
  }

  static title() {
    return (
      <Text style={NavigatorStyle.title}>
        新增貨單
      </Text>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      id: '',
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => { dismissKeyboard(); }}>
        <View style={MiumiuTheme.container}>
          <MiumiuThemeNavigatorBackground />
          <View style={styles.body}>
            <View style={MiumiuTheme.textFieldGroup}>
              <MKTextField
                floatingLabelEnabled={true}
                textInputStyle={{ height: 31 }}
                underlineSize={1}
                highlightColor="#D8D8D8"
                placeholder="請輸入單號"
                placeholderTextColor="#9E9E9E"
                style={{ backgroundColor: 'white' }}
                onChangeText={(text) => { this.setState({ id: text }); }}
                value={this.state.text}
              />
            </View>
          </View>

          <KeyboardAvoidingView behavior="padding">
            <View style={{ backgroundColor: Color(MiumiuTheme.buttonPrimary.backgroundColor).lighten(0.2), }}>
              <TouchableOpacity
                style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.buttonPrimary }}
                onPress={() => { console.log(this.state.id); }}
              >
                <Text style={MiumiuTheme.actionButtonText}>送出單號</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  body: {
    flex: 1,
    marginTop: 27,
  },
}
