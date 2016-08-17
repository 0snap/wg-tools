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

export function fetchDepts(listName) {
	return function(dispatch) {
		if ( !listName ) {
			return dispatch(fetchDeptsSuccess([]));
		}
		apiService.call(
            'POST', 'meanDepts', {listName: listName}, 
			function(respText) {
				return dispatch(fetchDeptsSuccess(JSON.parse(respText)));
			},
			function(err) {
				return dispatch(fetchDeptsError(err));
			}
		);
	}
}