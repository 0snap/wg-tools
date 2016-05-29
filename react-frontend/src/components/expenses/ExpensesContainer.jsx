import React, { Component } from 'react';
import ExpensesList from './ExpensesList.jsx';
import ExpensesGraph from './ExpensesGraph.jsx';
import ExpensesHeader from './ExpensesHeader.jsx';
import ExpensesListSelector from './ExpensesListSelector.jsx';
import ExpensesListCreateForm from './ExpensesListCreateForm.jsx';
import EditForm from './EditForm.jsx';
import Constants from '../../constants/ExpenseConstants.jsx';

var expensesActions = require('../../actions/ExpensesActions.jsx');

export default class ExpensesContainer extends Component {

    constructor(props) {
        super(props);
    }


    addExpense(name, amount, comment) {
        expensesActions.storeExpense(name, amount, comment, this.props.activeList.id);
    }

    render() {
        //console.log("rendering container " + this.state.activeList, this.state.expensesLists);
        return(
            <div className="container-fluid">
                <ExpensesHeader expensesLists={this.props.expensesLists} selected={this.props.activeList} />
                <ExpensesList expenses={this.props.expenses} activeList={this.props.activeList} />
                <ExpensesGraph expenses={this.props.expenses} />
            </div>
        );
    }

}

ExpensesContainer.propTypes = {
    expenses: React.PropTypes.array.isRequired,
    expensesLists: React.PropTypes.array.isRequired,
    activeList: React.PropTypes.object
}