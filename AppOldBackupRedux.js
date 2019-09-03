import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './app_old_backup/store';
import Login from './app_old_backup/components/Login';

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Login />
      </Provider>
    );
  }
}