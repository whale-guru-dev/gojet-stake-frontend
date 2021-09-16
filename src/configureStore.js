import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import reducers from './app/reducers';
// import handleApiServerStatus from './middlewares/tokenExpired';

const createHistory = require('history');

function configureStoreProd(initialState) {
  const history = createHistory.createBrowserHistory();
  const middlewares = [
    // Add other middleware on this line...

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk
  ];

  const store = createStore(
    combineReducers({
      ...reducers,
      // TODO: fix routing issue
      // router: connectRouter(history)
    }),
    initialState,
    compose(
      applyMiddleware(...middlewares)
    ));

  const persistor = persistStore(store);

  return { store, history, persistor };
}

function configureStoreDev(initialState) {
  const history = createHistory.createBrowserHistory();
  const middlewares = [
    // Add other middleware on this line...

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(
    combineReducers({
      ...reducers,
      // TODO: fix routing issue
      // router: connectRouter(history)
    }),
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares)
    ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./app/reducers', () => {
      const nextReducer = require('./app/reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  const persistor = persistStore(store);

  return { store, history, persistor };
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;

