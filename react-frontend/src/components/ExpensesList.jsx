import React, { Component } from 'react';
import ExpensesItem from './ExpensesItem.jsx';
var expensesStore = require('../stores/ExpensesStore.jsx');
var expensesActions = require('../actions/ExpensesActions.jsx');

import './ExpensesList.scss'

export default class ExpensesList extends Component {

    constructor(props) {
        super(props);
        expensesActions.fetchExpenses();
        this.state = { expenses: expensesStore.getAllExpenses() };
    }

    componentDidMount() {
        expensesStore.addChangeListener(this.handleStoreChange.bind(this));
    }

    componentWillUnmount() {
        expensesStore.removeChangeListener(this.handleStoreChange.bind(this));
    }

    handleStoreChange() {
        this.setState({ expenses: expensesStore.getAllExpenses() });
    }

    render() {
        let expenses = this.state.expenses;
        //console.log(expenses);
        
        if(Object.keys(expenses).length === 0) {
            return (<div className='expensesList'><h3>Keine Ausgaben</h3></div>);
        }

        let _this = this;
        return (
            <div className='expensesDiv'>
                <h2>Ausgaben</h2>
                <ul className='expensesItemList'>
                {expenses.map(item => {
                    return <ExpensesItem name={item.name} amount={item.amount} date={item.date} id={item.id} />
                })}
                </ul>
            </div>);
    }
}
