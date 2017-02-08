/**
 * Created by Calvin Huang on 2/3/17.
 */
import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import LinearGradient from 'react-native-linear-gradient';

import WayBill from './WayBill';

export default class WayBills extends Component {
  static propTypes = {
    rootComponent: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
  }

  static navLeftButton(index, nextState) {
    return (
      <TouchableOpacity underlayColor="rgba(0, 0, 0, 0)" onPress={() => {}}>
        <View style={styles.navBarButton}>
          <Icon name="md-menu" size={24} color="white" />
        </View>
      </TouchableOpacity>
    );
  }

  static navRightButton(index, nextState) {
    return (
      <TouchableOpacity underlayColor="rgba(0, 0, 0, 0)" onPress={() => {}}>
        <View style={styles.navBarButton}>
          <Icon name="md-add" size={24} color="white" />
        </View>
      </TouchableOpacity>
    );
  }

  static title(index, nextState) {
    return (
      <Image source={require('../../assets/images/icon-miumiu.png')} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          start={{ x: 0.485544672, y: 1.08471279 }} end={{ x: 0.485544682, y: -0.0498809549 }}
          locations={[0, 0.0802375638, 0.438058036, 1]}
          colors={['#57C9EB', '#55BCE3', '#4E9ACF', '#487ABD']}
          style={styles.navBackground}
        >
          <TouchableWithoutFeedback onPress={() => { this.props.navigator.hide(); }}>
            <View style={styles.searchBarContainer}>
              <Icon name="ios-search" size={18} color="rgba(255, 255, 255, 0.65)" style={styles.searchBarIcon} />
              <Text style={styles.searchBarText}>
                輸入關鍵字查單
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </LinearGradient>

        <TouchableOpacity style={styles.text} onPress={() => {
          console.log(this.props.navigator.getCurrentRoutes());
          this.props.navigator.push({ index: 1, component: WayBill },)
        }}>
          <Text>
            Hi
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  navBarButton: {
    margin: 9,
    height: 24,
    width: 24,
    flex: 0,
    alignItems: 'center',
  },
  navBackground: {
    flex: 0,
    flexDirection: 'row',
    height: 104,
  },
  text: {
    flex: 1,
    backgroundColor: '#EF00FE',
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: 9,
    height: 28,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    overflow: 'hidden',
  },
  searchBarIcon: {
    marginLeft: 14,
    marginRight: 12,
  },
  searchBarText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.65)',
  }
});