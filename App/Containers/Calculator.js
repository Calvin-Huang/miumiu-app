/**
 * Created by Calvin Huang on 2/27/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

import Icon from 'react-native-vector-icons/Ionicons';
import { MKTextField } from 'react-native-material-kit';
import Color from 'color';

import { NavigatorComponent, MiumiuThemeNavigatorBackground } from '../Components';
import { MiumiuTheme, NavigatorStyle } from '../Styles';
import { openSideDrawer } from '../Actions';
import store from '../storeInstance';

export default class Calculator extends NavigatorComponent {
  static navLeftButton(route, navigator, index, navState) {
    if (route.index === 0) {
      return (
        <TouchableOpacity onPress={() => {
          dismissKeyboard();
          store.dispatch(openSideDrawer());
        }}>
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

  static title(route, navigator, index, navState) {
    return (
      <Text style={NavigatorStyle.title}>
        運費試算
      </Text>
    )
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

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => { dismissKeyboard(); }}>
        <View style={MiumiuTheme.container}>
          <MiumiuThemeNavigatorBackground />
          <View style={styles.body}>
            <Text style={styles.sectionText}>* 單位為公斤(KG)、公分(CM)</Text>
            <View style={MiumiuTheme.textFieldGroup}>
              <MKTextField
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
              <View style={styles.fixMKTextFieldStyleError}>
                <MKTextField
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
              <View style={styles.fixMKTextFieldStyleError}>
                <MKTextField
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
              <View style={styles.fixMKTextFieldStyleError}>
                <MKTextField
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
            </View>
          </View>

          <KeyboardAvoidingView behavior="padding">
            <View style={{ backgroundColor: Color(MiumiuTheme.buttonPrimary.backgroundColor).lighten(0.2), }}>
              <TouchableOpacity
                style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.buttonPrimary }}
                onPress={() => {
                  dismissKeyboard();
                  this.setState({ showModal: true });
                }}
              >
                <Text style={MiumiuTheme.actionButtonText}>開始試算</Text>
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
                    運費試算金額為 <Text style={styles.highlightHeroText}>$200</Text>
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
  sectionText: {
    marginLeft: 16,
    marginVertical: 15,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  guide: {
    marginTop: 32,
    alignItems: 'center',
  },
  guideLabel: {
    marginVertical: 4,
  },
  inlineFieldGroup: {
    flexDirection: 'row',
    marginHorizontal: -11,
  },
  textField: {
    backgroundColor: 'white',
    marginHorizontal: 11,
  },
  fixMKTextFieldStyleError: {
    flex: 1,
    flexDirection: 'column',
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
