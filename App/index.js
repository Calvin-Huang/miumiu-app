/**
 * Created by Calvin Huang on 2/24/17.
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './configureStore';

const store = configureStore();

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
