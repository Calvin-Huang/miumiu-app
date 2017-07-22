/**
 * Created by calvin.huang on 08/05/2017.
 */

import React from 'react';
import {
  View,
  Text,
  ListView,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Platform,
} from 'react-native';

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import dismissKeyboard from 'dismissKeyboard';
import moment from 'moment';
import zhHK from 'moment/locale/zh-hk';

import Bulletin from './Bulletin';
import { NavigatorComponent } from '../Components';
import { NavigatorStyle, MiumiuTheme } from '../Styles';
import {
  fetchBadges,
  showNavigationBar,
  hideNavigationBar,
  openSideDrawer,
  fetchBulletinBoard,
  searchBulletinBoard,
  refreshBulletinBoard,
} from '../Actions';
import store from '../storeInstance';

const styles = {
  listViewRow: {
    ...MiumiuTheme.listViewRow,
    paddingTop: 16,
    paddingBottom: 10,
    paddingLeft: 17,
  },
  timeTag: {
    ...MiumiuTheme.contentText,
    marginTop: 2,
    fontSize: 12,
  },
};

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

moment.locale('zh-hk', zhHK);

class BulletinBoard extends NavigatorComponent {
  static navLeftButton() {
    return (
      <TouchableOpacity onPress={() => { store.dispatch(openSideDrawer()); }}>
        <View style={NavigatorStyle.itemButton}>
          <Icon name="md-menu" size={24} color="white" />
        </View>
      </TouchableOpacity>
    );
  }

  static navRightButton() {
    if (Platform.OS === 'android') {
      return (
        <TouchableOpacity onPress={() => { store.dispatch(hideNavigationBar()); }}>
          <View style={NavigatorStyle.itemButton}>
            <Icon name="md-search" size={24} color="white" />
          </View>
        </TouchableOpacity>
      );
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      navBarStretchValue: new Animated.Value(104),
      searchBarMarginBottom: new Animated.Value(9),
      cancelButtonMarginRight: new Animated.Value(-45),
      isSearching: false,
      bulletinBoard: dataSource.cloneWithRows(props.bulletinBoard),
    };

    this.retryFetching = this.retryFetching.bind(this);
    this.showSearchBar = this.showSearchBar.bind(this);
    this.hideSearchBar = this.hideSearchBar.bind(this);
    this.searchBarTextChanged = this.searchBarTextChanged.bind(this);
    this.renderRowView = this.renderRowView.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onPaginating = this.onPaginating.bind(this);
    this.refreshBulletinBoard = props.refreshBulletinBoard.bind(this);
  }

  componentDidMount() {
    this.props.fetchBulletinBoard();
    this.props.fetchBadges();
  }

  componentWillUnmount() {
    this.props.showNavigationBar();
  }

