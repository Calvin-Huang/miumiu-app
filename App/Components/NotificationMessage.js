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
  Dimensions,
} from 'react-native';

import { MiumiuTheme } from '../Styles';

export default class NotificationMessage extends Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    delay: PropTypes.number.isRequired,
    animationDuration: PropTypes.number.isRequired,
    visible: PropTypes.bool.isRequired,
    onShown: PropTypes.func,
    onHidden: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    animationDuration: 0.2,
    delay: 2,
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      pan: new Animated.ValueXY(),
    };

    this.needGetHeight = true;
    this.height = 0;
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        const { pan } = this.state;
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dy < 0) {
          return Animated.event([ null, {
            dy: this.state.pan.y,
          }])(event, gestureState);
        }
      },
      onPanResponderRelease: () => {
        const { pan } = this.state;
        pan.flattenOffset();

        if (pan.y._value < -(this.height / 3)) {
          this.hide();
        } else {
          this.show();
        }
      },
    })
  }

  componentWillMount() {
    if (!this.props.visible) {
      const { height: DeviceHeight } = Dimensions.get('window');
      const { pan } = this.state;

      // Hide component to definitely out side of screen.
      pan.setValue({ x: 0, y: -DeviceHeight });

    } else {
      this.needGetHeight = false;
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.visible !== props.visible) {
      if (props.visible) {
        this.flash();
      }
    }
  }

  show(onShown = this.props.onShown) {
    this.setState({ visible: true });

    // First time show without height value will fail to show.
    if (!this.needGetHeight) {
      const { animationDuration } = this.props;
      Animated
        .timing(this.state.pan, { toValue: { x: 0, y: 0 }, duration: animationDuration * 1000 })
        .start(onShown);
    }
  }

  hide(onHidden = this.props.onHidden) {
    const { animationDuration } = this.props;
    Animated
      .timing(this.state.pan, { toValue: { x: 0, y: -this.height }, duration: animationDuration * 1000 })
      .start(() => {
        this.setState({ visible: false });
        if (onHidden) {
          onHidden();
        }
      });
  }

  flash(delay = this.props.delay, onHidden = this.props.onHidden) {
    if (delay) {
      this.show();
      setTimeout(() => {
        this.hide(onHidden);
      }, delay * 1000);
    }
  }

  onLayout({ nativeEvent: { layout: { x, y, width, height } } }) {
    this.height = height;

    if (this.state.visible && this.needGetHeight) {
      const { pan } = this.state;

      // Move component to ready to show position.
      pan.setValue({ x: 0, y: -height });

      this.needGetHeight = false;

      // Show component because first time show without height failed.
      this.show();
    }
  }

  render() {
    const { title, content } = this.props;
    const { pan, visible } = this.state;

    if (visible) {
      return (
        <Animated.View
          {...this.panResponder.panHandlers}
          style={{
            ...pan.getLayout(),
            position: 'absolute',
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
    } else {
      return null;
    }
  }
}
