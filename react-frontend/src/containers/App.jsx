import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppHeader from '../components/header/AppHeader.jsx';

import { logout } from '../actions/LoginRegisterActionCreators.jsx';

import './App.scss';

export class App extends Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		const { children, logout } = this.props;
		return (
			<div className='app'>
				<AppHeader activeList={undefined} logoutCallback={logout} />
				{children}
			</div>
		);
	}
}


App.propTypes = {
	logout: React.PropTypes.func.isRequired,
	children: React.PropTypes.node
}

export default connect(
	() => { return {} }, 
	{ logout }
)(App)