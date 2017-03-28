/**
 * Created by Calvin Huang on 2/24/17.
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './storeInstance';

import Main from './Containers/Main';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
