/**
 * Created by Calvin Huang on 2/27/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { MKTextField } from 'react-native-material-kit';
import Color from 'color';

import { NavigatorComponent, MiumiuThemeNavigatorBackground } from '../Components';
import { MiumiuTheme, NavigatorStyle } from '../Styles';
import { openSideDrawer } from '../Actions';
import { calculateFee } from '../Actions/calculatorActions';
import store from '../storeInstance';

class Calculator extends NavigatorComponent {
  static navLeftButton(route, navigator, index, navState) {
    if (route.index === 0) {
      return (
        <TouchableOpacity onPress={() => { store.dispatch(openSideDrawer()); }}>
          <View style={NavigatorStyle.itemButton}>
            <Icon name="md-menu" size={24} color="white" />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => {
          dismissKeyboard();
          navigator.pop();
        }}>
          <View style={NavigatorStyle.itemButton}>
            <Icon name="md-close" size={24} color="white" />
          </View>
        </TouchableOpacity>
      );
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      weight: 0,
      width: 0,
      height: 0,
      length: 0,
      showModal: false,
    };
  }

  componentWillReceiveProps(props) {
    if (this.props.isRequesting !== props.isRequesting) {
      if (!props.isRequesting) {
        dismissKeyboard();

        if (!props.error) {
          this.setState({ showModal: true });
        } else {
          Alert.alert(
            '發生了一點問題',
            props.error.message,
          );
        }
      }
    }
  }

  calculateButtonClicked() {
    const { width, height, length, weight } = this.state;
    this.props.calculateFee(width, height, length, weight);
  }

  render() {
    const { fee, isRequesting } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => { dismissKeyboard(); }}>
        <View style={MiumiuTheme.container}>
          <MiumiuThemeNavigatorBackground>
            <View style={NavigatorStyle.titleView}>
              <Text style={NavigatorStyle.titleText}>
                運費試算
              </Text>
            </View>
          </MiumiuThemeNavigatorBackground>
          <View style={styles.body}>
            <Text style={MiumiuTheme.sectionText}>* 單位為公斤(KG)、公分(CM)</Text>
            <View style={MiumiuTheme.textFieldGroup}>
              <MKTextField
                keyboardType="numeric"
                floatingLabelEnabled={true}
                textInputStyle={{ height: 31 }}
                underlineSize={1}
                highlightColor="#D8D8D8"
                placeholder="重量"
                placeholderTextColor="#9E9E9E"
                style={{ backgroundColor: 'white' }}
                onChangeText={(text) => { this.setState({ weight: text }); }}
                value={this.state.text}
              />
            </View>
            <View style={{ ...MiumiuTheme.textFieldGroup, ...styles.inlineFieldGroup }}>
              <View style={MiumiuTheme.fixMKTextFieldStyleError}>
                <MKTextField
                  keyboardType="numeric"
                  floatingLabelEnabled={true}
                  textInputStyle={{ height: 31 }}
                  underlineSize={1}
                  highlightColor="#D8D8D8"
                  placeholder="長"
                  placeholderTextColor="#9E9E9E"
                  style={styles.textField}
                  onChangeText={(text) => { this.setState({ length: text }); }}
                  value={this.state.text}
                />
              </View>
              <View style={MiumiuTheme.fixMKTextFieldStyleError}>
                <MKTextField
                  keyboardType="numeric"
                  floatingLabelEnabled={true}
                  textInputStyle={{ height: 31 }}
                  underlineSize={1}
                  highlightColor="#D8D8D8"
                  placeholder="寬"
                  placeholderTextColor="#9E9E9E"
                  style={styles.textField}
                  onChangeText={(text) => { this.setState({ width: text }); }}
                  value={this.state.text}
                />
              </View>
              <View style={MiumiuTheme.fixMKTextFieldStyleError}>
                <MKTextField
                  keyboardType="numeric"
                  floatingLabelEnabled={true}
                  textInputStyle={{ height: 31 }}
                  underlineSize={1}
                  highlightColor="#D8D8D8"
                  placeholder="高"
                  placeholderTextColor="#9E9E9E"
                  style={styles.textField}
                  onChangeText={(text) => { this.setState({ height: text }); }}
                  value={this.state.text}
                />
              </View>
            </View>
            <View style={styles.guide}>
              <Image source={require('../../assets/images/cardboards.png')} />
              <Text style={{ ...MiumiuTheme.contextText, ...styles.guideLabel }}>貨品測量參考基準</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text style={{ ...MiumiuTheme.contextText, ...styles.guideLinkLabel }}>您還可以參考完整的運費寄量表</Text>
              </TouchableOpacity>
            </View>
          </View>

          <KeyboardAvoidingView behavior="padding">
            <View style={{ backgroundColor: Color(MiumiuTheme.buttonPrimary.backgroundColor).lighten(0.2), }}>
              <TouchableOpacity
                style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.buttonPrimary }}
                onPress={this.calculateButtonClicked.bind(this)}
              >
                <Text style={MiumiuTheme.actionButtonText}>開始試算</Text>
                { isRequesting &&
                  <ActivityIndicator color="white" style={MiumiuTheme.buttonActivityIndicator} />
                }
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.showModal}
          >
            <TouchableOpacity
              style={MiumiuTheme.modalContainer}
              onPress={() => { this.setState({ showModal: false }) }}
            >
              <TouchableWithoutFeedback>
                <View style={MiumiuTheme.modalBody}>
                  <Text style={styles.heroText}>
                    運費試算金額為 <Text style={styles.highlightHeroText}>${fee}</Text>
                  </Text>
                  <View
                    style={{
                    alignSelf: 'stretch',
                     borderRadius: MiumiuTheme.button.borderRadius,
                     backgroundColor: Color(MiumiuTheme.buttonDefault.backgroundColor).lighten(0.2)
                  }}
                  >
                    <TouchableOpacity
                      style={{ ...MiumiuTheme.button, ...MiumiuTheme.buttonDefault }}
                      onPress={() => { this.setState({ showModal: false }) }}
                    >
                      <Text style={MiumiuTheme.buttonText}>
                        關閉
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  body: {
    flex: 1,
  },
  guide: {
    marginTop: 32,
    alignItems: 'center',
  },
  guideLabel: {
    marginVertical: 4,
  },
  guideLinkLabel: {
    fontWeight: 'bold',
    padding: 10,
    textDecorationLine: 'underline',
  },
  inlineFieldGroup: {
    flexDirection: 'row',
    marginHorizontal: -11,
  },
  textField: {
    backgroundColor: 'white',
    marginHorizontal: 11,
  },
  heroText: {
    fontSize: 20,
    color: MiumiuTheme.titleText.color,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 34,
  },
  highlightHeroText: {
    fontWeight: 'bold',
    fontSize: 28,
  },
};

const mapStateToProps = (state, ownProps) => {
  const { generalRequest, calculator } = state;
  return {
    ...ownProps,
    isRequesting: generalRequest.isRequesting,
    error: generalRequest.error,
    fee: calculator.data.fee,
  };
};

export default connect(
  mapStateToProps,
  { calculateFee }
)(Calculator);
