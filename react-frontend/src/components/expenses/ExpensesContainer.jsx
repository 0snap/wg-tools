import React, { Component } from 'react';
import ExpensesList from './ExpensesList.jsx';
import ExpensesGraph from './ExpensesGraph.jsx';
var expensesStore = require('../../stores/ExpensesStore.jsx');

import './ExpensesContainer.scss'


export default class ExpensesContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { expenses: expensesStore.getAllExpenses() };
    }

    componentDidMount() {
        expensesStore.addChangeListener(this.handleStoreChange.bind(this));
    }

    componentWillUnmount() {
        expensesStore.removeChangeListener(this.handleStoreChange.bind(this));
    }

    handleStoreChange() {
        this.setState({ expenses: expensesStore.getAllExpenses() });
    }

    render() {
        return(
            <div className="expensesContainer">
                <h2>Ausgaben</h2>
                <ExpensesList expenses={this.state.expenses} />
                <ExpensesGraph expenses={this.state.expenses} />
            </div>
        );
    }

}