import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';



export default function configureProdStore(preloadedState) {
	const store = createStore(
		rootReducer, 
		preloadedState, 
		applyMiddleware(thunk, routerMiddleware(browserHistory))
	);

	return store;
}