/**
 * Created by calvin.huang on 23/03/2017.
 */

import React, { Component, PropTypes } from 'react';
import {
  View,
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
    type: PropTypes.oneOf(['success']),
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
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={this.state.visible}
      >
        <View style={styles.container}>
          <BlurView blurType="dark" blurAmount={20} style={styles.blurContainer}>
            { this.props.type === 'success' &&
              <Icon name="md-checkmark" color="white" size={30} />
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
    width: 54,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  }
});
