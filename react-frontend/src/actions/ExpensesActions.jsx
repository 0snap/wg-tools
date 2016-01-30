import Dispatcher from '../dispatcher/Dispatcher.jsx';
import request from 'superagent';

let ExpensesActions = {

    storeExpense(name, amount, listId) {
        let _this = this;
        request.post('http://localhost:5000/storeExpense')
            .send({name: name, amount: amount, listId: listId})
            .set('Content-Type', 'application/json; charset=UTF-8')
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
                        actionType: 'add',
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
            .set('Access-Control-Allow-Origin', '*')
            .end(function(err, res) {
                if(err) {
                    console.log(err);
                }
                else { 
                    Dispatcher.dispatch({
                        actionType: 'delete',
                        id: id, 
                        listId: listId
                    });
                    _this.fetchDepts(listId);
                }
            });
        //console.log(timestamp);
    },

    fetchExpenses(listId) {
        request.get('http://localhost:5000/expensesList?listId=' + listId).end(function(err, res) {
            if(err) {
                console.log(err); 
            }
            Dispatcher.dispatch({
                actionType: 'overwriteAllExpenses',
                expenses: JSON.parse(res.text)
            });
            //console.log(_this.state.expenses);
        });
    },

    fetchDepts(listId) {
        request.get('http://localhost:5000/meanDepts?listId=' + listId).end(function(err, res) {
            if(err) {
                console.log(err);
            }
            else {
                Dispatcher.dispatch({
                    actionType: 'depts',
                    depts: JSON.parse(res.text)
                });
            }
        });
    },

    fetchExpensesLists() {
        request.get('http://localhost:5000/expensesLists').end(function(err, res) {
            if(err) {
                console.log(err);
            }
            else {
                Dispatcher.dispatch({
                    actionType: 'expensesLists',
                    expensesLists: JSON.parse(res.text)
                });
            }
        });
    },

    fetchWGs() {
        request.get('http://localhost:5000/wgs').end(function(err, res) {
            if(err) {
                console.log(err);
            }
            else {
                Dispatcher.dispatch({
                    actionType: 'wgs',
                    wgs: JSON.parse(res.text)
                });
            }
        });
    },

    setActiveList(listId) {
        Dispatcher.dispatch({
            actionType: 'activeList',
            listId: listId
        });
    }

}

module.exports = ExpensesActions;