import Dispatcher from '../dispatcher/Dispatcher.jsx';
import Constants from '../constants/ExpenseConstants.jsx';

var apiService = require('../services/ApiService.jsx');

let ExpensesActions = {

    storeExpense(name, amount, comment, listId) {
        if (!name || !amount || !listId) {
            return;
        }
        let _this = this;
        let payload = {name: name, amount: amount, comment: comment, listId: listId};
        apiService.call(
            'POST', 'storeExpense', payload,
            function(respText) {
                let jsonResponse = JSON.parse(respText);
                Dispatcher.dispatch({
                    actionType: Constants.ADD_EXPENSE_POST,
                    name: jsonResponse.name,
                    amount: jsonResponse.amount,
                    comment: jsonResponse.comment,
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
        if (!listId || !id) {
            return;
        }
        let _this = this;
        let payload = { id: id, listId: listId };
        apiService.call(
            'DELETE', 'deleteExpense', payload,
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
        if (!listId) {
            Dispatcher.dispatch({
                actionType: Constants.FETCH_EXPENSE_POSTS,
                expenses: undefined
            });
            return;
        }
        apiService.call(
            'POST', 'expensesList', {listId: listId}, 
            function(respText) {
                Dispatcher.dispatch({
                    actionType: Constants.FETCH_EXPENSE_POSTS,
                    expenses: JSON.parse(respText)
                });
            },
            function(err) {
                console.log(err);
            }
        );
    },

    fetchDepts(listId) {
        if (!listId) {
            Dispatcher.dispatch({
                actionType: Constants.FETCH_DEPTS,
                depts: undefined
            });
            return;
        }
        apiService.call(
            'POST', 'meanDepts', {listId: listId}, 
            function(respText) {
                Dispatcher.dispatch({
                    actionType: Constants.FETCH_DEPTS,
                    depts: JSON.parse(respText)
                });
            },
            function(err) {
                console.log(err);
            }
        );
    },

    fetchExpensesLists(listName) {
        apiService.call(
            'GET', 'expensesLists', undefined, 
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
        if (!name) {
            return;
        }
        let _this = this;
        apiService.call(
            'POST', 'createExpensesList', {name: name}, 
            function(respText) {
                if(respText) {
                    let jsonResponse = JSON.parse(respText);
                    Dispatcher.dispatch({
                        actionType: Constants.ADD_EXPENSES_LIST,
                        storedList: jsonResponse
                    });
                    _this.setActiveList(jsonResponse.id);
                }
            },
            function(err) {
                console.log(err);
            }
        );
    },

    deleteList(id) {
        if (!id) {
            return;
        }
        //console.log("post list " + name);
        apiService.call(
            'DELETE', 'deleteExpensesList', {listId: id}, 
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

    lockList(id) {
        if (!id) {
            return;
        }
        apiService.call(
            'POST', 'lockExpensesList', {listId: id}, 
            function(respText) {
                Dispatcher.dispatch({
                    actionType: Constants.LOCK_EXPENSES_LIST,
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
            actionType: Constants.ACTIVE_LIST_ID,
            listId: listId
        });
    }

}

module.exports = ExpensesActions;