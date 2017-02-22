/**
 * Created by Calvin Huang on 2/18/17.
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

import { MKTextField } from 'react-native-material-kit';
import Color from 'color';
import { NavigatorComponent, MiumiuThemeNavigatorBackground } from '../Components';
import { MiumiuTheme, NavigatorStyle } from '../Styles';

export default class UrgentProcessing extends NavigatorComponent {
  static navRightButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity onPress={() => {
        dismissKeyboard();
        navigator.pop();
      }}>
        <Text style={NavigatorStyle.itemButton}>
          取消
        </Text>
      </TouchableOpacity>
    );
  }

  static title(route, navigator, index, navState) {
    return (
      <Text style={NavigatorStyle.title}>
        加急服務
      </Text>
    )
  }

  constructor(props) {
    super(props);

    this.state = {
      data: {
        id: props.route.id,
      },
    };
  }

  render() {
    const { data } = this.state;

    return (
      <TouchableWithoutFeedback onPress={() => { dismissKeyboard(); }}>
        <View style={MiumiuTheme.container}>
          <MiumiuThemeNavigatorBackground />
          <View style={styles.body}>
            { !data &&
              <View style={styles.textFieldGroup}>
                <MKTextField
                  floatingLabelEnabled={true}
                  textInputStyle={{ height: 31 }}
                  underlineSize={1}
                  highlightColor="#D8D8D8"
                  placeholder="請輸入單號"
                  placeholderTextColor="#9E9E9E"
                  style={{ backgroundColor: 'white' }}
                />
              </View>
            }
            <View style={styles.textFieldGroup}>
              <MKTextField
                floatingLabelEnabled={true}
                textInputStyle={{ height: 31 }}
                underlineSize={1}
                highlightColor="#D8D8D8"
                placeholder="請輸入貨運公司名稱"
                placeholderTextColor="#9E9E9E"
                style={{ backgroundColor: 'white' }}
              />
            </View>

            <View style={styles.instruction}>
              <View style={styles.paragraph}>
                <Text style={MiumiuTheme.titleText}>
                  加急件服務
                </Text>
                <Text style={MiumiuTheme.contextText}>
                  當天下午兩點前簽收，加急服務即日到澳，兩點後簽收會是當天狀況優先處理
                </Text>
              </View>
              <View style={styles.paragraph}>
                <Text style={MiumiuTheme.titleText}>
                  收費
                </Text>
                <Text style={MiumiuTheme.contextText}>
                  50cm或以下+$5，51cm以上+$10
                </Text>
              </View>
              <View style={styles.paragraph}>
                <Text style={MiumiuTheme.titleText}>
                  注意事項
                </Text>
                <View style={MiumiuTheme.bulletItem}>
                  <Text style={MiumiuTheme.contextText}>・</Text>
                  <View style={MiumiuTheme.bulletContent}>
                    <Text style={MiumiuTheme.contextText}>必須於簽收前申請，如簽收後申請視時間盡量安排</Text>
                  </View>
                </View>
                <View style={MiumiuTheme.bulletItem}>
                  <Text style={MiumiuTheme.contextText}>・</Text>
                  <View style={MiumiuTheme.bulletContent}>
                    <Text style={MiumiuTheme.contextText}>此服務並非保證，如遇貨量較多有可能延遲不成功不收費</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <KeyboardAvoidingView behavior="padding">
            <View style={{ backgroundColor: Color(MiumiuTheme.buttonPrimary.backgroundColor).lighten(0.2), }}>
              <TouchableOpacity
                style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.buttonPrimary }}
                onPress={() => { console.log(data.id); } }
              >
                <Text style={MiumiuTheme.actionButtonText}>申請加急</Text>
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
    marginTop: 27,
  },
  textFieldGroup: {
    paddingBottom: 14,
    paddingHorizontal: 16,
    backgroundColor: 'white'
  },
  instruction: {
    marginTop: 34,
    marginHorizontal: 16,
  },
  paragraph: {
    marginBottom: 18,
  },
};
