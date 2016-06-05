import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';


import rootReducer from '../reducers';


export default function configureStore(preloadedState) {
	const loggerMiddleware = createLogger();
	const store = createStore(rootReducer, preloadedState, 
		applyMiddleware(thunk, loggerMiddleware, routerMiddleware(browserHistory)));

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers')
			store.replaceReducer(nextReducer)
		});
	}

	return store;
}