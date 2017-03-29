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
} from 'react-native';

import { NavigatorComponent, MiumiuThemeNavigatorBackground } from '../Components';
import { NavigatorStyle, MiumiuTheme } from '../Styles';

export default class WebInspector extends NavigatorComponent {
  static navRightButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity onPress={() => {
          navigator.pop();
        }}>
        <Text style={NavigatorStyle.itemTextButton}>
          關閉
        </Text>
      </TouchableOpacity>
    );
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
