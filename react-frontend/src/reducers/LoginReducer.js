import Constants from '../constants/LoginConstants.jsx';

const initialState = {
	loginError: false,
	registerError: false
}

export default function session(state = initialState, action) {
	switch(action.type) {
		case Constants.LOGIN_SUCCESS:
			return Object.assign({}, state, {
				loginError: false
			});
		case Constants.LOGIN_ERROR:
			return Object.assign({}, state, {
				loginError: true
			})
		case Constants.REGISTER_SUCCESS:
			return Object.assign({}, state, {
				registerError: false
			});
		case Constants.REGISTER_ERROR:
			return Object.assign({}, state, {
				registerError: true
			})
		case Constants.LOGOUT_SUCCESS:
			return initialState
		default:
			return state
	}
}