/**
 * Created by calvin.huang on 29/03/2017.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Navigator,
  TouchableOpacity,
  WebView,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { NavigatorComponent, MiumiuThemeNavigatorBackground } from '../Components';
import { NavigatorStyle, MiumiuTheme } from '../Styles';

export default class WebInspector extends NavigatorComponent {
  static navLeftButton(route, navigator, index, navState) {
    if (Platform.OS === 'android') {
      return (
        <TouchableOpacity onPress={() => {
          navigator.pop();
        }}>
          <View style={NavigatorStyle.itemButton}>
            <Icon name="md-close" size={24} color="white" />
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  static navRightButton(route, navigator, index, navState) {
    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity onPress={() => {
          navigator.pop();
        }}>
          <Text style={NavigatorStyle.itemTextButton}>
            關閉
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  render() {
    const { route: { data: { title, uri } } } = this.props;
    return (
      <View style={MiumiuTheme.container}>
        <MiumiuThemeNavigatorBackground>
          <View style={NavigatorStyle.titleView}>
            <Text style={NavigatorStyle.titleText}>
              {title}
            </Text>
          </View>
        </MiumiuThemeNavigatorBackground>
        <WebView style={styles.body} source={{ uri: uri }} />
      </View>
    );
  }
}

const styles = {
  body: {
    flex: 1,
  },
};
