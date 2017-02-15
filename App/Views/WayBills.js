/**
 * Created by Calvin Huang on 2/3/17.
 */
import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import dismissKeyboard from 'dismissKeyboard';

import WayBill from './WayBill';

const WayBillState = {
  CONFIRMING: 0,
  SHIPPING: 1,
  ARRIVED: 2,
};

const UrgentState = {
  NORMAL: 0,
  REQUESTED: 1,
  APPROVED: 2,
  DECLINED: 3,
};

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

  constructor(props) {
    super(props);

    this.state = {
      showNavButton: true,
      showTitle: true,
      navBarStretchValue: new Animated.Value(104),
      searchBarMarginBottom: new Animated.Value(9),
      cancelButtonMarginRight: new Animated.Value(-45),
      isSearching: false,
    }
  }

  showSearchBar() {
    this.props.rootComponent.setState({ hideNavigator: true });

    Animated.parallel([
      Animated.timing(
        this.state.navBarStretchValue,
        {
          toValue: 64,
          duration: 100,
          easing: Easing.linear,
        }
      ),
      Animated.timing(
        this.state.searchBarMarginBottom,
        {
          toValue: 49,
          duration: 100,
          easing: Easing.linear,
        }
      ),
      Animated.timing(
        this.state.cancelButtonMarginRight,
        {
          toValue: 10,
          duration: 100,
          easing: Easing.linear,
        }
      )
    ]).start();

    this.setState({ isSearching: true });
  }

  hideSearchBar() {
    dismissKeyboard();

    this.props.rootComponent.setState({ hideNavigator: false });
    this.refs.searchBar.setNativeProps({ text: '' });

    Animated.parallel([
      Animated.timing(
        this.state.navBarStretchValue,
        {
          toValue: 104,
          duration: 100,
          easing: Easing.linear,
        }
      ),
      Animated.timing(
        this.state.searchBarMarginBottom,
        {
          toValue: 9,
          duration: 100,
          easing: Easing.linear,
        }
      ),
      Animated.timing(
        this.state.cancelButtonMarginRight,
        {
          toValue: -45,
          duration: 100,
          easing: Easing.linear,
        }
      )
    ]).start();

    this.setState({ isSearching: false });
  }

  searchBarTextChanged(text) {

  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            height: this.state.navBarStretchValue,
            overflow: 'hidden',
          }}
        >
          <LinearGradient
            start={{ x: 0.485544672, y: 1.08471279 }} end={{ x: 0.485544682, y: -0.0498809549 }}
            locations={[0, 0.0802375638, 0.438058036, 1]}
            colors={['#57C9EB', '#55BCE3', '#4E9ACF', '#487ABD']}
            style={styles.navBackground}
          >
            <TouchableWithoutFeedback onPress={() => { this.refs.searchBar.focus(); }}>
              <Animated.View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-end',
                  margin: 9,
                  height: 28,
                  borderRadius: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.16)',
                  overflow: 'hidden',
                  marginBottom: this.state.searchBarMarginBottom,
                }}
              >
                <Icon name="ios-search" size={18} color="rgba(255, 255, 255, 0.65)" style={styles.searchBarIcon} />
                <TextInput
                  ref="searchBar"
                  style={styles.searchBarInput}
                  placeholderTextColor="rgba(255, 255, 255, 0.65)"
                  placeholder="輸入關鍵字查單"
                  onFocus={this.showSearchBar.bind(this)}
                  onChangeText={this.searchBarTextChanged.bind(this)}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
              }}
              onPress={this.hideSearchBar.bind(this)}
            >
              <Animated.Text
                style={{
                  flex: 1,
                  top: 32,
                  textAlign: 'center',
                  marginBottom: this.state.searchBarMarginBottom,
                  marginRight: this.state.cancelButtonMarginRight,
                  fontSize: 17,
                  color: 'white',
                }}
              >
                取消
              </Animated.Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        { !this.state.isSearching &&
          <View
            style={{
                flex: 0,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F5C163',
              }}
          >
            <Text
              style={{
                ...styles.textInLightBackground,
                flex: 0,
                marginLeft: 15,
              }}
            >
              嗨！Michael Guan，你可以先
            </Text>
            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 14,
                paddingLeft: 17,
              }}
              onPress={() => {}}
            >
              <Text
                style={{
                  ...styles.textInLightBackground,
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                  textDecorationColor: 'white',
                  textDecorationStyle: 'solid',
                }}
              >
                試算運費
              </Text>
            </TouchableOpacity>
          </View>
        }

        <TouchableOpacity style={styles.text} onPress={() => {
          this.hideSearchBar();
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

const styles = {
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
  searchBarIcon: {
    marginLeft: 14,
    marginRight: 12,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 14,
    color: 'white',
  },
  textInLightBackground: {
    color: 'white',
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {
      width: 0,
      height: 0.75,
    },
    textShadowRadius: 0.5,
  },
};