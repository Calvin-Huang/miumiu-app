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
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Navigator,
  Animated,
  Easing,
} from 'react-native';

import { connect } from 'react-redux';
import GiftedListView from 'react-native-gifted-listview';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import dismissKeyboard from 'dismissKeyboard';

import WayBill from './WayBill';
import AddWayBill from './AddWayBill';
import Calculator from './Calculator';
import { NavigatorComponent, WayBillStateView, IconFasterShipping } from '../Components';
import { MiumiuTheme, NavigatorStyle } from '../Styles';
import { WayBillState, UrgentState } from '../Constants/states';
import { showNavigationBar, hideNavigationBar } from '../Actions/navigationBarActions';
import { openSideDrawer } from '../Actions/sideDrawerActions';
import { showUserQRCode } from '../Actions/userActions';
import store from '../storeInstance';

class WayBills extends NavigatorComponent {
  static navLeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity onPress={() => { store.dispatch(openSideDrawer()); }}>
        <View style={NavigatorStyle.itemButton}>
          <Icon name="md-menu" size={24} color="white" />
        </View>
      </TouchableOpacity>
    );
  }

  static navRightButton(route, navigator, index, navState) {
    return (
      <View style={NavigatorStyle.itemButtonsContainer}>
        <TouchableOpacity
          onPress={() => {
            navigator.push({
              index: route.index + 1,
              component: AddWayBill,
              transition: Navigator.SceneConfigs.FloatFromBottom,
            });
          }}
        >
          <View style={{ ...NavigatorStyle.itemButton, marginRight: 9, marginLeft: 7 }}>
            <Icon name="md-add" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { store.dispatch(showUserQRCode()); }}>
          <View style={{ ...NavigatorStyle.itemButton, marginLeft: 16, marginRight: 2 }}>
            <FontAwesomeIcon name="qrcode" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
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
    this.props.hideNavigationBar();

    Animated.parallel([
      Animated.timing(
        this.state.navBarStretchValue,
        {
          toValue: 64,
          duration: 250,
          easing: Easing.linear,
        }
      ),
      Animated.timing(
        this.state.searchBarMarginBottom,
        {
          toValue: 49,
          duration: 250,
          easing: Easing.linear,
        }
      ),
      Animated.timing(
        this.state.cancelButtonMarginRight,
        {
          toValue: 10,
          duration: 250,
          easing: Easing.linear,
        }
      )
    ]).start();

    this.setState({ isSearching: true });
  }

  hideSearchBar() {
    dismissKeyboard();

    this.props.showNavigationBar();
    this.refs.searchBar.setNativeProps({ text: '' });

    Animated.parallel([
      Animated.timing(
        this.state.navBarStretchValue,
        {
          toValue: 104,
          duration: 250,
          easing: Easing.linear,
        }
      ),
      Animated.timing(
        this.state.searchBarMarginBottom,
        {
          toValue: 9,
          duration: 250,
          easing: Easing.linear,
        }
      ),
      Animated.timing(
        this.state.cancelButtonMarginRight,
        {
          toValue: -45,
          duration: 250,
          easing: Easing.linear,
        }
      )
    ]).start();

    this.setState({ isSearching: false });
  }

  searchBarTextChanged(text) {

  }

  fetchWayBills(page = 1, callback, option) {
    setTimeout(() => {
      callback([
        {
          state: WayBillState.CONFIRMING,
          id: '5012381293511238',
          urgent: UrgentState.APPROVED,
        }, {
          state: WayBillState.SHIPPING,
          id: '5012381293511239',
          urgent: UrgentState.NORMAL,
        }, {
          state: WayBillState.ARRIVED,
          id: '5012381293511240',
          urgent: UrgentState.NORMAL,
        }, {
          state: WayBillState.ARRIVED,
          id: '5012381293511241',
          urgent: UrgentState.APPROVED,
        }
      ], {
        allLoaded: true,
      });
    }, 100);
  }

  renderRowView(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableOpacity style={styles.row} onPress={() => {
        this.hideSearchBar();
        this.pushToNextComponent(WayBill, rowData);
      }}>
        <WayBillStateView style={styles.wayBillState} state={rowData.state} />
        <Text style={{ ...MiumiuTheme.listViewText, opacity: rowData.state === WayBillState.CONFIRMING ? 0.6 : 1 }}>
          { rowData.id }
        </Text>
        { (rowData.state === WayBillState.CONFIRMING && rowData.urgent && UrgentState.APPROVED) &&
          <IconFasterShipping style={{ marginRight: 14 }} />
        }
        <Icon style={MiumiuTheme.listViewForwardIndicator} name="ios-arrow-forward" size={22} color="#D8D8D8" />
      </TouchableOpacity>
    );
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    const rowData = this.refs.listView.state.rows;

    if (rowData.length - 1 == rowID) {
      return null;
    }

    return (
      <View key={`#seperator-${sectionID}-${rowID}`} style={styles.separatorContainer}>
        <View style={styles.separator} />
      </View>
    );
  }

  renderPaginationFetchingView(paginateCallback) {
    return (
      <View style={styles.paginationFetchingView}>
        <ActivityIndicator />
      </View>
    );
  }

  renderPaginationAllLoadedView() {
    return null;
  }

  render() {
    return (
      <View style={MiumiuTheme.container}>
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
            style={MiumiuTheme.navBackgroundWithSearchBar}
          >
            { !this.state.isSearching &&
              <View style={NavigatorStyle.titleView}>
                <Image source={require('../../assets/images/icon-miumiu.png')} />
              </View>
            }
            <TouchableWithoutFeedback onPress={() => { this.refs.searchBar.focus(); }}>
              <Animated.View
                style={{
                  ...MiumiuTheme.searchBar,
                  marginBottom: this.state.searchBarMarginBottom,
                }}
              >
                <Icon name="ios-search" size={18} color="rgba(255, 255, 255, 0.65)" style={MiumiuTheme.searchBarIcon} />
                <TextInput
                  ref="searchBar"
                  style={{ ...MiumiuTheme.buttonText, flex: 1 }}
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
                  ...MiumiuTheme.searchBarCancelButton,
                  marginBottom: this.state.searchBarMarginBottom,
                  marginRight: this.state.cancelButtonMarginRight,
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
                ...MiumiuTheme.textShadow,
                ...MiumiuTheme.buttonText,
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
                paddingLeft: 15,
              }}
              onPress={() => { this.pushToNextComponent(Calculator, null, Navigator.SceneConfigs.FloatFromBottom); }}
            >
              <Text
                style={{
                  ...MiumiuTheme.textShadow,
                  ...MiumiuTheme.buttonText,
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

        <GiftedListView
          ref="listView"
          style={styles.wayBills}
          rowView={this.renderRowView.bind(this)}
          renderSeparator={this.renderSeparator.bind(this)}
          onFetch={this.fetchWayBills.bind(this)}
          paginationWaitingView={this.renderPaginationFetchingView.bind(this)}
          paginationAllLoadedView={this.renderPaginationAllLoadedView.bind(this)}
          onEndReached={() => { this.refs.listView._onPaginate(); }}
          customStyles={{
            paginationView: {
              height: 60,
            },
          }}
        >

        </GiftedListView>
      </View>
    );
  }
}

const styles = {
  wayBills: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    height: 57,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  separatorContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  separator: {
    flex: 1,
    marginLeft: 72,
    height: 1,
    backgroundColor: '#EFF0F4',
  },
  wayBillState: {
    marginLeft: 12,
    marginRight: 29,
  },
  paginationView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const mapStateToProps = (state, ownProps) => {
  return ownProps;
};

export default connect(
  mapStateToProps,
  { showNavigationBar, hideNavigationBar }
)(WayBills);
