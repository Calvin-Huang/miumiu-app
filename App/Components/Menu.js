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
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      navigationItems: dataSource.cloneWithRows(props.navigationItems),
    })
  }

  renderRowView(rowData, sectionID, rowID, highlightRow) {
    const { icon, isSelected } = rowData;
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
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { userId } = this.props;
    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor={Color(this.state.coverBackgroundColor).lighten(0.2)}
          onPress={() => { }}
        >
          <View
            style={{ ...styles.userInfo, backgroundColor: this.state.coverBackgroundColor }}
          >
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.avatar}
                onPress={() => { }}
              >
                <Image style={{ flex: 1 }} source={{ uri: 'https://i.imgur.com/WCdnBho.png' }} />
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
  userInfo: {
    height: 172,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',

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
    fontSize: 14,
    marginVertical: 16,
  },
};
