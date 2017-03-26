/**
 * Created by Calvin Huang on 3/7/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  ListView,
  ActivityIndicator,
  RefreshControl,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import dismissKeyboard from 'dismissKeyboard';

import { NavigatorComponent } from '../Components';
import DeliveryInfo from './DeliveryInfo';
import { NavigatorStyle, MiumiuTheme } from '../Styles';
import { showNavigationBar, hideNavigationBar, openSideDrawer, fetchDeliveryInfoList, refreshDeliveryInfoList } from '../Actions';

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class DeliveryInfoList extends NavigatorComponent {
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
      deliveryInfoList: dataSource.cloneWithRows(props.deliveryInfoList),
    }
  }

  componentDidMount() {
    this.props.fetchDeliveryInfoList();
  }

  componentWillReceiveProps(props) {
    this.setState({
      deliveryInfoList: dataSource.cloneWithRows(props.deliveryInfoList),
    });
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

  renderRowView(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableOpacity style={styles.listViewRow} onPress={() => {
        this.hideSearchBar();
        this.pushToNextComponent(DeliveryInfo, rowData);
      }}>
        <Text style={MiumiuTheme.listViewText}>
          { rowData.name }
        </Text>
        <Icon style={MiumiuTheme.listViewForwardIndicator} name="ios-arrow-forward" size={22} color="#D8D8D8" />
      </TouchableOpacity>
    );
  }

  renderFooter() {
    if (this.props.error) {
      return (
        <TouchableOpacity
          style={{ ...MiumiuTheme.button, ...MiumiuTheme.buttonPrimary, margin: 10 }}
          onPress={() => { this.props.fetchDeliveryInfoList(); }}
        >
          <Text style={MiumiuTheme.buttonText}>↻ 讀取失敗，重試一次</Text>
        </TouchableOpacity>
      );

    } else if (this.props.isFetching) {
      return (
        <View style={MiumiuTheme.paginationView}>
          <ActivityIndicator />
        </View>
      );

    }
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

        <ListView
          dataSource={this.state.deliveryInfoList}
          renderRow={this.renderRowView.bind(this)}
          renderFooter={this.renderFooter.bind(this)}
          enableEmptySections={true}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isRefreshing}
              onRefresh={this.props.refreshDeliveryInfoList.bind(this)}
            />
          }
        />
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
  const { deliveryInfoList } = state;
  return {
    ...ownProps,
    isFetching: deliveryInfoList.isFetching,
    isRefreshing: deliveryInfoList.isRefreshing,
    deliveryInfoList: deliveryInfoList.data,
    error: deliveryInfoList.error,
  };
};

export default connect(
  mapStateToProps,
  { showNavigationBar, hideNavigationBar, fetchDeliveryInfoList, refreshDeliveryInfoList }
)(DeliveryInfoList);
