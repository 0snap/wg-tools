import Constants from '../constants/ExpenseConstants.jsx';
var apiService = require('../services/ApiService.jsx');


function storeExpenseSuccess(expensePost) {
	return { 
		type: Constants.ADD_EXPENSE_POST_SUCCESS, 
		expensePost: expensePost
	}
}

function storeExpenseError(err) {
	return { type: Constants.ADD_EXPENSE_POST_ERROR, error: err }
}

export function storeExpense(name, amount, comment, listName) {
	return function(dispatch) {
		let payload = {name: name, amount: amount, comment: comment, listName: listName};
		apiService.call(
			'POST', 'storeExpense', payload,
			function(respText) {
				let storedExpenseJson = JSON.parse(respText);
				return dispatch(storeExpenseSuccess(storedExpenseJson));
				// TODO: _this.fetchDepts(listName);
			},
			function(err) {
				return dispatch(storeExpenseError(err));
			}
		);
	}
}

function deleteExpenseSuccess(postId) {
	return { 
		type: Constants.DELETE_EXPENSE_POST_SUCCESS, 
		id: postId,
	}
}

function deleteExpenseError(err) {
	return { type: Constants.DELETE_EXPENSE_POST_ERROR, error: err }
}

export function deleteExpense(postId, listName) {
	return function(dispatch) {
		let payload = { id: postId, listName: listName };
		apiService.call(
            'DELETE', 'deleteExpense', payload,
			function(respText) {
				return dispatch(deleteExpenseSuccess(postId));
				// TODO: _this.fetchDepts(listName);
			},
			function(err) {
				return dispatch(deleteExpenseError(err));
			}
		);
	}
}

function fetchExpensesSuccess(expensePosts) {
	return { 
		type: Constants.FETCH_EXPENSE_POSTS_SUCCESS, 
		expensePosts: expensePosts
	}
}

function fetchExpensesError(err) {
	return { type: Constants.FETCH_EXPENSE_POSTS_ERROR, error: err }
}

export function fetchExpenses(listName) {
	return function(dispatch) {
		if (!listName) {
			return dispatch(fetchExpensesSuccess(undefined));
		}
		apiService.call(
            'POST', 'expensesList', {listName: listName},
			function(respText) {
				return dispatch(fetchExpensesSuccess(JSON.parse(respText)));
			},
			function(err) {
				return dispatch(fetchExpensesError(err));
			}
		);
	}
}