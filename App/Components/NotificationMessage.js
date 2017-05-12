/**
 * Created by calvin.huang on 10/05/2017.
 */

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Animated,
  Platform,
  PanResponder,
} from 'react-native';

import { MiumiuTheme } from '../Styles';

export default class NotificationMessage extends Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
    };

    this.height = 0;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x,
          dy: this.state.pan.y,
        },
      ]),
      onPanResponderRelease: () => {
        Animated
          .spring(this.state.pan, { toValue: { x: 0, y: 0 } })
          .start();
      },
    })
  }

  onLayout({ nativeEvent: { layout: { x, y, width, height } } }) {
    this.height = height;
  }

  render() {
    const { title, content } = this.props;
    const { pan } = this.state;
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={{
          ...pan.getLayout(),
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          paddingTop: Platform.OS === 'ios' ? 26 : 6,
          paddingBottom: 6,
          paddingHorizontal: 10,
          backgroundColor: 'white',
          opacity: 0.9,
        }}
        onLayout={this.onLayout.bind(this)}
      >
        { title &&
          <Text style={MiumiuTheme.titleText}>
            {title}
          </Text>
        }
        <Text style={MiumiuTheme.contentText}>
          {content}
        </Text>
        <View
          style={{
            width: 40,
            height: 10,
            borderRadius: 5,
            marginTop: 10,
            marginBottom: 5,
            backgroundColor: 'gray',
            alignSelf: 'center',
          }} />
      </Animated.View>
    );
  }
}
