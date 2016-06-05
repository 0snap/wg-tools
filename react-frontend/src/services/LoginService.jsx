import cookie from 'react-cookie';

import Constants from '../constants/LoginConstants.jsx';


export function getTokenFromCookie() {
	return cookie.load(Constants.WG_TOOLS_AUTH);
}


export function isLoggedIn() {
	return getTokenFromCookie() != null;
}

export function storeTokenToCookie(token) {
	cookie.save(Constants.WG_TOOLS_AUTH, token, {'path': '/', 'maxAge': 30*24*3600});
}

export function removeCookie() {
	cookie.remove(Constants.WG_TOOLS_AUTH, {'path': '/'});
}