/**
 * Created by Calvin Huang on 2/16/17.
 */

import React, { PropTypes, Component } from 'react';
import {
  View,
  Platform,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const styles = {
  navBackground: {
    flex: 0,
    height: 104,
  },
  navBackgroundContainer: {
    height: Platform.OS === 'ios' ? 64 : 56,
    overflow: 'hidden',
  },
};

export default class MiumiuThemeNavigatorBackground extends Component {
  static propTypes = {
    style: PropTypes.shape(),
    children: PropTypes.node,
  };

  static defaultProps = {
    style: null,
    children: null,
  };

  render() {
    return (
      <View removeClippedSubviews style={{ ...styles.navBackgroundContainer, ...this.props.style }}>
        <LinearGradient
          start={{ x: 0.485544672, y: 1.08471279 }} end={{ x: 0.485544682, y: -0.0498809549 }}
          locations={[0, 0.0802375638, 0.438058036, 1]}
          colors={['#57C9EB', '#55BCE3', '#4E9ACF', '#487ABD']}
          style={styles.navBackground}
        >
          { this.props.children }
        </LinearGradient>
      </View>
    );
  }
}
