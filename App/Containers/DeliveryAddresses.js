/**
 * Created by Calvin Huang on 3/7/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import GiftedListView from 'react-native-gifted-listview';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import dismissKeyboard from 'dismissKeyboard';

import { NavigatorComponent } from '../Components';
import { NavigatorStyle, MiumiuTheme } from '../Styles';
import { showNavigationBar, hideNavigationBar, openSideDrawer } from '../Actions';

class DeliveryAddresses extends NavigatorComponent {
  static navLeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity onPress={() => { store.dispatch(openSideDrawer()); }}>
        <View style={NavigatorStyle.itemButton}>
          <Icon name="md-menu" size={24} color="white" />
        </View>
      </TouchableOpacity>
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

  fetchDeliveryAddresses(page = 1, callback, option) {
    setTimeout(() => {
      callback([
        {
          id: '5012381293511238',
          name: '澳門店',
        }, {
          id: '5012381293511239',
          name: '廈門店',
        }
      ], {
        allLoaded: true,
      });
    }, 100);
  }

  renderRowView(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableOpacity style={styles.listViewRow} onPress={() => {
        this.hideSearchBar();
        // this.pushToNextComponent(WayBill, rowData);
      }}>
        <Text style={MiumiuTheme.listViewText}>
          { rowData.name }
        </Text>
        <Icon style={MiumiuTheme.listViewForwardIndicator} name="ios-arrow-forward" size={22} color="#D8D8D8" />
      </TouchableOpacity>
    );
  }

  renderPaginationFetchingView(paginateCallback) {
    return (
      <View style={MiumiuTheme.paginationFetchingView}>
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
                <Text style={NavigatorStyle.titleText}>
                  收貨地址
                </Text>
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
                  placeholder="查詢離你最近的據點"
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

        <GiftedListView
          ref="listView"
          style={styles.wayBills}
          rowView={this.renderRowView.bind(this)}
          onFetch={this.fetchDeliveryAddresses.bind(this)}
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
  listViewRow: {
    ...MiumiuTheme.listViewRow,
    paddingVertical: 16,
    paddingLeft: 17,
  },
};

const mapStateToProps = (state, ownProps) => {
  return ownProps;
};

export default connect(
  mapStateToProps,
  { showNavigationBar, hideNavigationBar }
)(DeliveryAddresses);
