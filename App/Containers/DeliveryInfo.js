/**
 * Created by Calvin Huang on 3/8/17.
 */

import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Clipboard,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { MKTextField } from 'react-native-material-kit';

import { NavigatorComponent, MiumiuThemeNavigatorBackground, HUD } from '../Components';
import { MiumiuTheme, NavigatorStyle } from '../Styles';
import { fetchDeliveryInfo } from '../Actions';

class DeliveryInfo extends NavigatorComponent {
  static navLeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity onPress={() => { navigator.pop(); }}>
        <Icon style={NavigatorStyle.navBackButton} name="ios-arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    );
  }

  constructor(props) {
    super(props);

    let initStates =  {
      data: this.props.route.data,
      keyboardVerticalOffset: 0,
    };

    if (props.deliveryInfo) {
      const { deliveryInfo } = props;
      initStates = {
        ...initStates,
        name: deliveryInfo.name,
        address: deliveryInfo.address,
        phone: deliveryInfo.phone,
        zipcode: deliveryInfo.zipcode,
        receiver: deliveryInfo.receiver,
      }
    }

    this.state = initStates;

    this.layoutOffset = {};
  }

  componentWillMount() {
    if (!this.props.deliveryInfo.address) {
      this.props.fetchDeliveryInfo(this.props.route.data.id);
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.deliveryInfo !== props.deliveryInfo) {
      const { name, address, phone, zipcode, receiver } = props.deliveryInfo;
      this.setState({
        name,
        address,
        phone,
        zipcode,
        receiver,
      });
    }
  }

  copyText(fieldName) {
    const copyString = this.props.deliveryInfo[fieldName];
    if (copyString) {
      Clipboard.setString(copyString);

      this.refs.HUD.flash(2);
    }
  }

  measureLayout(refName, event) {
    const { height: screenHeight } = Dimensions.get('window');
    const { y, height } = event.nativeEvent.layout;
    const navigationBarHeight = 64;
    const graceMarginBottom = 20;

    this.layoutOffset[refName] = -(screenHeight - y - height - navigationBarHeight - graceMarginBottom);
  }

  modifyKeyboardVerticalOffset(refName) {
    this.setState({ keyboardVerticalOffset: this.layoutOffset[refName] });

    this.refs[refName].focus();
  }

  render() {
    const { route: { data }, deliveryInfo, isFetching, error } = this.props;
    const { name, area, address, phone, zipcode, receiver } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => { dismissKeyboard(); }}>
        <View style={MiumiuTheme.container}>
          <MiumiuThemeNavigatorBackground>
            <View style={NavigatorStyle.titleView}>
              <Text style={NavigatorStyle.titleText}>{name}收貨地址</Text>
            </View>
          </MiumiuThemeNavigatorBackground>
          { error &&
            <TouchableOpacity
              style={{ ...MiumiuTheme.button, ...MiumiuTheme.buttonPrimary, margin: 10 }}
              onPress={() => { this.props.fetchServiceStore(data.id); }}
            >
              <Text style={MiumiuTheme.buttonText}>↻ 讀取失敗，重試一次</Text>
            </TouchableOpacity>
          }
          { !error &&
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={this.state.keyboardVerticalOffset}
              style={styles.body}
            >
              <View
                onLayout={this.measureLayout.bind(this, 'receiverField')}
                style={{ ...MiumiuTheme.textFieldGroup, ...styles.inlineFieldGroup }}
              >
                <View style={MiumiuTheme.fixMKTextFieldStyleError}>
                  <MKTextField
                    ref="receiverField"
                    floatingLabelEnabled={true}
                    textInputStyle={{ height: 31 }}
                    underlineSize={1}
                    highlightColor="#9E9E9E"
                    placeholder="收貨人"
                    placeholderTextColor="#9E9E9E"
                    style={{ backgroundColor: 'white' }}
                    onChangeText={(receiver) => { this.setState({ receiver }); }}
                    value={receiver}
                  />
                  <TouchableWithoutFeedback onPress={this.modifyKeyboardVerticalOffset.bind(this, 'receiverField')}>
                    <View style={styles.textInputTouchReceiver} />
                  </TouchableWithoutFeedback>
                </View>
                <TouchableOpacity style={styles.copyButton} onPress={this.copyText.bind(this, 'receiver')}>
                  <Icon name="md-clipboard" color="#0091FF" />
                  <Text style={styles.copyButtonText}>複製</Text>
                </TouchableOpacity>
              </View>
              <View
                onLayout={this.measureLayout.bind(this, 'phoneNumberField')}
                style={{ ...MiumiuTheme.textFieldGroup, ...styles.inlineFieldGroup }}
              >
                <View style={MiumiuTheme.fixMKTextFieldStyleError}>
                  <MKTextField
                    ref="phoneNumberField"
                    floatingLabelEnabled={true}
                    textInputStyle={{ height: 31 }}
                    underlineSize={1}
                    highlightColor="#9E9E9E"
                    placeholder="收貨人電話"
                    placeholderTextColor="#9E9E9E"
                    style={{ backgroundColor: 'white' }}
                    onFocus={this.modifyKeyboardVerticalOffset.bind(this, 'phoneNumberField')}
                    onChangeText={(phone) => { this.setState({ phone }); }}
                    value={phone}
                  />
                  <TouchableWithoutFeedback onPress={this.modifyKeyboardVerticalOffset.bind(this, 'phoneNumberField')}>
                    <View style={styles.textInputTouchReceiver} />
                  </TouchableWithoutFeedback>
                </View>
                <TouchableOpacity style={styles.copyButton} onPress={this.copyText.bind(this, 'phone')}>
                  <Icon name="md-clipboard" color="#0091FF" />
                  <Text style={styles.copyButtonText}>複製</Text>
                </TouchableOpacity>
              </View>
              <View
                onLayout={this.measureLayout.bind(this, 'areaField')}
                style={{ ...MiumiuTheme.textFieldGroup, ...styles.inlineFieldGroup }}
              >
                <View style={MiumiuTheme.fixMKTextFieldStyleError}>
                  <MKTextField
                    ref="areaField"
                    floatingLabelEnabled={true}
                    textInputStyle={{ height: 31 }}
                    underlineSize={1}
                    highlightColor="#9E9E9E"
                    placeholder="地區"
                    placeholderTextColor="#9E9E9E"
                    style={{ backgroundColor: 'white' }}
                    onFocus={this.modifyKeyboardVerticalOffset.bind(this, 'areaField')}
                    onChangeText={(area) => { this.setState({ data: { ...data, area } }); }}
                    value={area}
                  />
                  <TouchableWithoutFeedback onPress={this.modifyKeyboardVerticalOffset.bind(this, 'areaField')}>
                    <View style={styles.textInputTouchReceiver} />
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <View
                onLayout={this.measureLayout.bind(this, 'addressField')}
                style={{ ...MiumiuTheme.textFieldGroup, ...styles.inlineFieldGroup }}
              >
                <View style={MiumiuTheme.fixMKTextFieldStyleError}>
                  <MKTextField
                    ref="addressField"
                    floatingLabelEnabled={true}
                    multiline={true}
                    textInputStyle={{ height: 50 }}
                    underlineSize={1}
                    highlightColor="#9E9E9E"
                    placeholder="街道"
                    placeholderTextColor="#9E9E9E"
                    style={{ backgroundColor: 'white' }}
                    onFocus={this.modifyKeyboardVerticalOffset.bind(this, 'addressField')}
                    onChangeText={(address) => { this.setState({ address }); }}
                    value={address}
                  />
                  <TouchableWithoutFeedback onPress={this.modifyKeyboardVerticalOffset.bind(this, 'addressField')}>
                    <View style={styles.textInputTouchReceiver} />
                  </TouchableWithoutFeedback>
                </View>
                <TouchableOpacity style={styles.copyButton} onPress={this.copyText.bind(this, 'address')}>
                  <Icon name="md-clipboard" color="#0091FF" />
                  <Text style={styles.copyButtonText}>複製</Text>
                </TouchableOpacity>
              </View>
              <View
                onLayout={this.measureLayout.bind(this, 'postCodeField')}
                style={{ ...MiumiuTheme.textFieldGroup, ...styles.inlineFieldGroup }}
              >
                <View style={MiumiuTheme.fixMKTextFieldStyleError}>
                  <MKTextField
                    ref="postCodeField"
                    editable={false}
                    floatingLabelEnabled={true}
                    textInputStyle={{ height: 31 }}
                    underlineSize={1}
                    highlightColor="#9E9E9E"
                    placeholder="郵政編號"
                    placeholderTextColor="#9E9E9E"
                    style={{ backgroundColor: 'white' }}
                    onFocus={this.modifyKeyboardVerticalOffset.bind(this, 'postCodeField')}
                    onChangeText={(zipcode) => { this.setState({ zipcode }); }}
                    value={zipcode}
                  />
                  <TouchableWithoutFeedback onPress={this.modifyKeyboardVerticalOffset.bind(this, 'postCodeField')}>
                    <View style={styles.textInputTouchReceiver} />
                  </TouchableWithoutFeedback>
                </View>
                <TouchableOpacity style={styles.copyButton} onPress={this.copyText.bind(this, 'zipcode')}>
                  <Icon name="md-clipboard" color="#0091FF" />
                  <Text style={styles.copyButtonText}>複製</Text>
                </TouchableOpacity>
              </View>
              { isFetching &&
                <View style={MiumiuTheme.paginationView}>
                  <ActivityIndicator />
                </View>
              }
            </KeyboardAvoidingView>
          }
          <HUD ref="HUD" type="success" message="已複製到剪貼簿" />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  body: {
    marginTop: 27,
    flex: 1,
    zIndex: -1,
  },
  inlineFieldGroup: {
    flexDirection: 'row',
  },
  copyButton: {
    paddingLeft: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  copyButtonText: {
    marginLeft: 4,
    color: '#0091FF',
  },
  textInputTouchReceiver: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}

const mapStateToProps = (state, ownProps) => {
  const { deliveryInfo, deliveryInfoList } = state;
  const { data } = ownProps.route;
  const info = deliveryInfoList.data.find((object) => object.id === data.id);
  return {
    ...ownProps,
    isFetching: deliveryInfo.isFetching,
    error: deliveryInfo.error,
    deliveryInfo: info,
  };
};

export default connect(
  mapStateToProps,
  { fetchDeliveryInfo }
)(DeliveryInfo);
