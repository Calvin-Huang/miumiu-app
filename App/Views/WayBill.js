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

import Icon from 'react-native-vector-icons/Ionicons';

import { NavigatorComponent, MiumiuThemeNavigatorBackground, IconFasterShipping } from '../Components';
import { NavigatorStyle, MiumiuTheme } from '../Styles';
import { stateInfoMapping } from '../Constants/states';

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
    const { icon, iconColor, title } = stateInfoMapping[this.props.route.data.state] || {};

    return (
      <View style={MiumiuTheme.container}>
        <MiumiuThemeNavigatorBackground />
        <View style={styles.body}>
          <View style={styles.sectionHeader}>
            <Icon style={styles.sectionIcon} name={icon} size={24} color={iconColor} />
            <Text style={styles.sectionText}>待確認訂單，您可以申請加急服務</Text>
          </View>
          <View style={styles.infoFieldContainer}>
            <Text style={styles.infoFieldNameText}>
              到貨日
            </Text>
            <Text style={styles.infoFieldValueText}>
              -
            </Text>
          </View>
          <View style={styles.infoFieldContainer}>
            <Text style={styles.infoFieldNameText}>
              到期日
            </Text>
            <Text style={styles.infoFieldValueText}>
              -
            </Text>
          </View>
          <View style={styles.infoFieldContainer}>
            <Text style={styles.infoFieldNameText}>
              金額
            </Text>
            <Text style={{ ...styles.infoFieldValueText, color: '#F6A623' }}>
              -
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.actionButton}>
          <IconFasterShipping style={styles.actionButtonIcon} iconColor="white" tintColor="white" />
          <Text style={styles.actionButtonText}>加急服務</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginLeft: 18,
    marginRight: 10,
    marginTop: 13,
    marginBottom: 9,
  },
  sectionText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  infoFieldContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  infoFieldNameText: {
    fontSize: 16,
    marginVertical: 16,
    marginLeft: 17,
  },
  infoFieldValueText: {
    flex: 1,
    fontSize: 16,
    marginVertical: 16,
    marginRight: 17,
    textAlign: 'right',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4E9ACF',
    paddingVertical: 14,
  },
  actionButtonIcon: {
    marginRight: 10,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
  },
  body: {
    flex: 1,
  },
};