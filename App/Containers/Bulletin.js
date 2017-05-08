/**
 * Created by calvin.huang on 08/05/2017.
 */

import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import { connect } from 'react-redux';

class Bulletin extends Component {
  render() {
    return (
      <View></View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ownProps;
}

export default connect(
  mapStateToProps,
  {},
)(Bulletin);
