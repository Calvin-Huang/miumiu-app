/**
 * Created by Calvin Huang on 2/18/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import Color from 'color';
import { NavigatorComponent, MiumiuThemeNavigatorBackground } from '../Components';
import { MiumiuTheme, NavigatorStyle } from '../Styles';

export default class UrgentProcessing extends NavigatorComponent {
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

  static title(route, navigator, index, navState) {
    return (
      <Text style={NavigatorStyle.title}>
        加急服務
      </Text>
    )
  }

  constructor(props) {
    super(props);

    this.state = {
      data: {
        id: props.route.id,
      },
    };
  }

  render() {
    return (
        <View style={MiumiuTheme.container}>
          <MiumiuThemeNavigatorBackground />
          <View style={styles.body}>

          </View>

          <KeyboardAvoidingView behavior="padding">
            <View style={{ backgroundColor: Color(MiumiuTheme.actionButton.backgroundColor).lighten(0.2), }}>
              <TouchableOpacity style={MiumiuTheme.actionButton} onPress={() => { console.log(data.id); } }>
                <Text style={MiumiuTheme.actionButtonText}>申請加急</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
    );
  }
}

const styles = {
  body: {
    flex: 1,
    marginTop: 27,
  },
};
