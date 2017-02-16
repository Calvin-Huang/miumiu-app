/**
 * Created by Calvin Huang on 2/6/17.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { NavigatorComponent, MiumiuThemeNavigatorBackground } from '../Components';
import { NavigatorStyle } from '../Styles';

export default class WayBill extends NavigatorComponent {
  static navRightButton({ data: { id } }, navigator, index, navState) {
    return (
      <TouchableOpacity onPress={() => { console.log(id); }}>
        <Text style={NavigatorStyle.itemButton}>
          刪除
        </Text>
      </TouchableOpacity>
    );
  }

  static title({ data: { id } }, navigator, index, navState) {
    return (
      <Text style={NavigatorStyle.title}>
        單號: { id }
      </Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MiumiuThemeNavigatorBackground />
        <View>

        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
};