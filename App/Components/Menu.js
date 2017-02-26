/**
 * Created by Calvin Huang on 2/5/17.
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Color from 'color';

import { MiumiuTheme } from '../Styles';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coverBackgroundColor: '#616161',
    };
  }

  render() {
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
            <TouchableWithoutFeedback>
              <View style={styles.moreInfoButton}>
                <Text style={styles.moreInfoButtonText}>Michael 會員編號 2017</Text>
                <Icon name="md-arrow-dropdown" size={14} color="white" />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableHighlight>
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
};
