/**
 * @format
 */
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import store from './app/Store';
import { Provider } from 'react-redux';
import React from 'react';

enableScreens();

const WrappedRoot = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => WrappedRoot);
