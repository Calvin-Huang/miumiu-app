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
    this.props.fetchFAQ(this.props.route.data);
  }

  onLinkPress(url) {
    Linking.openURL(url);
  }

  render() {
    const { route: { data }, isFetching, error } = this.props;
    const { title, content } = data;
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
                onPress={() => { this.props.fetchFAQ(data); }}
              >
                <Text style={MiumiuTheme.buttonText}>↻ 讀取失敗，重試一次</Text>
              </TouchableOpacity>
            }
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

const mapStateToProps = (state, ownProps) => {
  const { FAQ } = state;
  if (FAQ.data || FAQ.error) {
    return {
      ...ownProps,
      isFetching: state.FAQ.isFetching,
      route: {
        data: {
          ...state.FAQ.data,
        }
      },
      error: state.FAQ.error,
    };
  } else {
    return ownProps;
  }
};

export default connect(
  mapStateToProps,
  { fetchFAQ }
)(FAQDetail);
