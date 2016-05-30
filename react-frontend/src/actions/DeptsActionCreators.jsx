import Constants from '../constants/ExpenseConstants.jsx';
var apiService = require('../services/ApiService.jsx');


function fetchDeptsSuccess(depts) {
	return { 
		type: Constants.FETCH_DEPTS_SUCCESS, 
		depts: depts
	}
}

function fetchDeptsError(err) {
	return { type: Constants.FETCH_DEPTS_ERROR, error: err }
}

export function fetchDepts(listId) {
	return function(dispatch) {
		if (!listId) {
			return dispatch(fetchDeptsSuccess([]));
		}
		apiService.call(
            'POST', 'meanDepts', {listId: listId}, 
			function(respText) {
				return dispatch(fetchDeptsSuccess(JSON.parse(respText)));
			},
			function(err) {
				return dispatch(fetchDeptsError(err));
			}
		);
	}
}