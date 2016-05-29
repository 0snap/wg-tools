import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

import Constants from '../constants/LoginConstants.jsx';
var apiService = require('../services/ApiService.jsx');


function loginSuccess(jsonWebToken) {
	return { type: Constants.LOGIN_SUCCESS, jwt: jsonWebToken }
}

function loginError(err) {
	return { type: Constants.LOGIN_ERROR, error: err }
}

export function login(wgName, password) {
	return function(dispatch) {
		apiService.login(
			{ username: wgName, password: password },
			function(textResp) {
				let jsonWebToken = JSON.parse(textResp);
				cookie.save(Constants.WG_TOOLS_AUTH, jsonWebToken, {'path': '/', 'maxAge': 30*24*3600});
				browserHistory.push('/app');
				location.reload();
				return dispatch(loginSuccess(jsonWebToken));
			},
			function(err) { return dispatch(loginError(err)) }
		);
	}
}

function registerSuccess() {
	return { type: Constants.REGISTER_SUCCESS }
}

function registerError(err) {
	return { type: Constants.REGISTER_ERROR, error: err }
}

export function register(wgName, password) {
	return function(dispatch) {
		apiService.callUnauthed('POST', 'register', { wgName: wgName, password: password },
			function(textResp) {
				browserHistory.push('/login');
				return dispatch(registerSuccess());
			},
			function(err) { return dispatch(registerError(err)) }
		);
	}
}

function logoutSuccess() {
	return { type: Constants.LOGOUT_SUCCESS }
}

export function logout() {
	return function(dispatch) {
		cookie.remove(Constants.WG_TOOLS_AUTH, {'path': '/'});
		browserHistory.push('/login');
		dispatch(logoutSuccess);
	}
}

export function tryLoginByCookie() {
	return function(dispatch) {
		let token = cookie.load(Constants.WG_TOOLS_AUTH);
		if (token) {
			dispatch(loginSuccess(token));
		}
		else {
			rdispatch(loginError());
		}
	}
}