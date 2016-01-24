import Dispatcher from '../dispatcher/Dispatcher.jsx';
import request from 'superagent';

let ExpensesActions = {

    storeExpense(name, amount) {
        let _this = this;
        request.post('http://localhost:5000/storeExpense')
            .send({name: name, amount: amount})
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
                        id: stored.id
                    });
                    _this.fetchDepts();
                }

        });
        //console.log(name, amount);
    },

    deleteExpense(id) {
        let _this = this;
        request.del('http://localhost:5000/deleteExpense')
            .send({ id: id })
            .set('Content-Type', 'application/json; charset=UTF-8')
            .set('Access-Control-Allow-Origin', '*')
            .end(function(err, res) {
                if(err) {
                    console.log(err);
                }
                else { 
                    Dispatcher.dispatch({
                        actionType: 'delete',
                        id: id
                    });
                    _this.fetchDepts();
                }
            });
        //console.log(timestamp);
    },

    fetchExpenses() {
        request.get('http://localhost:5000/expensesList').end(function(err, res) {
            if(err) {
                console.log(err); 
            }
            Dispatcher.dispatch({
                actionType: 'overwriteAll',
                expenses: JSON.parse(res.text)
            });
            //console.log(_this.state.expenses);
        });
    },

    fetchDepts() {
        request.get('http://localhost:5000/meanDepts').end(function(err, res) {
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
    }

}

module.exports = ExpensesActions;