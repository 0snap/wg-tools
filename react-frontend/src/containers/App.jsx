import React, { Component } from 'react';
import AppHeader from '../components/header/AppHeader.jsx';
import ExpensesContainer from '../components/expenses/ExpensesContainer.jsx';
import DeptContainer from '../components/depts/DeptContainer.jsx';

import Constants from '../constants/LoginConstants.jsx';

import './App.scss';

var expensesActions = require('../actions/ExpensesActions.jsx');

export default class App extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // pass successCallback: wait for lists being fetched, then set active 
        expensesActions.fetchExpensesLists( () => 
            expensesActions.setActiveListByName(this.props.params.activeListName)
        );
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