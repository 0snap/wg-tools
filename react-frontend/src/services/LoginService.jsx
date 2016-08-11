import Constants from '../constants/LoginConstants.jsx';


export function getTokenFromBrowser() {
	// TODO: use maxAge / error msg
	const tokenContainer = window.localStorage.getItem(Constants.WG_TOOLS_AUTH);
	if ( !tokenContainer ) {
		return undefined; 
	}
	return JSON.parse(tokenContainer).token;
}


export function isLoggedIn() {
	return getTokenFromBrowser() !== undefined;
}

export function storeTokenToBrowser(token) {
	// have some wrapper with timeout info
	const tokenContainer = JSON.stringify({ 'token': token, 'maxAge': 30*24*3600 });
	window.localStorage.setItem(Constants.WG_TOOLS_AUTH, tokenContainer);
}

export function removeTokenFromBrowser() {
	window.localStorage.removeItem(Constants.WG_TOOLS_AUTH);
}