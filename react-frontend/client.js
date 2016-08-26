import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import configureStore from './src/stores/configureStore.js';
import Root from './src/containers/Root.jsx';

import './src/global.scss';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(<Root store={store} history={history}/>, document.getElementById('content'));