import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

import rootReducer from './reducers';
import { history } from './history';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunk,
      // ... other middlewares ...
    ),
  ),
);
