import React, { Component } from 'react';
import ExpensesList from './ExpensesList.jsx';
import ExpensesGraph from './ExpensesGraph.jsx';
import ExpensesHeader from './ExpensesHeader.jsx';
import ExpensesListSelector from './ExpensesListSelector.jsx';
import ExpensesListCreateForm from './ExpensesListCreateForm.jsx';
import EditForm from './EditForm.jsx';
import Constants from '../../constants/ExpenseConstants.jsx';

import './ExpensesContainer.scss';

var expensesStore = require('../../stores/ExpensesStore.jsx');
var expensesActions = require('../../actions/ExpensesActions.jsx');


export default class ExpensesContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expenses: expensesStore.getAllExpenses(),
            expensesLists: expensesStore.getExpensesLists(),
            activeList: undefined
        };
    }

    componentDidMount() {
        expensesStore.addEventListener(Constants.EXPENSE_POSTS_CHANGED, this.handleExpensesChange.bind(this));
        expensesStore.addEventListener(Constants.EXPENSES_LISTS_CHANGED, this.handleExpensesListsChange.bind(this));
        expensesStore.addEventListener(Constants.ACTIVE_LIST_CHANGED, this.handleActiveListChange.bind(this));
    }

    componentWillUnmount() {
        expensesStore.removeEventListener(Constants.EXPENSE_POSTS_CHANGED, this.handleExpensesChange.bind(this));
        expensesStore.removeEventListener(Constants.EXPENSES_LISTS_CHANGED, this.handleExpensesListsChange.bind(this));
        expensesStore.removeEventListener(Constants.ACTIVE_LIST_CHANGED, this.handleActiveListChange.bind(this));
    }

    handleExpensesChange() {
        this.setState({ expenses: expensesStore.getAllExpenses() });
    }

    handleExpensesListsChange() {
        this.setState({ expensesLists: expensesStore.getExpensesLists() });
    }

    handleActiveListChange() {
        let activeList = expensesStore.getActiveList();
        if(activeList) {
            expensesActions.fetchExpenses(activeList.id);
            this.setState({ activeList: activeList });
        }
    }

    addExpense(name, amount, comment) {
        expensesAction.storeExpense(name, amount, comment, this.state.activeList.id);
    }

    render() {
        //console.log("rendering container " + this.state.activeList, this.state.expensesLists);
        return(
            <div className="container-fluid">
                <ExpensesHeader expensesLists={this.state.expensesLists} selected={this.state.activeList} />
                <ExpensesList expenses={this.state.expenses} activeList={this.state.activeList} />
                <ExpensesGraph expenses={this.state.expenses} />
            </div>
        );
    }

}