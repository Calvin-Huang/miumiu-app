/**
 * Created by Calvin Huang on 3/9/17.
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import HtmlRender from 'react-native-html-render';

import { NavigatorComponent, MiumiuThemeNavigatorBackground } from '../Components';
import { MiumiuTheme, NavigatorStyle } from '../Styles';
import { fetchFAQ } from '../Actions/FAQActions';

class FAQDetail extends NavigatorComponent {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { FAQ } = this.props;
    if (!FAQ || !FAQ.content) {
      this.props.fetchFAQ(this.props.route.data.id);
    }
  }

  onLinkPress(url) {
    Linking.openURL(url);
  }

  render() {
    const { route: { data }, FAQ, isFetching, error } = this.props;
    const { title, content } = FAQ || {};

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
            { isFetching &&
              <View style={MiumiuTheme.paginationView}>
                <ActivityIndicator />
              </View>
            }
            { error &&
              <TouchableOpacity
                style={{ ...MiumiuTheme.button, ...MiumiuTheme.buttonPrimary, margin: 10 }}
                onPress={() => { this.props.fetchFAQ(data.id); }}
              >
                <Text style={MiumiuTheme.buttonText}>↻ 讀取失敗，重試一次</Text>
              </TouchableOpacity>
            }
            { !isFetching && !error &&
              <HtmlRender
                value={content}
                onLinkPress={this.onLinkPress.bind(this)}
              />
            }
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

const mapStateToProps = (state, ownProps) => {
  const { FAQ, FAQs } = state;
  const { data } = ownProps.route;
  const faq = FAQs.data.find((object) => object.id === data.id);

  return {
    ...ownProps,
    isFetching: FAQ.isFetching,
    error: FAQ.error,
    FAQ: faq,
  };
};

export default connect(
  mapStateToProps,
  { fetchFAQ }
)(FAQDetail);
