import React, { Component } from 'react';
import request from 'superagent';
import ExpensesItem from './ExpensesItem.jsx';

import './ExpensesList.scss'

export default class ExpensesList extends Component {

    constructor(props) {
        super(props);
        this.state = { expenses: [] };
    }

    componentDidMount() {
        this.fetchExpenses();
    }

    fetchExpenses() {
        let _this = this;
        request.get('http://localhost:5000/expensesList').end(function(err, res) {
            if(err) {
                console.log(err); 
            }
            _this.setState({expenses: JSON.parse(res.text)});
            //console.log(_this.state.expenses);
        });
    }

    deleteExpense(timestamp) {
        let _this = this;
        request.del('http://localhost:5000/deleteExpense')
            .send({ date: timestamp })
            .set('Content-Type', 'application/json; charset=UTF-8')
            .set('Access-Control-Allow-Origin', '*')
            .end(function(err, res) {
                if(err) {
                    console.log(err);
                }
                _this.fetchExpenses();
            });
    }

    render() {

        let expenses = this.state.expenses;
        if(expenses.length === 0) {
            return (<div className='expensesList'><h3>Keine Ausgaben</h3></div>);
        }

        let _this = this;
        return (
            <div className='expensesDiv'>
                <h2>Ausgaben</h2>
                <ul className='expensesItemList'>
                {expenses.map(function(item) {
                    return <ExpensesItem name={item.name} amount={item.amount} date={item.date} list={_this}/>
                })}
                </ul>
            </div>);
    }
}
