import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

import Constants from '../constants/LoginConstants.jsx';
var apiService = require('../services/ApiService.jsx');

export function loginInit(wgName) {
	return { type: Constants.LOGIN_INITIATED, wgName }
}

export function loginSuccess(jsonWebToken) {
	return { type: Constants.LOGIN_SUCCESS, jsonWebToken }
}

export function loginError(err) {
	return { type: Constants.LOGIN_ERROR, err }
}

export function login(wgName, password) login(wgName, password) {
	dispatch(loginInit(wgName))
	apiService.login(
		{ username: wgName, password: password },
		function(textResp) { dispatch(loginSuccess(JSON.parse(textResp))) },
		function(err) { dispatch(loginError(err)) }
	);
}


export function register(wgName, password) {
	return { type: Constants.REGISTER, wgName, password }
}

export function logout() {
	return { type: Constants.LOGOUT }
}

export function storeToken(token) {
	return { type: Constants.LOGIN_SUCCESS, token }
}

export function tryLoginByCookie() {
	return { type: Constants.TRY_LOGIN_BY_COOKE }
}

function fetchUser(login) {
  return {
	[CALL_API]: {
	  types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
	  endpoint: `users/${login}`,
	  schema: Schemas.USER
	}
  }
}

export function loadUser(login, requiredFields = []) {
  return (dispatch, getState) => {
	const user = getState().entities.users[login]
	if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
	  return null
	}

	return dispatch(fetchUser(login))
  }
}