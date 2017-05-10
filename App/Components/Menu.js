/**
 * Created by Calvin Huang on 2/5/17.
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Color from 'color';

import { MiumiuTheme } from '../Styles';

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class Menu extends Component {
  static propTypes = {
    navigationItems: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.shape({
          component: PropTypes.func,
          name: PropTypes.string,
          size: PropTypes.number,
          color: PropTypes.string,
        }).isRequired,
        name: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired,
        isSelected: PropTypes.bool.isRequired,
        badge: PropTypes.shape({
          prefix: PropTypes.string,
          count: PropTypes.number,
        }),
      })
    ).isRequired,
    onItemPress: PropTypes.func.isRequired,
  }

  static defaultPropTypes = {
    navigationItems: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      coverBackgroundColor: '#616161',
      navigationItems: dataSource.cloneWithRows(props.navigationItems),
      userInfo: {
        width: 0,
        height: 0,
      },
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      navigationItems: dataSource.cloneWithRows(props.navigationItems),
    })
  }

  // Calculate size manually because aspectRatio not work.
  onLayout(event) {
    const { nativeEvent: { layout: { x, y, width, height } } } = event;
    this.setState({ userInfo: { width, height: (width * 162 / 304) } });
  }

  renderRowView(rowData, sectionID, rowID, highlightRow) {
    const { icon, isSelected, badge } = rowData;
    const selectedColor = '#4285F4';
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onItemPress(rowData);
        }}
      >
        <View style={styles.navigationItem}>
          <View style={styles.navigationItemIcon}>
            { icon.component ?
              <icon.component name={icon.name} size={icon.size || 20} color={icon.color || (isSelected ? selectedColor : '#757575')} /> :
              <Icon name={icon.name} size={icon.size || 20} color={icon.color || (isSelected ? selectedColor : '#757575')} />
            }

          </View>
          <Text style={{ ...styles.navigationItemText, color: (isSelected ? selectedColor : 'black') }}>{rowData.name}</Text>
          { badge && badge.count > 0 &&
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge.count}</Text>
            </View>
          }
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { userId } = this.props;
    const { userInfo } = this.state;
    return (
      <View
        style={styles.container}
        onLayout={this.onLayout.bind(this)}
      >
        <TouchableHighlight
          underlayColor={Color(this.state.coverBackgroundColor).lighten(0.2)}
          onPress={() => { }}
        >
          <View
            style={{
              width: userInfo.width,
              height: userInfo.height,
              backgroundColor: this.state.coverBackgroundColor,
            }}
          >
            <Image resizeMode="contain" style={styles.catPawsBackground} source={require('../../assets/images/cat-paws.png')} />
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.avatar}
                onPress={() => { }}
              >
                <Image resizeMode="contain" style={{ flex: 1 }} source={require('../../assets/images/cardboard1.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.moreInfoButton}>
              <Text style={styles.moreInfoButtonText}>會員編號 {userId}</Text>
            </View>
          </View>
        </TouchableHighlight>
        <ListView
          style={styles.navigationItems}
          dataSource={this.state.navigationItems}
          renderRow={this.renderRowView.bind(this)}
        >

        </ListView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  // Don't know why aspectRatio not work
  userInfo: {
    aspectRatio: 162 / 304,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#8B8B8B',

    // Status bar: 20, Margin top: 16.
    marginTop: 36,
    marginLeft: 16,
  },
  moreInfoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  moreInfoButtonText: {
    fontSize: 14,
    color: 'white',
    flex: 1,
    backgroundColor: 'transparent',
  },
  navigationItems: {
    marginTop: 7,
  },
  navigationItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigationItemIcon: {
    marginLeft: 16,
    width: 22,
    marginRight: 20,
    alignItems: 'center',
  },
  navigationItemText: {
    flex: 1,
    fontSize: 14,
    marginVertical: 16,
  },
  catPawsBackground: {
    position: 'absolute',
    right: 6,
    bottom: 7,
  },
  badge: {
    marginRight: 20,
    backgroundColor: 'red',
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    textAlign: 'center',
    color: 'white',
  },
};
