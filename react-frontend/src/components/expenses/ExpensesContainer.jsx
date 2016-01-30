import React, { Component } from 'react';
import ExpensesList from './ExpensesList.jsx';
import ExpensesGraph from './ExpensesGraph.jsx';
import ExpensesListSelector from './ExpensesListSelector.jsx';
import ExpensesListCreateForm from './ExpensesListCreateForm.jsx';

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
        expensesStore.addEventListener('expense', this.handleExpensesChange.bind(this));
        expensesStore.addEventListener('expensesLists', this.handleExpensesListsChange.bind(this));
        expensesStore.addEventListener('activeList', this.handleListSelect.bind(this));
    }

    componentWillUnmount() {
        expensesStore.removeEventListener('expense', this.handleExpensesChange.bind(this));
        expensesStore.removeEventListener('expensesLists', this.handleExpensesListsChange.bind(this));
        expensesStore.removeEventListener('activeList', this.handleListSelect.bind(this));

    }

    handleExpensesChange() {
        this.setState({ expenses: expensesStore.getAllExpenses() });
    }

    handleExpensesListsChange() {
        this.setState({ expensesLists: expensesStore.getExpensesLists() });
        if(this.state.activeList == '' && this.state.expensesLists.length) {
            //initial select, load contents
            expensesActions.setActiveList(this.state.expensesLists[0].id);
        }
    }

    handleListSelect() {
        let activeList = expensesStore.getActiveList();
        expensesActions.fetchExpenses(activeList);
        this.setState({ activeList: activeList });
    }

    render() {
        //console.log("rednering container " + this.state.activeList);
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