/**
 * Created by Calvin Huang on 2/6/17.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { NavigatorComponent, MiumiuThemeNavigatorBackground } from '../Components';

export default class WayBill extends NavigatorComponent {
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