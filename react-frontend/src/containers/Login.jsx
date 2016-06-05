import React, { Component } from 'react';
import { connect } from 'react-redux'

import LoginForm from '../components/login/LoginForm.jsx';
import Constants from '../constants/LoginConstants.jsx';
import AppHeader from '../components/header/AppHeader.jsx';

import './LoginRegister.scss';

import { login, logout } from '../actions/LoginRegisterActionCreators.jsx';


class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: undefined
		};
	}

	render() {
		const { login, logout, loginError, isLoggedIn } = this.props;

		return (
			<div className='login'>
				<AppHeader logoutCallback={logout}/>
				<LoginForm error={loginError} loginCallback={login}/>
			</div>);
	}
}

Login.propTypes = {
	loginError: React.PropTypes.bool.isRequired,
	login: React.PropTypes.func.isRequired,
	logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return { 
		loginError: state.session.loginError
	};
}


export default connect(mapStateToProps, { login, logout } )(Login)