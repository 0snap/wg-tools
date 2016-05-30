import Constants from '../constants/ExpenseConstants.jsx';

const initialState = {
	depts: [],
	fetchError: false
}

export default function depts(state = initialState, action) {
	switch(action.type) {
		case Constants.FETCH_DEPTS_SUCCESS:
			return Object.assign({}, state, {
				depts: action.depts,
				fetchError: false
			});
		case Constants.FETCH_DEPTS_ERROR:
			return Object.assign({}, state, {
				fetchError: true
			});
		default:
			return state
	}
}