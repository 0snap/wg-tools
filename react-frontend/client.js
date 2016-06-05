import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import routes from './routes.js';
import configureStore from './src/stores/configureStore.js';

import './src/global.scss';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render((
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>
), document.getElementById('content'));