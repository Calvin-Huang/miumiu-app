/**
 * Created by calvin.huang on 08/05/2017.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  TextInput,
  Image,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Navigator,
  Animated,
  Easing,
  Platform,
} from 'react-native';

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import dismissKeyboard from 'dismissKeyboard';
import moment from 'moment';
import zh_HK from 'moment/locale/zh-hk';

import Bulletin from './Bulletin';
import { NavigatorComponent } from '../Components';
import { NavigatorStyle, MiumiuTheme } from '../Styles';
import { showNavigationBar, hideNavigationBar, openSideDrawer, fetchBulletinBoard, refreshBulletinBoard } from '../Actions';

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

moment.locale('zh-hk', zh_HK);

class BulletinBoard extends NavigatorComponent {
  static navLeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity onPress={() => { store.dispatch(openSideDrawer()) }}>
        <View style={NavigatorStyle.itemButton}>
          <Icon name="md-menu" size={24} color="white" />
        </View>
      </TouchableOpacity>
    );
  }

  static navRightButton(route, navigator, index, navState) {
    if (Platform.OS === 'android') {
      return (
        <TouchableOpacity onPress={() => { store.dispatch(hideNavigationBar()); }}>
          <View style={NavigatorStyle.itemButton}>
            <Icon name="md-search" size={24} color="white" />
          </View>
        </TouchableOpacity>
      );
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      navBarStretchValue: new Animated.Value(104),
      searchBarMarginBottom: new Animated.Value(9),
      cancelButtonMarginRight: new Animated.Value(-45),
      isSearching: false,
      bulletinBoard: dataSource.cloneWithRows(props.bulletinBoard),
    }
  }

  componentDidMount() {
    this.props.fetchBulletinBoard();
  }

  componentWillUnmount() {
    this.props.showNavigationBar();
  }

  componentWillReceiveProps(props) {
    const { searchingTerm } = this;
    if (searchingTerm) {
      this.filterSearchResult(searchingTerm);
    } else {
      this.setState({
        bulletinBoard: dataSource.cloneWithRows(props.bulletinBoard),
      });
    }

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
    this.filterSearchResult(null);
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
    this.filterSearchResult(null);
  }

  searchBarTextChanged(text) {
    this.filterSearchResult(text);
  }

  filterSearchResult(term) {
    const { isSearching } = this.state;
    const { bulletinBoard } = this.props;
    if (!term) {
      this.setState({
        bulletinBoard: dataSource.cloneWithRows(bulletinBoard),
      });
    } else if (isSearching) {
      this.setState({
        bulletinBoard: dataSource.cloneWithRows(
          bulletinBoard.filter(({ name, address }) => (name || '').includes(term) || (address || '').includes(term))
        ),
      });
    }
  }

  renderRowView(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableOpacity style={styles.listViewRow} onPress={() => {
        if (Platform.OS === 'ios') {
          this.hideSearchBar();
        } else {
          this.props.showNavigationBar();
        }
        this.pushToNextComponent(Bulletin, rowData);
      }}>
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
          onPress={() => { this.props.fetchBulletinBoard(this.props.currentPage); }}
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
          removeClippedSubviews={true}
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
                  placeholder="查詢公告事項"
                  onFocus={this.showSearchBar.bind(this)}
                  onChangeText={this.searchBarTextChanged.bind(this)}
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
                ref="searchBar"
                style={MiumiuTheme.androidSearchInput}
                placeholderTextColor="rgba(255, 255, 255, 0.65)"
                placeholder="查詢公告事項"
                onChangeText={this.searchBarTextChanged.bind(this)}
              />
            </View>
            }
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
          dataSource={this.state.bulletinBoard}
          renderRow={this.renderRowView.bind(this)}
          renderFooter={this.renderFooter.bind(this)}
          enableEmptySections={true}
          onScroll={() => { dismissKeyboard(); }}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isRefreshing}
              onRefresh={this.props.refreshBulletinBoard.bind(this)}
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

const mapStateToProps = (state, ownProps) => {
  const { bulletinBoard } = state;

  return {
    ...ownProps,
    isFetching: bulletinBoard.isFetching,
    isRefreshing: bulletinBoard.isRefreshing,
    bulletinBoard: bulletinBoard.data,
    currentPage: bulletinBoard.currentPage,
    error: bulletinBoard.error,
    isNavigatorShown: state.navigationBar.isShown,
  };
};

export default connect(
  mapStateToProps,
  { showNavigationBar, hideNavigationBar, fetchBulletinBoard, refreshBulletinBoard },
)(BulletinBoard);
