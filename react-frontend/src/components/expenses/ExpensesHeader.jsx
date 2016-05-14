import React, { Component } from 'react';
import ExpensesListSelector from './ExpensesListSelector.jsx';
import ExpensesListCreateForm from './ExpensesListCreateForm.jsx';
import EditForm from './EditForm.jsx';

var expensesActions = require('../../actions/ExpensesActions.jsx');


export default class ExpensesHeader extends Component {

    constructor(props) {
        super(props);
    }

    addExpense(name, amount, comment) {
        expensesAction.storeExpense(name, amount, comment, this.props.selected.id);
    }

    render() {
        return(
            <div className="container__header expensesHeader">
                <h1>Ausgaben</h1>
                <ExpensesListCreateForm />
                <ExpensesListSelector expensesLists={this.props.expensesLists} selected={this.props.selected} />
                <EditForm activeList={this.props.selected} submitCallback={this.addExpense.bind(this)} />
            </div>
        );
    }

}

ExpensesHeader.propTypes = {
    expensesLists: React.PropTypes.array.isRequired,
    selected: React.PropTypes.object
}