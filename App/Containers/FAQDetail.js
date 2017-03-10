/**
 * Created by Calvin Huang on 3/9/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Linking,
} from 'react-native';

import HtmlRender from 'react-native-html-render';

import { NavigatorComponent, MiumiuThemeNavigatorBackground } from '../Components';
import { MiumiuTheme, NavigatorStyle } from '../Styles';

export default class FAQDetail extends NavigatorComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.route.data,
    };
  }

  onLinkPress(url) {
    Linking.openURL(url);
  }

  render() {
    const { title, content } = this.state.data;
    return (
      <View style={MiumiuTheme.container}>
        <MiumiuThemeNavigatorBackground>
          <View style={NavigatorStyle.titleView}>
            <Text numberOfLines={1} style={{ ...NavigatorStyle.titleText, marginHorizontal: 30 }}>
              {title}
            </Text>
          </View>
        </MiumiuThemeNavigatorBackground>
        <ScrollView>
          <View style={styles.body}>
            <HtmlRender
              value={content}
              onLinkPress={this.onLinkPress.bind(this)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  body: {
    flex: 1,
    marginTop: 27,
    paddingVertical: 13,
    paddingHorizontal: 17,
    backgroundColor: 'white',
  },
}
