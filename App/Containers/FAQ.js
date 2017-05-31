/**
 * Created by Calvin Huang on 3/7/17.
 */

import React from 'react';
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
  Platform,
} from 'react-native';

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import dismissKeyboard from 'dismissKeyboard';

import { NavigatorComponent } from '../Components';
import FAQDetail from './FAQDetail';
import { NavigatorStyle, MiumiuTheme } from '../Styles';
import { showNavigationBar, hideNavigationBar, openSideDrawer, fetchFAQs, refreshFAQs } from '../Actions';
import store from '../storeInstance';

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const styles = {
  listViewRow: {
    ...MiumiuTheme.listViewRow,
    paddingVertical: 16,
    paddingLeft: 17,
  },
};

class FAQ extends NavigatorComponent {
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
      FAQs: dataSource.cloneWithRows(props.FAQs),
    };

    this.showSearchBar = this.showSearchBar.bind(this);
    this.hideSearchBar = this.hideSearchBar.bind(this);
    this.renderRowView = this.renderRowView.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.refreshFAQs = props.refreshFAQs.bind(this);
  }

  componentDidMount() {
    this.props.fetchFAQs();
  }

  componentWillUnmount() {
    this.props.showNavigationBar();
  }

  componentWillReceiveProps(props) {
    this.setState({
      FAQs: dataSource.cloneWithRows(props.FAQs),
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

    if (this.state.isSearching) {
      this.props.fetchFAQs();
    }

    this.setState({ isSearching: false });
  }

  searchBarTextChanged(text) {
    this.props.fetchFAQs(text);
  }

  renderRowView(rowData) {
    return (
      <TouchableOpacity
        style={styles.listViewRow} onPress={() => {
          if (Platform.OS === 'ios') {
            this.hideSearchBar();
          } else {
            this.props.showNavigationBar();
          }
          this.pushToNextComponent(FAQDetail, rowData);
        }}
      >
        <Text style={MiumiuTheme.listViewText}>
          { rowData.title }
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
          onPress={() => { this.props.fetchFAQs(); }}
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
                  注意事項
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
                  <Icon
                    name="ios-search"
                    size={18}
                    color="rgba(255, 255, 255, 0.65)"
                    style={MiumiuTheme.searchBarIcon}
                  />
                  <TextInput
                    ref={(ref) => { this.searchBar = ref; }}
                    style={{ ...MiumiuTheme.buttonText, flex: 1 }}
                    placeholderTextColor="rgba(255, 255, 255, 0.65)"
                    placeholder="查詢問題"
                    onFocus={this.showSearchBar}
                    onChangeText={text => this.searchBarTextChanged(text)}
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
                  placeholder="查詢問題"
                  onChangeText={text => this.searchBarTextChanged(text)}
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
          dataSource={this.state.FAQs}
          renderRow={this.renderRowView}
          renderFooter={this.renderFooter}
          enableEmptySections
          onScroll={() => { dismissKeyboard(); }}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isRefreshing}
              onRefresh={this.refreshFAQs}
            />
          }
        />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { FAQs } = state;
  return {
    ...ownProps,
    isFetching: FAQs.isFetching,
    isRefreshing: FAQs.isRefreshing,
    FAQs: FAQs.data,
    error: FAQs.error,
    isNavigatorShown: state.navigationBar.isShown,
  };
};

export default connect(
  mapStateToProps,
  { showNavigationBar, hideNavigationBar, fetchFAQs, refreshFAQs },
)(FAQ);
