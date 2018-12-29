import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { store } from '../../store';
import { history } from '../../history';

import AppInterface from './AppInterface';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppInterface />
    </ConnectedRouter>
  </Provider>
);

export default App;
