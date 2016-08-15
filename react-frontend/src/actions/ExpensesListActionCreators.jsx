import { browserHistory } from 'react-router';

import Constants from '../constants/ExpenseConstants.jsx';
var apiService = require('../services/ApiService.jsx');


function storeListSuccess(storedList) {
	return { 
		type: Constants.ADD_EXPENSES_LIST_SUCCESS, 
		storedList: storedList
	}
}

function storeListError(err) {
	return { type: Constants.ADD_EXPENSES_LIST_ERROR, error: err }
}

export function storeList(name) {
	return function(dispatch) {
		apiService.call(
            'POST', 'createExpensesList', {name: name},
			function(respText) {
				return dispatch(storeListSuccess(JSON.parse(respText)));
			},
			function(err) {
				return dispatch(storeListError(err));
			}
		);
	}
}

function deleteListSuccess(listName) {
	return { 
		type: Constants.DELETE_EXPENSES_LIST_SUCCESS, 
		deletedName: listName
	}
}

function deleteListError(err) {
	return { type: Constants.DELETE_EXPENSES_LIST_ERROR, error: err }
}

export function deleteList(listName) {
	return function(dispatch) {
		apiService.call(
            'DELETE', 'deleteExpensesList', {listName: listName}, 
			function(respText) {
				return dispatch(deleteListSuccess(listName));
			},
			function(err) {
				return dispatch(deleteListError(err));
			}
		);
	}
}

function lockListSuccess(listName) {
	return { 
		type: Constants.LOCK_EXPENSES_LIST_SUCCESS, 
		lockedName: listName
	}
}

function lockListError(err) {
	return { type: Constants.LOCK_EXPENSES_LIST_ERROR, error: err }
}

export function lockList(listName) {
	return function(dispatch) {
		apiService.call(
            'POST', 'lockExpensesList', {listName: listName},
			function(respText) {
				return dispatch(lockListSuccess(listName));
			},
			function(err) {
				return dispatch(lockListError(err));
			}
		);
	}
}


function fetchExpensesListsSuccess(expensesLists) {
	return { 
		type: Constants.FETCH_EXPENSES_LISTS_SUCCESS, 
		expensesLists: expensesLists
	}
}

function fetchExpensesListsError(err) {
	return { type: Constants.FETCH_EXPENSES_LISTS_ERROR, error: err }
}

export function fetchExpensesLists() {
	return function(dispatch) {
		apiService.call(
            'GET', 'expensesLists', undefined,
			function(respText) {
				return dispatch(fetchExpensesListsSuccess(JSON.parse(respText)));
			},
			function(err) {
				return dispatch(fetchExpensesListsError(err));
			}
		);
	}
}


function setDispensesSuccess(dispenseAmount) {
	return { 
		type: Constants.SET_DISPENSES_SUCCESS, 
		dispenseAmount: dispenseAmount
	}
}

function setDispensesError(err) {
	return { type: Constants.SET_DISPENSES_ERROR, error: err }
}

export function setDispenses(listName, dispenseAmount) {
	return function(dispatch) {
		apiService.call(
			'POST', 'setDispenses', {listName: listName, dispenses: dispenseAmount},
			function(respText) {
				return dispatch(setDispensesSuccess(dispenseAmount));
			},
			function(err) {
				return dispatch(setDispensesError(err));
			}
		);
	}
}


export function setActiveList(listName, suppressUrlUpdate) {
	return function (dispatch) {
		if (!suppressUrlUpdate) {
			browserHistory.push('/app/' + listName);
		}
		return dispatch({ type: Constants.ACTIVE_LIST_NAME, listName: listName });
	}
}

