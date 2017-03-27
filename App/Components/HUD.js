/**
 * Created by calvin.huang on 23/03/2017.
 */

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  StyleSheet,
} from 'react-native';

import { BlurView } from 'react-native-blur';
import Icon from 'react-native-vector-icons/Ionicons';

export default class HUD extends Component {
  static propTypes = {
    delay: PropTypes.number,
    visible: PropTypes.bool.isRequired,
    onHidden: PropTypes.func,
    type: PropTypes.oneOf(['success', 'progress']),
    textStyle: PropTypes.object,
    message: PropTypes.string,
  };

  static defaultProps = {
    visible: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
    };
  }

  componentWillReceiveProps(props) {
    if (props.visible) {
      this.flash();

      this.setState({ visible: props.visible });
    }
  }

  flash(delay = this.props.delay, onHidden = this.props.onHidden) {
    if (delay) {
      this.setState({ visible: true });
      setTimeout(() => {
        this.setState({ visible: false });
        if (onHidden) {
          setTimeout(() => {
            onHidden();
          }, 250);
        }
      }, delay * 1000);
    }
  }

  render() {
    const { type } = this.props;
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={this.state.visible}
      >
        <View style={styles.container}>
          <BlurView blurType="dark" style={styles.blurContainer}>
            { type === 'success' &&
              <Icon name="md-checkmark" color="white" size={30} style={{ paddingHorizontal: 6 }} />
            }
            { type === 'progress' &&
              <ActivityIndicator color="white" style={{ paddingTop: 6, paddingBottom: 8, paddingHorizontal: 6 }} />
            }
            { this.props.message &&
              <Text style={this.props.textStyle || styles.defaultTextStyle}>{this.props.message}</Text>
            }
          </BlurView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  blurContainer: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  defaultTextStyle: {
    fontSize: 14,
    color: 'white',
  },
});
