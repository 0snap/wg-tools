import { browserHistory } from 'react-router';

import Constants from '../constants/LoginConstants.jsx';
var apiService = require('../services/ApiService.jsx');

import { storeTokenToBrowser, removeTokenFromBrowser } from '../services/LoginService.jsx';

function loginSuccess(jsonWebToken) {
	return { type: Constants.LOGIN_SUCCESS }
}

function loginError() {
	return { type: Constants.LOGIN_ERROR }
}

export function login(wgName, password) {
	return function(dispatch) {
		apiService.login(
			{ username: wgName, password: password },
			function(textResp) {
				let jsonWebToken = JSON.parse(textResp);
				storeTokenToBrowser(jsonWebToken.access_token);
				browserHistory.push('/home');
				//location.reload();
				return dispatch(loginSuccess());
			},
			function(err) { return dispatch(loginError()) }
		);
	}
}

function registerSuccess() {
	return { type: Constants.REGISTER_SUCCESS }
}

function registerError(err) {
	return { type: Constants.REGISTER_ERROR }
}

export function register(wgName, password) {
	return function(dispatch) {
		apiService.callUnauthed('POST', 'register', { wgName: wgName, password: password },
			function(textResp) {
				browserHistory.push('/login');
				return dispatch(registerSuccess());
			},
			function(err) { return dispatch(registerError()) }
		);
	}
}

function logoutSuccess() {
	return { type: Constants.LOGOUT_SUCCESS }
}

export function logout() {
	return function(dispatch) {
		removeTokenFromBrowser();
		browserHistory.push('/login');
		dispatch(logoutSuccess());
	}
}