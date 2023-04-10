import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

import Route from './route';
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreAllLogs()
  return (
    <Provider store={store}>
     <Route/>
    </Provider>
  );
}