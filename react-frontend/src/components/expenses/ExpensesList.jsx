import React, { Component } from 'react';
import ExpensesItem from './ExpensesItem.jsx';

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
            return (<div className='expensesDiv'><h3>Keine Ausgaben</h3></div>);
        }

        let _this = this;
        return (
            <div className='expensesList'>
                <ul className='expensesItemList'>
                {expenses.map(item => {
                    return <ExpensesItem item={item}/>
                })}
                </ul>
            </div>);
    }
}

ExpensesList.propTypes = {
    expenses: React.PropTypes.array.isRequired
}
