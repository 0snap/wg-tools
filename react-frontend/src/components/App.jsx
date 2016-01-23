import React, { Component } from 'react';
import './App.scss';

import EditForm from './EditForm.jsx';
import ExpensesList from './ExpensesList.jsx';
import MeanDepts from './MeanDepts.jsx';
var expensesActions = require('../actions/ExpensesActions.jsx');


export class App extends Component {

    constructor(props) {
        super(props);
        // init store
        expensesActions.fetchExpenses();
        expensesActions.fetchMeans();
    }

    render() {
        return (
            <div className='app'>
                <ExpensesList />
                <MeanDepts />
                <EditForm />
            </div>);
    }
}
