/**
 * Created by calvin.huang on 26/03/2017.
 */

import React, { Component } from 'react';
import {
  Dimensions,
  View,
  ScrollView,
  Image,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Clipboard,
} from 'react-native';

import { connect } from 'react-redux';

import dismissKeyboard from 'dismissKeyboard';

import Icon from 'react-native-vector-icons/Ionicons';
import { MKTextField } from 'react-native-material-kit';

import { NavigatorComponent, MiumiuThemeNavigatorBackground, HUD } from '../Components';
import { MiumiuTheme, NavigatorStyle } from '../Styles';

class ServiceStore extends NavigatorComponent {
  constructor(props) {
    super(props);

    if (props.data.image) {
      this.resizeImage(props.data.image);
    }

    this.state = {
      width: 0,
      width: 0,
    };
  }

  componentWillReceiveProps(props) {
    if (this.props.data.image !== props.data.image) {
      this.resizeImage(props.data.image);
    }
  }

  copyText(fieldName) {
    const copyString = this.props.data[fieldName];
    if (copyString) {
      Clipboard.setString(this.props.data[fieldName]);

      this.refs.HUD.flash(2);
    }
  }

  resizeImage(imageSource) {
    const { width: screenWidth } = Dimensions.get('window');
    Image.getSize(imageSource, (imageWidth, imageHeight) => {
      const ratio = imageWidth / screenWidth;
      this.setState({ width: screenWidth, height: imageHeight / ratio });
    });
  }

  render() {
    const { data } = this.props;
    const { width, height } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => { dismissKeyboard(); }}>
        <View style={MiumiuTheme.container}>
          <MiumiuThemeNavigatorBackground>
            <View style={NavigatorStyle.titleView}>
              <Text style={NavigatorStyle.titleText}>{data.name}收貨地址</Text>
            </View>
          </MiumiuThemeNavigatorBackground>
          <ScrollView>
            <TouchableWithoutFeedback>
              <View>
                <Text style={MiumiuTheme.sectionText}>* 營業時間：{data.openFrom}～{data.openTo}</Text>
                <View
                  style={{ ...MiumiuTheme.textFieldGroup, ...styles.inlineFieldGroup }}
                >
                  <View style={MiumiuTheme.fixMKTextFieldStyleError}>
                    <MKTextField
                      floatingLabelEnabled={true}
                      multiline={true}
                      textInputStyle={{ height: 50 }}
                      underlineSize={1}
                      highlightColor="#9E9E9E"
                      placeholder="門市地址"
                      placeholderTextColor="#9E9E9E"
                      style={{ backgroundColor: 'white' }}
                      onChangeText={(address) => { this.setState({ data: { ...data, address } }); }}
                      value={data.address}
                    />
                    <TouchableWithoutFeedback onPress={this.copyText.bind(this, 'address')}>
                      <View style={styles.textInputTouchReceiver} />
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                <View
                  style={{ ...MiumiuTheme.textFieldGroup, ...styles.inlineFieldGroup }}
                >
                  <View style={MiumiuTheme.fixMKTextFieldStyleError}>
                    <MKTextField
                      floatingLabelEnabled={true}
                      textInputStyle={{ height: 31 }}
                      underlineSize={1}
                      highlightColor="#9E9E9E"
                      placeholder="門市電話"
                      placeholderTextColor="#9E9E9E"
                      style={{ backgroundColor: 'white' }}
                      onChangeText={(phone) => { this.setState({ data: { ...data, phone } }); }}
                      value={data.phone}
                    />
                    <TouchableWithoutFeedback onPress={this.copyText.bind(this, 'phone')}>
                      <View style={styles.textInputTouchReceiver} />
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                <Image
                  style={{
                    marginTop: 10,
                    width: width,
                    height: height,
                    flex: 1,
                  }}
                  source={{ uri: data.image }}
                />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
          <HUD ref="HUD" type="success" message="已複製到剪貼簿" />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  body: {
    flex: 1,
  },
  inlineFieldGroup: {
    flexDirection: 'row',
  },
  textInputTouchReceiver: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

const mapStateToProps = (state, ownProps) => {
  const data = {
    name: '園子店',
    openFrom: '09:00',
    openTo: '18:00',
    receiver: '官承翰',
    address: '九州大道中2131號格利廣場4期16棟1207房(2017)',
    phone: '0988008752',
    image: 'https://beta.miumiumacau.com/image/a48cddc0ca27bbc265fa6a24dafc62c4',
  };
  return {
    ...ownProps,
    data,
  };
};

export default connect(
  mapStateToProps,
  {}
)(ServiceStore);
