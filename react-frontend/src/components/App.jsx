import React, { Component } from 'react';
import './App.scss';

import EditForm from './EditForm.jsx';
import ExpensesContainer from './ExpensesContainer.jsx';
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
                <ExpensesContainer />
                <DeptContainer />
                <EditForm />
            </div>);
    }
}
