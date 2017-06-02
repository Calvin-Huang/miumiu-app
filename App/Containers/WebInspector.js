/**
 * Created by calvin.huang on 29/03/2017.
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  WebView,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { NavigatorComponent, MiumiuThemeNavigatorBackground } from '../Components';
import { NavigatorStyle, MiumiuTheme } from '../Styles';

const styles = {
  body: {
    flex: 1,
  },
};

export default class WebInspector extends NavigatorComponent {
  static navLeftButton(route, navigator) {
    if (Platform.OS === 'android') {
      return (
        <TouchableOpacity
          onPress={() => {
            navigator.pop();
          }}
        >
          <View style={NavigatorStyle.itemButton}>
            <Icon name="md-close" size={24} color="white" />
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  }

  static navRightButton(route, navigator) {
    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity
          onPress={() => {
            navigator.pop();
          }}
        >
          <Text style={NavigatorStyle.itemTextButton}>
            關閉
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
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
        <WebView style={styles.body} source={{ uri }} />
      </View>
    );
  }
}
