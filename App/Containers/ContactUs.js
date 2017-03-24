/**
 * Created by calvin.huang on 24/03/2017.
 */

import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import { connect } from 'react-redux';

import { NavigatorComponent, MiumiuThemeNavigatorBackground, HUD } from '../Components';
import { NavigatorStyle, MiumiuTheme } from '../Styles';

class ContactUs extends NavigatorComponent {
  render() {
    return (
      <View>

      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ownProps;
};

export default connect(
  mapStateToProps,
  {}
)(ContactUs);
