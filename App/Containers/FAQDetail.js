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
    const { title } = this.state.data;
    const content = `<p><span style="font-size:16px;">3. 登入或註冊<a href="https://google.com" target="_blank">&lt;我的帳戶&gt;</a>後按<a href="http://p.bee.mo/ad1.php" target="_blank">&lt;收貨地址&gt;</a></span><img src="https://camo.githubusercontent.com/45299927bd5c3724defb7ede1e46dade87b2e78d/687474703a2f2f617564756e6f2e6769746875622e636f6d2f636c6d747261636b722f6d656469612f636c6d747261636b725f30332e6a7067" alt=""></p>`;
    return (
      <View style={MiumiuTheme.container}>
        <MiumiuThemeNavigatorBackground>
          <View style={NavigatorStyle.titleView}>
            <Text style={NavigatorStyle.titleText}>
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
