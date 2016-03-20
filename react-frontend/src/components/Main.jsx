import React, { Component } from 'react';

import EditForm from './edit/EditForm.jsx';
import ExpensesContainer from './expenses/ExpensesContainer.jsx';
import DeptContainer from './depts/DeptContainer.jsx';
var expensesActions = require('../actions/ExpensesActions.jsx');


export default class Main extends Component {

    constructor(props) {
        super(props);
        // init store
        //expensesActions.fetchExpenses();
        //expensesActions.fetchDepts();
        expensesActions.fetchExpensesLists(this.props.wg);
    }

    render() {
        return (
            <div className='main'>
                <ExpensesContainer wgName={this.props.wg}/>
                <DeptContainer />
                <EditForm />
            </div>);
    }
}

Main.propTypes = {
    wg: React.PropTypes.string.isRequired
}