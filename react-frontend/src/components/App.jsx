import React, { Component } from 'react';
import './App.scss';

import EditForm from './EditForm.jsx';
import ExpensesList from './ExpensesList.jsx';
import DeptContainer from './DeptContainer.jsx';
var expensesActions = require('../actions/ExpensesActions.jsx');


export class App extends Component {

    constructor(props) {
        super(props);
        // init store
        expensesActions.fetchExpenses();
        expensesActions.fetchDepts();
    }

    render() {
        return (
            <div className='app'>
                <ExpensesList />
                <DeptContainer />
                <EditForm />
            </div>);
    }
}
