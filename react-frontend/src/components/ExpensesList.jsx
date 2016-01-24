import React, { Component } from 'react';
import ExpensesItem from './ExpensesItem.jsx';
var expensesStore = require('../stores/ExpensesStore.jsx');

import './ExpensesList.scss'

export default class ExpensesList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let expenses = this.props.expenses;
        expenses.sort((a, b) => b.date > a.date)
        //console.log(expenses);
        
        if(Object.keys(expenses).length === 0) {
            return (<div className='expensesDiv'><h2>Keine Ausgaben</h2></div>);
        }

        let _this = this;
        return (
            <div className='expensesList'>
                <h2>Ausgaben</h2>
                <ul className='expensesItemList'>
                {expenses.map(item => {
                    return <ExpensesItem name={item.name} amount={item.amount} date={item.date} id={item.id} />
                })}
                </ul>
            </div>);
    }
}

ExpensesList.propTypes = {
    expenses: React.PropTypes.array.isRequired
}
