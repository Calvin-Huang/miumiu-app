/**
 * Created by calvin.huang on 26/03/2017.
 */

import React from 'react';
import {
  Dimensions,
  View,
  ScrollView,
  Image,
  Text,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Clipboard,
  Linking,
  Platform,
} from 'react-native';

import { connect } from 'react-redux';

import dismissKeyboard from 'dismissKeyboard';

import Icon from 'react-native-vector-icons/Ionicons';
import { MKTextField } from 'react-native-material-kit';

import { NavigatorComponent, MiumiuThemeNavigatorBackground, HUD, PhotoView } from '../Components';
import { MiumiuTheme, NavigatorStyle } from '../Styles';
import { fetchServiceStore } from '../Actions';

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
  photoViewContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  dismissButton: {
    position: 'absolute',
    top: 29,
    right: 21,
  },
};

class ServiceStore extends NavigatorComponent {
  static navRightButton(route, navigator) {
    if (route.index > 1) {
      return (
        <TouchableOpacity
          onPress={() => {
            dismissKeyboard();
            navigator.pop();
          }}
        >
          <Text style={NavigatorStyle.itemTextButton}>
            關閉
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
  }

  constructor(props) {
    super(props);

    const { serviceStore } = props;
    const store = serviceStore || {};
    if (store.imageUrl) {
      this.resizeImage(store.imageUrl);
    }

    this.state = {
      width: 0,
      height: 0,
      showPhotoView: false,
    };

    this.phoneCall = this.phoneCall.bind(this);
  }

  componentWillMount() {
    const { serviceStore } = this.props;
    const store = serviceStore || {};
    if (!store.imageUrl) {
      this.props.fetchServiceStore(this.props.route.data.id);
    }
  }

  componentWillReceiveProps(props) {
    const { serviceStore } = props;
    const store = serviceStore || {};

    const { serviceStore: oldServiceStore } = this.props;
    const oldStore = oldServiceStore || {};

    if (store.imageUrl && oldStore.imageUrl !== store.imageUrl) {
      this.resizeImage(store.imageUrl);
    }
  }

  copyText(fieldName) {
    const copyString = this.props.serviceStore[fieldName];
    if (copyString) {
      Clipboard.setString(copyString);

      this.HUD.flash(2);
    }
  }

  phoneCall() {
    // Do nothing wen user cancel phone call.
    Linking
      .openURL(`${Platform.OS !== 'android' ? 'telprompt' : 'tel'}:${this.props.serviceStore.phone}`)
      .catch(() => {});
  }

  resizeImage(imageSource) {
    const { width: screenWidth } = Dimensions.get('window');
    Image.getSize(imageSource, (imageWidth, imageHeight) => {
      const ratio = imageWidth / screenWidth;
      this.setState({ width: screenWidth, height: imageHeight / ratio });
    });
  }

  render() {
    const { route: { data }, serviceStore, isFetching, error } = this.props;
    const { name, address, phone, openFrom, openTo, imageUrl } = serviceStore || {};
    const { width, height, showPhotoView } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => { dismissKeyboard(); }}>
        <View style={MiumiuTheme.container}>
          <MiumiuThemeNavigatorBackground>
            <View style={NavigatorStyle.titleView}>
              <Text style={NavigatorStyle.titleText}>{name}門市資訊</Text>
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
            <ScrollView>
              <TouchableWithoutFeedback>
                <View>
                  <Text style={MiumiuTheme.sectionText}>* 營業時間：{openFrom}～{openTo}</Text>
                  <View
                    style={{ ...MiumiuTheme.textFieldGroup, ...styles.inlineFieldGroup }}
                  >
                    <View style={MiumiuTheme.fixMKTextFieldStyleError}>
                      <MKTextField
                        floatingLabelEnabled
                        multiline
                        textInputStyle={{ height: 50 }}
                        underlineSize={1}
                        highlightColor="#9E9E9E"
                        placeholder="門市地址"
                        placeholderTextColor="#9E9E9E"
                        style={{ backgroundColor: 'white' }}
                        value={address}
                      />
                      <TouchableWithoutFeedback onPress={() => this.copyText('address')}>
                        <View style={styles.textInputTouchReceiver} />
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                  <View
                    style={{ ...MiumiuTheme.textFieldGroup, ...styles.inlineFieldGroup }}
                  >
                    <View style={MiumiuTheme.fixMKTextFieldStyleError}>
                      <MKTextField
                        floatingLabelEnabled
                        textInputStyle={{ height: 31 }}
                        underlineSize={1}
                        highlightColor="#9E9E9E"
                        placeholder="門市電話"
                        placeholderTextColor="#9E9E9E"
                        style={{ backgroundColor: 'white' }}
                        value={phone}
                      />
                      <TouchableWithoutFeedback onPress={this.phoneCall}>
                        <View style={styles.textInputTouchReceiver} />
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                  { imageUrl &&
                    <TouchableWithoutFeedback onPress={() => this.setState({ showPhotoView: true })}>
                      <Image
                        style={{
                          marginTop: 10,
                          width,
                          height,
                          flex: 1,
                        }}
                        source={{ uri: imageUrl }}
                      />
                    </TouchableWithoutFeedback>
                  }
                  { isFetching &&
                    <View style={MiumiuTheme.paginationView}>
                      <ActivityIndicator />
                    </View>
                  }
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          }
          <HUD ref={(ref) => { this.HUD = ref; }} type="success" message="已複製到剪貼簿" />
          { imageUrl &&
            <Modal
              visible={showPhotoView}
              animationType="fade"
              transparent
              onRequestClose={() => this.setState({ showPhotoView: false })}
            >
              <View style={styles.photoViewContainer}>
                <PhotoView
                  minimumZoomScale={1}
                  maximumZoomScale={3}
                  androidScaleType="center"
                  style={{ width, height: width }}
                  source={{ uri: imageUrl }}
                />
                <TouchableWithoutFeedback onPress={() => this.setState({ showPhotoView: false })}>
                  <Icon name="md-close" size={24} color="white" style={styles.dismissButton} />
                </TouchableWithoutFeedback>
              </View>
            </Modal>
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { serviceStore, serviceStores } = state;
  const { data } = ownProps.route;
  const store = serviceStores.data.find(object => object.id === data.id);
  return {
    ...ownProps,
    isFetching: serviceStore.isFetching,
    error: serviceStore.error,
    serviceStore: store,
  };
};

export default connect(
  mapStateToProps,
  { fetchServiceStore },
)(ServiceStore);
