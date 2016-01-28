import React, { Component } from 'react';
import ExpensesList from './ExpensesList.jsx';
import ExpensesGraph from './ExpensesGraph.jsx';
import ExpensesListSelector from './ExpensesListSelector.jsx';
var expensesStore = require('../../stores/ExpensesStore.jsx');

import './ExpensesContainer.scss'


export default class ExpensesContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expenses: expensesStore.getAllExpenses(),
            expensesLists: []
        };
    }

    componentDidMount() {
        expensesStore.addEventListener('expense', this.handleStoreChange.bind(this));
    }

    componentWillUnmount() {
        expensesStore.removeEventListener('expense', this.handleStoreChange.bind(this));
    }

    handleStoreChange() {
        this.setState({ expenses: expensesStore.getAllExpenses() });
    }

    render() {
        return(
            <div className="expensesContainer">
                <div className="expensesContainer__header">
                    <h1>Ausgaben</h1>
                    <ExpensesListSelector expensesLists={this.state.expensesLists}/>
                </div>
                <ExpensesList expenses={this.state.expenses} />
                <ExpensesGraph expenses={this.state.expenses} />
            </div>
        );
    }

}