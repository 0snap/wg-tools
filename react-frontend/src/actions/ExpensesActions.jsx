import Dispatcher from '../dispatcher/Dispatcher.jsx';
import request from 'superagent';

import Constants from '../constants/ExpenseConstants.jsx';

var apiService = require('../services/ApiService.jsx');
var loginStore = require('../stores/LoginStore.jsx');

let ExpensesActions = {

    storeExpense(name, amount, listId) {
        let _this = this;
        let payload = {name: name, amount: amount, listId: listId};
        apiService.call(
            'storeExpense', 
            payload,
            function(respText) {
                let jsonResponse = JSON.parse(respText);
                Dispatcher.dispatch({
                    actionType: Constants.ADD_EXPENSE_POST,
                    name: jsonResponse.name,
                    amount: jsonResponse.amount,
                    date: jsonResponse.date,
                    color: jsonResponse.color,
                    id: jsonResponse.id, 
                    listId: listId
                });
                _this.fetchDepts(listId);
            },
            function(err) {
                console.log(err);
            }
        );
    },

    deleteExpense(id, listId) {
        let _this = this;
        let payload = { id: id, listId: listId };
        apiService.call(
            'deleteExpense', payload, 
            function(respText) {
                Dispatcher.dispatch({
                    actionType: Constants.DELETE_EXPENSE_POST,
                    id: id, 
                    listId: listId
                });
                _this.fetchDepts(listId);
            },
            function(err) {
                console.log(err);
            }
        );
    },

    fetchExpenses(listId) {
        apiService.call(
            'expensesList', {listId: listId}, 
            function(respText) {
                let jsonResponse = JSON.parse(respText);
                Dispatcher.dispatch({
                    actionType: Constants.FETCH_EXPENSE_POSTS,
                    expenses: jsonResponse
                });
            },
            function(err) {
                console.log(err);
            }
        );
    },

    fetchDepts(listId) {
        apiService.call(
            'meanDepts', {listId: listId}, 
            function(respText) {
                let depts = JSON.parse(respText);
                Dispatcher.dispatch({
                    actionType: Constants.FETCH_DEPTS,
                    depts: depts
                });
            },
            function(err) {
                console.log(err);
            }
        );
    },

    fetchExpensesLists(listName) {
        apiService.call(
            'expensesLists', undefined, 
            function(respText) {
                let jsonResponse = JSON.parse(respText);
                Dispatcher.dispatch({
                    actionType: Constants.FETCH_EXPENSES_LISTS,
                    expensesLists: jsonResponse,
                    listName: listName // hacky "select by name"
                });
            },
            function(err) {
                console.log(err);
            }
        );
    },

    storeList(name) {
        //console.log("post list " + name);
        let _this = this;
        apiService.call(
            'createExpensesList', {name: name}, 
            function(respText) {
                if(respText) {
                    let jsonResponse = JSON.parse(respText);
                    Dispatcher.dispatch({
                        actionType: Constants.ADD_EXPENSES_LIST,
                        name: name,
                        id: jsonResponse
                    });
                    _this.setActiveList(jsonResponse);
                }
            },
            function(err) {
                console.log(err);
            }
        );
    },

    deleteList(id) {
        //console.log("post list " + name);
        apiService.call(
            'deleteExpensesList', {listId: id}, 
            function(respText) {
                Dispatcher.dispatch({
                    actionType: Constants.DELETE_EXPENSES_LIST,
                    id: id
                });
            },
            function(err) {
                console.log(err);
            }
        );
    },

    setActiveList(listId) {
        Dispatcher.dispatch({
            actionType: Constants.ACTIVE_LIST,
            listId: listId
        });
    }

}

module.exports = ExpensesActions;