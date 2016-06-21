import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import routes from '../../routes.js';

export default class Root extends Component {

	render() {
		const { store, history } = this.props;
		return (
			<Provider store={store}>
				<Router history={history} routes={routes} />
			</Provider>
		);
	}
}

Root.propTypes = {
	store: React.PropTypes.object.isRequired,
	history: React.PropTypes.object.isRequired
}