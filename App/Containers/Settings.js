/**
 * Created by Calvin Huang on 3/10/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';

import { NavigatorComponent, MiumiuThemeNavigatorBackground } from '../Components';
import { MiumiuTheme, NavigatorStyle } from '../Styles';
import { openSideDrawer, userSignOut } from '../Actions';

class Settings extends NavigatorComponent {
  static navLeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity onPress={() => { store.dispatch(openSideDrawer()); }}>
        <View style={NavigatorStyle.itemButton}>
          <Icon name="md-menu" size={24} color="white" />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={MiumiuTheme.container}>
        <MiumiuThemeNavigatorBackground>
          <View style={NavigatorStyle.titleView}>
            <Text style={NavigatorStyle.titleText}>
              設定
            </Text>
          </View>
        </MiumiuThemeNavigatorBackground>
        <View style={styles.body}>
          <View style={styles.listViewRow}>
            <Text style={styles.listViewText}>到貨通知推播</Text>
            <Switch value={true} />
          </View>
          <TouchableOpacity style={styles.signOutButton} onPress={() => { this.props.userSignOut(); }}>
            <Text style={MiumiuTheme.buttonText}>登出</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  body: {
    flex: 1,
    marginTop: 27,
  },
  listViewRow: {
    ...MiumiuTheme.listViewRow,
    paddingHorizontal: 17,
  },
  listViewText: {
    ...MiumiuTheme.listViewText,
    marginVertical: 16,
  },
  signOutButton: {
    ...MiumiuTheme.button,
    ...MiumiuTheme.buttonDefault,
    marginVertical: 16,
    marginHorizontal: 17,
  }
};

const mapStateToProps = (state, ownProps) => {
  return ownProps;
}

export default connect(
  mapStateToProps,
  { openSideDrawer, userSignOut }
)(Settings);
