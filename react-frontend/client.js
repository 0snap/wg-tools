import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux'

import routes from './routes.js';
import configureStore from './src/stores/configureStore.js';

import './src/global.scss';

const store = configureStore();

render((
	<Provider store={store}>
		<Router history={browserHistory} routes={routes} />
	</Provider>
), document.getElementById('content'));