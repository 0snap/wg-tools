import React, { Component } from 'react';
import EditContainer from './edit/EditContainer.jsx';
import LoginHeader from './login/LoginHeader.jsx';
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
                <LoginHeader />
                <ExpensesContainer />
                <EditContainer />
                <DeptContainer />
            </div>
        );
    }
}