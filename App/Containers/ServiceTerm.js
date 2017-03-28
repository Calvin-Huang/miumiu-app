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
import { DOMAIN } from '../Constants/config';

export default class ServiceTerm extends NavigatorComponent {
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
    return (
      <View style={MiumiuTheme.container}>
        <MiumiuThemeNavigatorBackground>
          <View style={NavigatorStyle.titleView}>
            <Text style={NavigatorStyle.titleText}>
              服務條款
            </Text>
          </View>
        </MiumiuThemeNavigatorBackground>
        <WebView style={styles.body} source={{ uri: `${DOMAIN}/auth/term?back=0` }} />
      </View>
    );
  }
}

const styles = {
  body: {
    flex: 1,
  },
};
