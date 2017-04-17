/**
 * Created by Calvin Huang on 2/22/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

import { connect } from 'react-redux';
import { MKTextField } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from 'color';
import { NavigatorComponent, MiumiuThemeNavigatorBackground, HUD } from '../Components';
import { NavigatorStyle, MiumiuTheme } from '../Styles';
import { addWayBill, refreshWayBills } from '../Actions/wayBillActions';

class AddWayBill extends NavigatorComponent {
  static navLeftButton(route, navigator, index, navState) {
    if (Platform.OS === 'android') {
      return (
        <TouchableOpacity onPress={() => {
          navigator.pop();
        }}>
          <View style={NavigatorStyle.itemButton}>
            <Icon name="md-close" size={24} color="white" />
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  static navRightButton(route, navigator, index, navState) {
    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity onPress={() => {
        dismissKeyboard();
        navigator.pop();
      }}>
          <Text style={NavigatorStyle.itemTextButton}>
            取消
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      shippingNo: '',
      showSuccessHud: true,
    };
  }

  componentWillReceiveProps(props) {
    if (this.props.isRequesting !== props.isRequesting) {
      if (!props.isRequesting) {
        dismissKeyboard();

        if (!props.error) {
          this.refs.HUD.flash(1.5, () => {
            this.props.refreshWayBills();
            this.props.navigator.pop();
          });
        } else {
          Alert.alert(
            '發生了一點問題',
            props.error.message,
          );
        }
      }
    }
  }

  submitButtonClicked() {
    if (!this.props.isRequesting) {
      this.props.addWayBill(this.state.shippingNo);
    }
  }

  render() {
    const { shippingNo } = this.state;
    const submittable = !!shippingNo;
    return (
      <TouchableWithoutFeedback onPress={() => { dismissKeyboard(); }}>
        <View style={MiumiuTheme.container}>
          <MiumiuThemeNavigatorBackground>
            <View style={NavigatorStyle.titleView}>
              <Text style={NavigatorStyle.titleText}>
                新增貨單
              </Text>
            </View>
          </MiumiuThemeNavigatorBackground>
          <View style={styles.body}>
            <View style={MiumiuTheme.textFieldGroup}>
              <MKTextField
                floatingLabelEnabled={true}
                textInputStyle={{ height: 31 }}
                underlineSize={1}
                highlightColor="#D8D8D8"
                placeholder="請輸入單號"
                placeholderTextColor="#9E9E9E"
                style={{ backgroundColor: 'white' }}
                onChangeText={(shippingNo) => { this.setState({ shippingNo }); }}
                value={shippingNo}
              />
            </View>
          </View>

          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <View style={{ backgroundColor: Color(MiumiuTheme.buttonPrimary.backgroundColor).lighten(0.2), }}>
              <TouchableOpacity
                style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.buttonPrimary }}
                onPress={this.submitButtonClicked.bind(this)}
                disabled={!submittable}
              >
                <Text style={{
                  ...MiumiuTheme.actionButtonText,
                  opacity: submittable ? 1 : 0.7,
                }}>送出單號</Text>
                { this.props.isRequesting &&
                  <ActivityIndicator color="white" style={MiumiuTheme.buttonActivityIndicator} />
                }
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>

          <HUD ref="HUD" type="success" message="送出成功" />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  body: {
    flex: 1,
    marginTop: 27,
  },
}

const mapStateToProps = (state, ownProps) => {
  const { wayBill } = state;
  return {
    ...ownProps,
    isRequesting: wayBill.isRequesting,
    error: wayBill.error,
  };
};

export default connect(
  mapStateToProps,
  { addWayBill, refreshWayBills },
)(AddWayBill);
