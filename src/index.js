import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { reducer } from './store/reducer.js';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
