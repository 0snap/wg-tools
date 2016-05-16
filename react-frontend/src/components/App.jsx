import React, { Component } from 'react';
import AppHeader from './header/AppHeader.jsx';
import ExpensesContainer from './expenses/ExpensesContainer.jsx';
import DeptContainer from './depts/DeptContainer.jsx';

import Constants from '../constants/LoginConstants.jsx';

import './App.scss';

var expensesActions = require('../actions/ExpensesActions.jsx');

export default class App extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        expensesActions.fetchExpensesLists(this.props.params.activeListName);
    }

    render() {
        // console.log(this.props.params.activeListName);
        return (
            <div className='app'>
                <AppHeader />
                <ExpensesContainer />
                <DeptContainer />
            </div>
        );
    }
}