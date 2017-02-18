/**
 * Created by Calvin Huang on 2/18/17.
 */

import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import { NavigatorComponent, MiumiuThemeNavigatorBackground } from '../Components';
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
      <View>

      </View>
    );
  }
}
