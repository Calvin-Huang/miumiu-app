/**
 * Created by calvin.huang on 26/03/2017.
 */

import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import { connect } from 'react-redux';

import { NavigatorComponent, MiumiuThemeNavigatorBackground } from '../Components';

class ServiceStore extends NavigatorComponent {

}

const mapStateToProps = (state, ownProps) => {

};

export default connect(
  mapStateToProps,
  {}
)(ServiceStore);
