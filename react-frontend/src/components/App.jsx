import React, { Component } from 'react';
import './App.scss';

import EditForm from './edit/EditForm.jsx';
import ExpensesContainer from './expenses/ExpensesContainer.jsx';
import DeptContainer from './depts/DeptContainer.jsx';
var expensesActions = require('../actions/ExpensesActions.jsx');


export class App extends Component {

    constructor(props) {
        super(props);
        // init store
        //expensesActions.fetchExpenses();
        //expensesActions.fetchDepts();
        expensesActions.fetchExpensesLists(this.props.wg);
    }

    render() {
        return (
            <div className='app'>
                <ExpensesContainer wgName={this.props.wg}/>
                <DeptContainer />
                <EditForm />
            </div>);
    }
}

App.propTypes = {
    wg: React.PropTypes.string.isRequired
}