import Dispatcher from '../dispatcher/Dispatcher.jsx';
import request from 'superagent';
import Constants from '../constants/ExpenseConstants.jsx';
var loginStore = require('../stores/LoginStore.jsx');

let ExpensesActions = {

    storeExpense(name, amount, listId) {
        let _this = this;
        request.post('http://localhost:5000/storeExpense')
            .send({name: name, amount: amount, listId: listId})
            .set('Content-Type', 'application/json; charset=UTF-8')
            .set('Authorization', 'JWT ' + loginStore.getToken())
            .set('Access-Control-Allow-Origin', '*')
            .end(function(err, res) {
                if(err) {
                    console.log(err);
                }
                else {
                    //console.log(res);
                    let stored = JSON.parse(res.text)
                    //console.log(stored)
                    Dispatcher.dispatch({
                        actionType: Constants.ADD_EXPENSE_POST,
                        name: stored.name,
                        amount: stored.amount,
                        date: stored.date,
                        color: stored.color,
                        id: stored.id, 
                        listId: listId
                    });
                    _this.fetchDepts(listId);
                }

        });
        //console.log(name, amount);
    },

    deleteExpense(id, listId) {
        let _this = this;
        request.del('http://localhost:5000/deleteExpense')
            .send({ id: id, listId: listId})
            .set('Content-Type', 'application/json; charset=UTF-8')
            .set('Authorization', 'JWT ' + loginStore.getToken())
            .set('Access-Control-Allow-Origin', '*')
            .end(function(err, res) {
                if(err) {
                    console.log(err);
                }
                else { 
                    Dispatcher.dispatch({
                        actionType: Constants.DELETE_EXPENSE_POST,
                        id: id, 
                        listId: listId
                    });
                    _this.fetchDepts(listId);
                }
            });
        //console.log(timestamp);
    },

    fetchExpenses(listId) {
        request.get('http://localhost:5000/expensesList?listId=' + listId)
            .set('Authorization', 'JWT ' + loginStore.getToken())
            .end(function(err, res) {
            if(err) {
                console.log(err); 
            }
            Dispatcher.dispatch({
                actionType: Constants.FETCH_EXPENSE_POSTS,
                expenses: JSON.parse(res.text)
            });
            //console.log(_this.state.expenses);
        });
    },

    fetchDepts(listId) {
        request.get('http://localhost:5000/meanDepts?listId=' + listId)
            .set('Authorization', 'JWT ' + loginStore.getToken())
            .end(function(err, res) {
            if(err) {
                console.log(err);
            }
            else {
                Dispatcher.dispatch({
                    actionType: Constants.FETCH_DEPTS,
                    depts: JSON.parse(res.text)
                });
            }
        });
    },

    fetchExpensesLists(listName) {
        request.get('http://localhost:5000/expensesLists')
            .set('Authorization', 'JWT ' + loginStore.getToken())
            .end(function(err, res) {
            if(err) {
                console.log(err);
            }
            else {
                Dispatcher.dispatch({
                    actionType: Constants.FETCH_EXPENSES_LISTS,
                    expensesLists: JSON.parse(res.text),
                    listName: listName // hacky "select by name"
                });
            }
        });
    },

    storeList(name) {
        //console.log("post list " + name);
        let _this = this;
        request.post('http://localhost:5000/createExpensesList')
            .send({name: name})
            .set('Content-Type', 'application/json; charset=UTF-8')
            .set('Authorization', 'JWT ' + loginStore.getToken())
            .set('Access-Control-Allow-Origin', '*')
            .end(function(err, res) {
                if(err) {
                    console.log(err);
                }
                let id = JSON.parse(res.text)
                if(id != undefined ) {
                    //console.log(stored)
                    Dispatcher.dispatch({
                        actionType: Constants.ADD_EXPENSES_LIST,
                        name: name,
                        id: id
                    });
                    _this.setActiveList(id);
                }

        });

    },

    setActiveList(listId) {
        Dispatcher.dispatch({
            actionType: Constants.ACTIVE_LIST,
            listId: listId
        });
    }

}

module.exports = ExpensesActions;
