/**
 * Created by Calvin Huang on 2/3/17.
 */
import React, { PropTypes } from 'react';
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
import { MKButton } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import dismissKeyboard from 'dismissKeyboard';

import WayBill from './WayBill';
import UrgentProcessing from './UrgentProcessing';
import Calculator from './Calculator';
import { NavigatorComponent, WayBillStateView, IconFasterShipping } from '../Components';
import { MiumiuTheme, NavigatorStyle } from '../Styles';
import { WayBillState } from '../Constants/states';
import { showNavigationBar, hideNavigationBar } from '../Actions/navigationBarActions';
import { openSideDrawer } from '../Actions/sideDrawerActions';
import { showUserQRCode } from '../Actions/userActions';
import { fetchWayBills, refreshWayBills } from '../Actions/wayBillActions';
import store from '../storeInstance';
import IconMiumiuImage from '../../assets/images/icon-miumiu.png';
import CatAndCardboard1Image from '../../assets/images/cat-and-cardboard-1.png';
import CatAndCardboard2Image from '../../assets/images/cat-and-cardboard-2.png';
import CatAndCardboard3Image from '../../assets/images/cat-and-cardboard-3.png';
import CatAndCardboard4Image from '../../assets/images/cat-and-cardboard-4.png';

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

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
  emptyStateView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  emptyStateImageView: {
    width: 300,
    height: 200,
    marginTop: 55,
  },
  androidAddButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.7,
    shadowColor: 'black',
    elevation: 4,
  },
  unreadMark: {
    width: 10,
    height: 10,
    marginLeft: -6,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#4E9ACF',
  },
};

const mapStateToProps = (state, ownProps) => {
  const { wayBills } = state;

  return {
    ...ownProps,
    currentUser: state.user.currentUser,
    wayBills: wayBills.data,
    amount: wayBills.amount,
    currentPage: wayBills.currentPage,
    isRefreshing: wayBills.isRefreshing,
    isFetching: wayBills.isFetching,
    error: wayBills.error,
    isNavigatorShown: state.navigationBar.isShown,
    badges: state.badges,
  };
};

class WayBills extends NavigatorComponent {
  static navLeftButton() {
    return (
      <TouchableOpacity onPress={() => { store.dispatch(openSideDrawer()); }}>
        <View style={NavigatorStyle.itemButton}>
          <Icon name="md-menu" size={24} color="white" />
        </View>
      </TouchableOpacity>
    );
  }

