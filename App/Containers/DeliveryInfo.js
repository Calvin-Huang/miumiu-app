/**
 * Created by Calvin Huang on 3/8/17.
 */

import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

import Icon from 'react-native-vector-icons/Ionicons';
import { MKTextField } from 'react-native-material-kit';

import { NavigatorComponent, MiumiuThemeNavigatorBackground } from '../Components';
import { MiumiuTheme, NavigatorStyle } from '../Styles';

export default class DeliveryInfo extends NavigatorComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.route.data,
      keyboardVerticalOffset: 0,
    };

    this.layoutOffset = {};
  }

  componentWillMount() {
    this.fetchDeliveryInfo();
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

  fetchDeliveryInfo() {
    setTimeout(() => {
      this.setState({
        data: {
          openFrom: '09：00',
          openTo: '15：00',
          receiver: '官先生2017',
          phoneNumber: '1816324012',
          area: '廣東省珠海市香港區',
          address: '九州大道中2131號格利廣場4期16棟1207房(2017)',
          fullAddress: '廣東省珠海市香港區九州大道中2131號格利廣場4期16棟1207房(2017)收',
          postCode: '999078',
        }
      });
    }, 1000);
  }

  render() {
    const { data } = this.state;

    return (
      <TouchableWithoutFeedback onPress={() => { dismissKeyboard(); }}>
        <View style={MiumiuTheme.container}>
          <MiumiuThemeNavigatorBackground>
            <View style={NavigatorStyle.titleView}>
              <Text style={NavigatorStyle.titleText}>{data.name}收貨地址</Text>
            </View>
          </MiumiuThemeNavigatorBackground>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={this.state.keyboardVerticalOffset}
            style={styles.body}
          >
            <Text style={MiumiuTheme.sectionText}>* 營業時間：{data.openFrom}～{data.openTo}</Text>
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
                  onChangeText={(receiver) => { this.setState({ data: { ...data, receiver } }); }}
                  value={data.receiver}
                />
                <TouchableWithoutFeedback onPress={this.modifyKeyboardVerticalOffset.bind(this, 'receiverField')}>
                  <View style={styles.textInputTouchReceiver} />
                </TouchableWithoutFeedback>
              </View>
              <TouchableOpacity style={styles.copyButton}>
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
                  onChangeText={(phoneNumber) => { this.setState({ data: { ...data, phoneNumber } }); }}
                  value={data.phoneNumber}
                />
                <TouchableWithoutFeedback onPress={this.modifyKeyboardVerticalOffset.bind(this, 'phoneNumberField')}>
                  <View style={styles.textInputTouchReceiver} />
                </TouchableWithoutFeedback>
              </View>
              <TouchableOpacity style={styles.copyButton}>
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
                  value={data.area}
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
                  onChangeText={(address) => { this.setState({ data: { ...data, address } }); }}
                  value={data.address}
                />
                <TouchableWithoutFeedback onPress={this.modifyKeyboardVerticalOffset.bind(this, 'addressField')}>
                  <View style={styles.textInputTouchReceiver} />
                </TouchableWithoutFeedback>
              </View>
              <TouchableOpacity style={styles.copyButton}>
                <Icon name="md-clipboard" color="#0091FF" />
                <Text style={styles.copyButtonText}>複製</Text>
              </TouchableOpacity>
            </View>
            <View
              onLayout={this.measureLayout.bind(this, 'fullAddressField')}
              style={{ ...MiumiuTheme.textFieldGroup, ...styles.inlineFieldGroup }}
            >
              <View style={MiumiuTheme.fixMKTextFieldStyleError}>
                <MKTextField
                  ref="fullAddressField"
                  floatingLabelEnabled={true}
                  multiline={true}
                  textInputStyle={{ height: 50 }}
                  underlineSize={1}
                  highlightColor="#9E9E9E"
                  placeholder="完整地址"
                  placeholderTextColor="#9E9E9E"
                  style={{ backgroundColor: 'white' }}
                  onFocus={this.modifyKeyboardVerticalOffset.bind(this, 'fullAddressField')}
                  onChangeText={(fullAddress) => { this.setState({ data: { ...data, fullAddress } }); }}
                  value={data.fullAddress}
                />
                <TouchableWithoutFeedback onPress={this.modifyKeyboardVerticalOffset.bind(this, 'fullAddressField')}>
                  <View style={styles.textInputTouchReceiver} />
                </TouchableWithoutFeedback>
              </View>
              <TouchableOpacity style={styles.copyButton}>
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
                  onChangeText={(postCode) => { this.setState({ data: { ...data, postCode } }); }}
                  value={data.postCode}
                />
                <TouchableWithoutFeedback onPress={this.modifyKeyboardVerticalOffset.bind(this, 'postCodeField')}>
                  <View style={styles.textInputTouchReceiver} />
                </TouchableWithoutFeedback>
              </View>
              <TouchableOpacity style={styles.copyButton}>
                <Icon name="md-clipboard" color="#0091FF" />
                <Text style={styles.copyButtonText}>複製</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  body: {
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
