/**
 * Created by Calvin Huang on 3/4/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Navigator,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import { NavigatorComponent } from '../Components';
import WayBills from './WayBills';
import { MiumiuTheme, NavigatorStyle } from '../Styles';

export default class ConfirmRegistrationCode extends NavigatorComponent {
  static navLeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity onPress={() => {
          navigator.replace({ index: 0, component: WayBills })
        }}>
        <View style={NavigatorStyle.itemButton}>
          <Icon name="md-close" size={24} color="white" />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <LinearGradient
        start={{ x: 0.510023057, y: 1.09617584 }} end={{ x: 0.51374295, y: -0.0557819706 }}
        locations={[0, 0.23, 0.66, 1]}
        colors={['#57C9EB', '#55BCE3', '#4E9ACF', '#487ABD']}
        style={styles.container}
      >
        <View style={styles.body}>
          <Icon name="md-checkmark-circle-outline" size={80} color="white" style={styles.statusIcon} />
          <Text style={styles.heroText}>註冊成功！{'\n'}開始使用喵喵代收吧</Text>
        </View>
        <TouchableOpacity
          style={{ ...MiumiuTheme.actionButton, ...styles.transparentButton }}
          onPress={() => { this.props.navigator.replace({ index: 0, component: WayBills }) }}
        >
          <Text style={{ ...MiumiuTheme.actionButtonText, ...MiumiuTheme.textShadow }}>
            好的！
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginTop: 64,
    alignItems: 'center',
  },
  statusIcon: {
    marginTop: 40,
  },
  roundButtonBackground: {
    borderRadius: 22,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  heroText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginVertical: 30,
    lineHeight: 28,
  },
  transparentButton: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.25)',
  },
}