  componentWillReceiveProps(props) {
    this.setState({
      bulletinBoard: dataSource.cloneWithRows(props.bulletinBoard),
    });

    if (Platform.OS === 'android') {
      if (this.props.isNavigatorShown !== props.isNavigatorShown) {
        this.setState({ isSearching: !props.isNavigatorShown });
      }
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
        },
      ),
      Animated.timing(
        this.state.searchBarMarginBottom,
        {
          toValue: 49,
          duration: 250,
          easing: Easing.linear,
        },
      ),
      Animated.timing(
        this.state.cancelButtonMarginRight,
        {
          toValue: 10,
          duration: 250,
          easing: Easing.linear,
        },
      ),
    ]).start();

    this.setState({ isSearching: true });
  }

  hideSearchBar() {
    dismissKeyboard();

    this.props.showNavigationBar();
    this.searchBar.setNativeProps({ text: '' });

    Animated.parallel([
      Animated.timing(
        this.state.navBarStretchValue,
        {
          toValue: 104,
          duration: 250,
          easing: Easing.linear,
        },
      ),
      Animated.timing(
        this.state.searchBarMarginBottom,
        {
          toValue: 9,
          duration: 250,
          easing: Easing.linear,
        },
      ),
      Animated.timing(
        this.state.cancelButtonMarginRight,
        {
          toValue: -45,
          duration: 250,
          easing: Easing.linear,
        },
      ),
    ]).start();

    this.setState({ isSearching: false });

    // Search empty string to reset searching.
    this.props.searchBulletinBoard();
  }

  searchBarTextChanged(text) {
    this.props.searchBulletinBoard(text);
  }

  retryFetching() {
    if (this.state.isSearching) {
      this.props.searchBulletinBoard(this.props.query);
    } else {
      this.props.fetchBulletinBoard(this.props.currentPage);
    }
  }

  onPaginating() {
    if (this.props.isFetching) {
      this.props.fetchBulletinBoard(this.props.currentPage + 1);
    }
  }

  renderRowView(rowData) {
    return (
      <TouchableOpacity
        style={styles.listViewRow} onPress={() => {
          if (this.state.isSearching) {
            if (Platform.OS === 'ios') {
              this.hideSearchBar();
            } else {
              this.props.showNavigationBar();
            }
          }
          this.pushToNextComponent(Bulletin, rowData);
        }}
      >
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={MiumiuTheme.listViewText}>
            { rowData.title }
          </Text>
          <Text style={styles.timeTag}>
            { moment(rowData.createdAt).calendar() }
          </Text>
        </View>
        <Icon style={MiumiuTheme.listViewForwardIndicator} name="ios-arrow-forward" size={22} color="#D8D8D8" />
      </TouchableOpacity>
    );
  }

  renderFooter() {
    if (this.props.error) {
      return (
        <TouchableOpacity
          style={{ ...MiumiuTheme.button, ...MiumiuTheme.buttonPrimary, margin: 10 }}
          onPress={this.retryFetching}
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

    return null;
  }

  render() {
    return (
      <View style={MiumiuTheme.container}>
        <Animated.View
          removeClippedSubviews
          style={{
            height: (Platform.OS === 'android' ? 56 : this.state.navBarStretchValue),
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
                公告事項
              </Text>
            </View>
            }
            { Platform.OS === 'ios' &&
            <TouchableWithoutFeedback onPress={() => { this.searchBar.focus(); }}>
              <Animated.View
                style={{
                  ...MiumiuTheme.searchBar,
                  marginBottom: this.state.searchBarMarginBottom,
                }}
              >
                <Icon name="ios-search" size={18} color="rgba(255, 255, 255, 0.65)" style={MiumiuTheme.searchBarIcon} />
                <TextInput
                  ref={(ref) => { this.searchBar = ref; }}
                  style={{ ...MiumiuTheme.buttonText, flex: 1 }}
                  placeholderTextColor="rgba(255, 255, 255, 0.65)"
                  placeholder="查詢公告事項"
                  onFocus={this.showSearchBar}
                  onChangeText={this.searchBarTextChanged}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
            }
            { Platform.OS === 'android' && this.state.isSearching &&
            <View style={MiumiuTheme.androidSearchBarContainer}>
              <TouchableOpacity onPress={this.props.showNavigationBar}>
                <Icon name="md-arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TextInput
                ref={(ref) => { this.searchBar = ref; }}
                style={MiumiuTheme.androidSearchInput}
                placeholderTextColor="rgba(255, 255, 255, 0.65)"
                placeholder="查詢公告事項"
                onChangeText={this.searchBarTextChanged}
              />
            </View>
            }
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
              }}
              onPress={this.hideSearchBar}
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
          dataSource={this.state.bulletinBoard}
          renderRow={this.renderRowView}
          renderFooter={this.renderFooter}
          onEndReached={this.onPaginating}
          onEndReachedThreshold={60}
          enableEmptySections
          onScroll={() => { dismissKeyboard(); }}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isRefreshing}
              onRefresh={this.refreshBulletinBoard}
            />
          }
        />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { bulletinBoard } = state;

  return {
    ...ownProps,
    isFetching: bulletinBoard.isFetching,
    isRefreshing: bulletinBoard.isRefreshing,
    bulletinBoard: bulletinBoard.data,
    currentPage: bulletinBoard.currentPage,
    query: bulletinBoard.query,
    error: bulletinBoard.error,
    isNavigatorShown: state.navigationBar.isShown,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchBadges,
    showNavigationBar,
    hideNavigationBar,
    fetchBulletinBoard,
    searchBulletinBoard,
    refreshBulletinBoard,
  },
)(BulletinBoard);
