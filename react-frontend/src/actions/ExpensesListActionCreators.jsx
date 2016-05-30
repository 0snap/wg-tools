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
				//TODO: setactivelist
			},
			function(err) {
				return dispatch(storeListError(err));
			}
		);
	}
}

function deleteListSuccess(listId) {
	return { 
		type: Constants.DELETE_EXPENSES_LIST_SUCCESS, 
		deletedId: listId
	}
}

function deleteListError(err) {
	return { type: Constants.DELETE_EXPENSES_LIST_ERROR, error: err }
}

export function deleteList(listId) {
	return function(dispatch) {
		apiService.call(
            'DELETE', 'deleteExpensesList', {listId: listId}, 
			function(respText) {
				return dispatch(deleteListSuccess(listId));
				//TODO: setactivelist
			},
			function(err) {
				return dispatch(deleteListError(err));
			}
		);
	}
}

function lockListSuccess(listId) {
	return { 
		type: Constants.LOCK_EXPENSES_LIST_SUCCESS, 
		lockedId: listId
	}
}

function lockListError(err) {
	return { type: Constants.LOCK_EXPENSES_LIST_ERROR, error: err }
}

export function lockList(listId) {
	return function(dispatch) {
		apiService.call(
            'POST', 'lockExpensesList', {listId: listId},
			function(respText) {
				return dispatch(lockListSuccess(listId));
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

export function setDispenses(listId, dispenseAmount) {
	return function(dispatch) {
		apiService.call(
			'POST', 'setDispenses', {listId: listId, dispenses: dispenseAmount},
			function(respText) {
				return dispatch(setDispensesSuccess(dispenseAmount));
			},
			function(err) {
				return dispatch(setDispensesError(err));
			}
		);
	}
}


export function setActiveList(listId) {
	console.log(listId)
	return { type: Constants.ACTIVE_LIST_ID, listId: listId };
}


export function setActiveListByName(listName) {
	return { type: Constants.ACTIVE_LIST_NAME, listName: listName };
}

