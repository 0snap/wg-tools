import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import routes from '../../routes.js';
import DevTools from './DevTools.jsx';

export default class Root extends Component {

	render() {
		const { store, history } = this.props;
		return (
			<Provider store={store}>
				<div>
					<Router history={history} routes={routes} />
					<DevTools />
				</div>
			</Provider>
		);
	}
}

Root.propTypes = {
	store: React.PropTypes.object.isRequired,
	history: React.PropTypes.object.isRequired
}