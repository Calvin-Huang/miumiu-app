/**
 * Created by Calvin Huang on 2/22/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

import { connect } from 'react-redux';
import { MKTextField } from 'react-native-material-kit';
import Color from 'color';
import { NavigatorComponent, MiumiuThemeNavigatorBackground } from '../Components';
import { NavigatorStyle, MiumiuTheme } from '../Styles';
import { addWayBill } from '../Actions/wayBillActions';

class AddWayBill extends NavigatorComponent {
  static navRightButton(route, navigator, index, navState) {
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
  }

  constructor(props) {
    super(props);

    this.state = {
      shippingNo: '',
    };
  }

  render() {
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
                value={this.state.shippingNo}
              />
            </View>
          </View>

          <KeyboardAvoidingView behavior="padding">
            <View style={{ backgroundColor: Color(MiumiuTheme.buttonPrimary.backgroundColor).lighten(0.2), }}>
              <TouchableOpacity
                style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.buttonPrimary }}
                onPress={() => { console.log(this.state.id); }}
              >
                <Text style={MiumiuTheme.actionButtonText}>送出單號</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
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
  { addWayBill },
)(AddWayBill);
