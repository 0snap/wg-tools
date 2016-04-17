import React, { Component } from 'react';
import ExpensesItem from './ExpensesItem.jsx';

import './ExpensesList.scss'

export default class ExpensesList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let expenses = this.props.expenses;
        // console.log(expenses);
        if (Object.keys(expenses).length === 0 || !this.props.listId) {
            return (<div className='container__nocontent'><h3>Keine Ausgaben</h3></div>);
        }
        
        expenses.sort((a, b) => new Date(b.date).getTime() > new Date(a.date).getTime());

        let _this = this;
        return (
            <div className='expensesList'>
                <ul className='expensesItemList'>
                {expenses.map(item => {
                    return <ExpensesItem key={item.id} item={item} listId={this.props.listId} />
                })}
                </ul>
            </div>);
    }
}

ExpensesList.propTypes = {
    expenses: React.PropTypes.array.isRequired,
    listId: React.PropTypes.string
}
