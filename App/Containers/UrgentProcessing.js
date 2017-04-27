/**
 * Created by Calvin Huang on 2/18/17.
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
import Color from 'color';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigatorComponent, MiumiuThemeNavigatorBackground, HUD } from '../Components';
import { MiumiuTheme, NavigatorStyle } from '../Styles';
import { openSideDrawer } from '../Actions/sideDrawerActions';
import store from '../storeInstance';
import { urgentWayBill, refreshWayBills } from '../Actions/wayBillActions';

class UrgentProcessing extends NavigatorComponent {
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
  }

  static navRightButton(route, navigator, index, navState) {
    if (route.index !== 0 && Platform.OS === 'ios') {
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

    const { data } = props.route;
    const { shippingNo } = data || {};

    this.state = {
      data,
      disableShippingNoTextField: !shippingNo,
      shippingNo: shippingNo,
      logistic: '',
    };
  }

  componentWillReceiveProps(props) {

    // Prevent triggering update from other components.
    if (!this.isCurrentRoute) {
      return;
    }

    if (this.props.isRequesting !== props.isRequesting) {
      if (!props.isRequesting) {
        dismissKeyboard();

        if (!props.error) {
          this.refs.HUD.flash(1.5, () => {
            const { navigator, route, refreshWayBills } = this.props;

            if (route.index > 0) {
              refreshWayBills();
              navigator.pop();
            } else {
              this.setState({
                shippingNo: '',
                logistic: '',
              });
            }
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
    const { isRequesting } = this.props;
    const { shippingNo, logistic } = this.state;
    if (!isRequesting) {
      this.props.urgentWayBill(shippingNo, logistic);
    }
  }

  render() {
    const { data, shippingNo, logistic } = this.state;
    const submittable = (shippingNo && logistic);

    return (
      <TouchableWithoutFeedback onPress={() => { dismissKeyboard(); }}>
        <View style={MiumiuTheme.container}>
          <MiumiuThemeNavigatorBackground>
            <View style={NavigatorStyle.titleView}>
              <Text style={NavigatorStyle.titleText}>
                加急服務
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
                editable={this.state.disableShippingNoTextField}
                onChangeText={(shippingNo) => this.setState({ shippingNo })}
                value={shippingNo}
              />
            </View>
            <View style={MiumiuTheme.textFieldGroup}>
              <MKTextField
                floatingLabelEnabled={true}
                textInputStyle={{ height: 31 }}
                underlineSize={1}
                highlightColor="#D8D8D8"
                placeholder="請輸入貨運公司名稱"
                placeholderTextColor="#9E9E9E"
                style={{ backgroundColor: 'white' }}
                onChangeText={(logistic) => this.setState({ logistic })}
                value={logistic}
              />
            </View>

            <View style={styles.instruction}>
              <View style={styles.paragraph}>
                <Text style={MiumiuTheme.titleText}>
                  加急件服務
                </Text>
                <Text style={MiumiuTheme.contentText}>
                  當天下午兩點前簽收，加急服務即日到澳，兩點後簽收會視當天狀況優先處理
                </Text>
              </View>
              <View style={styles.paragraph}>
                <Text style={MiumiuTheme.titleText}>
                  收費
                </Text>
                <Text style={MiumiuTheme.contentText}>
                  50cm或以下+$5，51cm以上+$10，超過200cm請聯絡客服
                </Text>
              </View>
              <View style={styles.paragraph}>
                <Text style={MiumiuTheme.titleText}>
                  注意事項
                </Text>
                <View style={MiumiuTheme.bulletItem}>
                  <Text style={MiumiuTheme.contentText}>・</Text>
                  <View style={MiumiuTheme.bulletContent}>
                    <Text style={MiumiuTheme.contentText}>必須於簽收前申請，如簽收後申請視時間盡量安排</Text>
                  </View>
                </View>
                <View style={MiumiuTheme.bulletItem}>
                  <Text style={MiumiuTheme.contentText}>・</Text>
                  <View style={MiumiuTheme.bulletContent}>
                    <Text style={MiumiuTheme.contentText}>此服務並非保證，如遇貨量較多有可能延遲不成功不收費</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <View style={{ backgroundColor: Color(MiumiuTheme.buttonPrimary.backgroundColor).lighten(0.2), }}>
              <TouchableOpacity
                style={{ ...MiumiuTheme.actionButton, ...MiumiuTheme.buttonPrimary }}
                disabled={!submittable}
                onPress={this.submitButtonClicked.bind(this)}
              >
                <Text style={{
                  ...MiumiuTheme.actionButtonText,
                  opacity: submittable ? 1 : 0.7,
                }}>申請加急</Text>
                { this.props.isRequesting &&
                  <ActivityIndicator color="white" style={MiumiuTheme.buttonActivityIndicator} />
                }
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>

          <HUD ref="HUD" type="success" message="送出成功" />
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
  instruction: {
    marginTop: 34,
    marginHorizontal: 16,
  },
  paragraph: {
    marginBottom: 18,
  },
};

const mapStateToProps = (state, ownProps) => {
  const { generalRequest } = state;
  return {
    ...ownProps,
    isRequesting: generalRequest.isRequesting,
    error: generalRequest.error,
  };
};

export default connect(
  mapStateToProps,
  { urgentWayBill, refreshWayBills }
)(UrgentProcessing);
