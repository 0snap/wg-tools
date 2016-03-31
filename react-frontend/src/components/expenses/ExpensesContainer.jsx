import React, { Component } from 'react';
import ExpensesList from './ExpensesList.jsx';
import ExpensesGraph from './ExpensesGraph.jsx';
import ExpensesListSelector from './ExpensesListSelector.jsx';
import ExpensesListCreateForm from './ExpensesListCreateForm.jsx';
import Constants from '../../constants/ExpenseConstants.jsx';

var expensesStore = require('../../stores/ExpensesStore.jsx');
var expensesActions = require('../../actions/ExpensesActions.jsx');

import './ExpensesContainer.scss'


export default class ExpensesContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expenses: expensesStore.getAllExpenses(),
            expensesLists: expensesStore.getExpensesLists(),
            activeList: ''
        };
    }

    componentDidMount() {
        expensesStore.addEventListener(Constants.EXPENSE_POSTS_CHANGED, this.handleExpensesChange.bind(this));
        expensesStore.addEventListener(Constants.EXPENSES_LISTS_CHANGED, this.handleExpensesListsChange.bind(this));
        expensesStore.addEventListener(Constants.ACTIVE_LIST, this.handleListSelect.bind(this));
    }

    componentWillUnmount() {
        expensesStore.removeEventListener(Constants.EXPENSE_POSTS_CHANGED, this.handleExpensesChange.bind(this));
        expensesStore.removeEventListener(Constants.EXPENSES_LISTS_CHANGED, this.handleExpensesListsChange.bind(this));
        expensesStore.removeEventListener(Constants.ACTIVE_LIST, this.handleListSelect.bind(this));
    }

    handleExpensesChange() {
        this.setState({ expenses: expensesStore.getAllExpenses() });
    }

    handleExpensesListsChange() {
        this.setState({ expensesLists: expensesStore.getExpensesLists() });
        this.handleListSelect();
    }

    handleListSelect() {
        let activeList = expensesStore.getActiveList();
        expensesActions.fetchExpenses(activeList);
        this.setState({ activeList: activeList });
    }

    render() {
        console.log("rendering container " + this.state.activeList);
        return(
            <div className="expensesContainer">
                <div className="expensesContainer__header">
                    <h1>Ausgaben</h1>
                    <ExpensesListSelector expensesLists={this.state.expensesLists} selected={this.state.activeList} />
                    <ExpensesListCreateForm />
                </div>
                <ExpensesList expenses={this.state.expenses} listId={this.state.activeList} />
                <ExpensesGraph expenses={this.state.expenses} />
            </div>
        );
    }

}