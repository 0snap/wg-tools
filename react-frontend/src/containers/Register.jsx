import React, { Component } from 'react';
import { connect } from 'react-redux'

import RegisterForm from '../components/login/RegisterForm.jsx';
import Constants from '../constants/LoginConstants.jsx';
import AppHeader from '../components/header/AppHeader.jsx';

import './LoginRegister.scss';

import { register, logout } from '../actions/LoginRegisterActionCreators.jsx';


export default class Register extends Component {

	constructor(props) {
		super(props);
	}


	render() {
		const { register, logout, registerError, isLoggedIn } = this.props;

		let error = registerError? 'conflict' : undefined;
		return (
			<div className='register'>
				<AppHeader logoutCallback={logout}/>
				<RegisterForm error={error} registerCallback={register} />
			</div>
		);
	}
}

Register.propTypes = {
	registerError: React.PropTypes.bool.isRequired,
	register: React.PropTypes.func.isRequired,
	logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return { 
		registerError: state.session.registerError
	};
}


export default connect(mapStateToProps, { register, logout } )(Register)