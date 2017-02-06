/**
 * Created by Calvin Huang on 2/6/17.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export default class WayBill extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBackgroundContainer}>
          <LinearGradient
            start={{ x: 0.485544672, y: 1.08471279 }} end={{ x: 0.485544682, y: -0.0498809549 }}
            locations={[0, 0.0802375638, 0.438058036, 1]}
            colors={['#57C9EB', '#55BCE3', '#4E9ACF', '#487ABD']}
            style={styles.navBackground}
          >
          </LinearGradient>
        </View>
        <View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  navBackground: {
    flex: 0,
    height: 104,
  },
  navBackgroundContainer: {
    height: 64,
    overflow: 'hidden',
  }
});