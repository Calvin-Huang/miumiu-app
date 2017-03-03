/**
 * Created by Calvin Huang on 3/1/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import { userSignIn } from '../Actions/userActions';
import { NavigatorComponent } from '../Components';
import { NavigatorStyle } from '../Styles';

class SignIn extends NavigatorComponent {
  static navLeftButton(route, navigator, index, navState) {
    return (<View />);
  }

  componentWillReceiveProps(props) {
    if (props.currentUser) {
      this.props.navigator.popToTop();
    }
  }

  render() {
    return (
      <LinearGradient
        start={{ x: 0.510023057, y: 1.09617584 }} end={{ x: 0.51374295, y: -0.0557819706 }}
        locations={[0, 0.23, 0.66, 1]}
        colors={['#57C9EB', '#55BCE3', '#4E9ACF', '#487ABD']}
        style={styles.container}
      >
        <View style={NavigatorStyle.titleView}>
          <Image source={require('../../assets/images/icon-miumiu.png')} />
        </View>
      </LinearGradient>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
};

export default connect(
  (state, ownProps) => {
    return {
      ...ownProps,
      currentUser: state.user.currentUser,
    }
  },
  { userSignIn }
)(SignIn);
