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
        let _this = this;
        request.get('http://localhost:5000/expensesList').end(function(err, res) {
            if(err) {
                console.log(err); 
            }
            _this.setState({expenses: JSON.parse(res.text)});
            //console.log(_this.state.expenses);
        });
    }

    render() {

        let expenses = this.state.expenses;

        return (
            <div className='expensesList'>
                <h3>Ausgaben</h3>
                <ul>
                {expenses.map(function(item) {
                    return <ExpensesItem name={item.name} amount={item.amount} date={item.date} />
                })}
                </ul>
            </div>);
    }
}
