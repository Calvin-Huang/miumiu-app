/**
 * Created by calvin.huang on 26/03/2017.
 */

import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

export default class PhotoView extends Component {
  static propTypes = {
    maximumZoomScale: PropTypes.number,
    minimumZoomScale: PropTypes.number,
    showsHorizontalScrollIndicator: PropTypes.bool,
    showsVerticalScrollIndicator: PropTypes.bool,
    onTap: PropTypes.func,
  };

  static defaultProps = {
    /**
     * The maximum allowed zoom scale. The default value is 1.0.
     * @platform ios
     */
    maximumZoomScale: 1.0,
    /**
     * The minimum allowed zoom scale. The default value is 1.0.
     * @platform ios
     */
    minimumZoomScale: 1.0,
    /**
     * When true, shows a horizontal scroll indicator.
     * The default value is true.
     */
    showsHorizontalScrollIndicator: true,
    /**
     * When true, shows a vertical scroll indicator.
     * The default value is true.
     */
    showsVerticalScrollIndicator: true,
    onTap: () => {},
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
        centerContent
        maximumZoomScale={this.props.maximumZoomScale}
        minimumZoomScale={this.props.minimumZoomScale}
        showsHorizontalScrollIndicator={this.props.showsHorizontalScrollIndicator}
        showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
      >
        <TouchableWithoutFeedback
          onPress={this.props.onTap}
        >

          <Image {...this.props} />

        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}
