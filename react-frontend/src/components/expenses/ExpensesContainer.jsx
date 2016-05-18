import React, { Component } from 'react';
import ExpensesList from './ExpensesList.jsx';
import ExpensesGraph from './ExpensesGraph.jsx';
import ExpensesHeader from './ExpensesHeader.jsx';
import ExpensesListSelector from './ExpensesListSelector.jsx';
import ExpensesListCreateForm from './ExpensesListCreateForm.jsx';
import EditForm from './EditForm.jsx';
import Constants from '../../constants/ExpenseConstants.jsx';

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

        this.handleExpensesListsChange = this.handleExpensesListsChange.bind(this);
        this.handleExpensesChange = this.handleExpensesChange.bind(this);
        this.handleActiveListChange = this.handleActiveListChange.bind(this);
    }

    componentDidMount() {
        expensesStore.addEventListener(Constants.EXPENSE_POSTS_CHANGED, this.handleExpensesChange);
        expensesStore.addEventListener(Constants.EXPENSES_LISTS_CHANGED, this.handleExpensesListsChange);
        expensesStore.addEventListener(Constants.ACTIVE_LIST_CHANGED, this.handleActiveListChange);
    }

    componentWillUnmount() {
        expensesStore.removeEventListener(Constants.EXPENSE_POSTS_CHANGED, this.handleExpensesChange);
        expensesStore.removeEventListener(Constants.EXPENSES_LISTS_CHANGED, this.handleExpensesListsChange);
        expensesStore.removeEventListener(Constants.ACTIVE_LIST_CHANGED, this.handleActiveListChange);
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
        }
        else {
            this.setState( { expenses: [] } );
        }
        this.setState({ activeList: activeList });
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