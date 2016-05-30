import React, { Component } from 'react';
import { connect } from 'react-redux'

import LoginForm from '../components/login/LoginForm.jsx';
import Constants from '../constants/LoginConstants.jsx';
import AppHeader from '../components/header/AppHeader.jsx';

import './LoginRegister.scss';

import { login } from '../actions/LoginRegisterActionCreators.jsx';


class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: undefined
		};
		this.doLogin = this.doLogin.bind(this);
	}

	doLogin(wgName, password) {
		this.props.dispatch(login(wgName, password))
	}

	render() {
		return (
			<div className='login'>
				<AppHeader isLoggedIn={false} />
				<LoginForm error={this.props.loginError} loginCallback={this.doLogin}/>
			</div>);
	}
}

Login.propTypes = {
	loginError: React.PropTypes.bool.isRequired,
	dispatch: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return { 
		loginError: state.session.loginError
	};
}


export default connect(mapStateToProps)(Login)