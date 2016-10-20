import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import DevTools from '../containers/DevTools.jsx';
import rootReducer from '../reducers';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';


export default function configureDevStore(preloadedState) {
	const loggerMiddleware = createLogger();
	const store = createStore(
		rootReducer, 
		preloadedState, 
		compose(
			applyMiddleware(thunk, loggerMiddleware, routerMiddleware(browserHistory)),
			DevTools.instrument()
		)
	);

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers');
			store.replaceReducer(nextReducer);
		});
	}

	return store;
}
