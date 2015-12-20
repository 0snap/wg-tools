import Dispatcher from '../dispatcher/Dispatcher.jsx';
import request from 'superagent';

let ExpensesActions = {

    storeExpense(name, amount) {
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
                    console.log(res.text)
                    Dispatcher.dispatch({
                        actionType: 'overwriteAll',
                        expenses: stored
                    });
                }

        });
        //console.log(name, amount);
    },

    deleteExpense(timestamp) {
        request.del('http://localhost:5000/deleteExpense')
            .send({ date: timestamp })
            .set('Content-Type', 'application/json; charset=UTF-8')
            .set('Access-Control-Allow-Origin', '*')
            .end(function(err, res) {
                if(err) {
                    console.log(err);
                }
                else { 
                    Dispatcher.dispatch({
                        actionType: 'delete',
                        date: timestamp
                    });
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
    }

}

module.exports = ExpensesActions;