  static navRightButton(route, navigator) {
    return (
      <View style={NavigatorStyle.itemButtonsContainer}>
        { Platform.OS === 'ios' &&
          <TouchableOpacity
            onPress={() => {
              navigator.push({
                index: route.index + 1,
                component: UrgentProcessing,
                transition: Navigator.SceneConfigs.FloatFromBottom,
              });
            }}
          >
            <View style={{ ...NavigatorStyle.itemButton, marginRight: 14, marginLeft: 7 }}>
              <IconFasterShipping size={20} color="white" />
            </View>
          </TouchableOpacity>
        }
        { Platform.OS === 'android' &&
          <TouchableOpacity onPress={() => { store.dispatch(hideNavigationBar()); }}>
            <View style={{ ...NavigatorStyle.itemButton, marginRight: 9, marginLeft: 7 }}>
              <Icon name="md-search" size={24} color="white" />
            </View>
          </TouchableOpacity>
        }
        <TouchableOpacity onPress={() => { store.dispatch(showUserQRCode()); }}>
          <View style={{ ...NavigatorStyle.itemButton, marginLeft: 16, marginRight: 2 }}>
            <FontAwesomeIcon name="qrcode" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  static propTypes = {
    wayBills: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequred,
        title: PropTypes.string.isRequred,
      })).isRequired,
    currentPage: PropTypes.number.isRequired,
  };

  static defaultProps = {
    wayBills: [],
    currentPage: 1,
    isRefreshing: false,
    isFetching: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      navBarStretchValue: new Animated.Value(104),
      searchBarMarginBottom: new Animated.Value(9),
      cancelButtonMarginRight: new Animated.Value(-45),
      isSearching: false,
      wayBills: dataSource.cloneWithRows(props.wayBills),
      emptyStateImage: ((randomNumber) => {
        const images = [
          CatAndCardboard1Image,
          CatAndCardboard2Image,
          CatAndCardboard3Image,
          CatAndCardboard4Image,
        ];
        return images[randomNumber];
      })(Math.floor(Math.random() * 4)),
    };

    this.showSearchBar = this.showSearchBar.bind(this);
    this.hideSearchBar = this.hideSearchBar.bind(this);
    this.renderRowView = this.renderRowView.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onPaginating = this.onPaginating.bind(this);
    this.refreshWayBills = props.refreshWayBills.bind(this);
  }

  componentDidMount() {
    const { wayBills } = this.props;

    if (wayBills.length <= 0) {
      this.props.fetchWayBills(this.props.currentPage);
    }
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
        wayBills: dataSource.cloneWithRows(props.wayBills),
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

    this.searchingTerm = null;
    this.filterSearchResult(null);
  }

  searchBarTextChanged(text) {
    this.searchingTerm = text;

    this.filterSearchResult(this.searchingTerm);
  }

  filterSearchResult(term) {
    const { isSearching } = this.state;
    const { wayBills } = this.props;
    if (!term) {
      this.setState({
        wayBills: dataSource.cloneWithRows(wayBills),
      });
    } else if (isSearching) {
      this.setState({
        wayBills: dataSource.cloneWithRows(wayBills.filter(({ shippingNo }) => shippingNo.includes(term))),
      });
    }
  }

  onPaginating() {
    if (this.props.isFetching) {
      this.props.fetchWayBills(this.props.currentPage + 1);
    }
  }

  renderRowView(rowData) {
    const { badges } = this.props;

    return (
      <TouchableOpacity
        style={styles.row} onPress={() => {
          if (Platform.OS === 'ios') {
            this.hideSearchBar();
          } else {
            this.props.showNavigationBar();
          }
          this.pushToNextComponent(WayBill, rowData);
        }}
      >
        <WayBillStateView style={styles.wayBillState} state={rowData.status} />
        <Text style={{ ...MiumiuTheme.listViewText, opacity: rowData.status === WayBillState.CONFIRMING ? 0.6 : 1 }}>
          { rowData.shippingNo }
        </Text>
        { rowData.isUrgent &&
        <IconFasterShipping style={{ marginRight: 14 }} />
        }
        { badges.includes(`shipping:${rowData.shippingNo}`) &&
          <View style={styles.unreadMark} />
        }
        <Icon style={MiumiuTheme.listViewForwardIndicator} name="ios-arrow-forward" size={22} color="#D8D8D8" />
      </TouchableOpacity>
    );
  }

  renderSeparator(sectionID, rowID) {
    const rowData = this.props.wayBills;

    if (rowData.length - 1 === rowID) {
      return null;
    }

    return (
      <View key={`#seperator-${sectionID}-${rowID}`} style={styles.separatorContainer}>
        <View style={styles.separator} />
      </View>
    );
  }

  renderFooter() {
    if (this.props.error) {
      return (
        <TouchableOpacity
          style={{ ...MiumiuTheme.button, ...MiumiuTheme.buttonPrimary, margin: 10 }}
          onPress={() => { this.props.fetchWayBills(this.props.currentPage); }}
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
    } else if (this.props.wayBills.length === 0) {
      return (
        <View style={styles.emptyStateView}>
          <Image
            style={styles.emptyStateImageView}
            resizeMode="center"
            source={this.state.emptyStateImage}
          />
          <Text style={{ ...MiumiuTheme.sectionText, textAlign: 'center' }}>一刻也不想多等，想趕快收到貨嗎？</Text>
          <TouchableOpacity
            style={{ ...MiumiuTheme.button, ...MiumiuTheme.buttonPrimary, width: 300 }}
            onPress={() => {
              this.pushToNextComponent(UrgentProcessing, null, Navigator.SceneConfigs.FloatFromBottom);
            }}
          >
            <Text style={MiumiuTheme.buttonText}>申請加急</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  }

  render() {
    const { currentUser, amount } = this.props;
    const user = currentUser || {};
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
              <View style={NavigatorStyle.brandView}>
                <Image source={IconMiumiuImage} />
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
                    ref={(ref) => { this.searchBar = ref }}
                    style={{ ...MiumiuTheme.buttonText, flex: 1 }}
                    placeholderTextColor="rgba(255, 255, 255, 0.65)"
                    placeholder="輸入關鍵字查單"
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
                  ref={(ref) => { this.searchBar = ref }}
                  style={MiumiuTheme.androidSearchInput}
                  placeholderTextColor="rgba(255, 255, 255, 0.65)"
                  placeholder="輸入關鍵字查單"
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
              {(amount <= 0) ? `嗨！${user.name ? `${user.name}，` : ''}你可以先` : `已到倉費用總額：$${amount}`}
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

        <ListView
          style={styles.wayBills}
          dataSource={this.state.wayBills}
          renderRow={this.renderRowView}
          renderSeparator={this.renderSeparator}
          renderFooter={this.renderFooter}
          onEndReached={this.onPaginating}
          onEndReachedThreshold={60}
          enableEmptySections
          onScroll={() => { dismissKeyboard(); }}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isRefreshing}
              onRefresh={this.refreshWayBills}
            />
          }
        />

        { Platform.OS === 'android' &&
          <MKButton
            style={styles.androidAddButton}
            backgroundColor="#3D73BA"
            shadowRadius={2}
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.7}
            shadowColor="black"
            fab
            onPress={() => {
              this.pushToNextComponent(UrgentProcessing, null, Navigator.SceneConfigs.FloatFromBottom);
            }}
          >
            <IconFasterShipping size={20} color="white" />
          </MKButton>
        }
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  { showNavigationBar, hideNavigationBar, fetchWayBills, refreshWayBills },
)(WayBills);
