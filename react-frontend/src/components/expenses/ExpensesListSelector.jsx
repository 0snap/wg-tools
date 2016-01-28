import React, { Component } from 'react';

import './ExpensesListSelector.scss'


export default class ExpensesListSelector extends Component {

    constructor(props) {
        super(props);
        this.state = { show: false };
    }


    handleStoreChange() {
        this.setState({ expensesLists: expensesStore.getAllExpenses() });
    }

    render() {
        return(
            <div className="expensesListSelector"> 
            <h3>Liste auswählen</h3>
            </div>
        );
    }

}

ExpensesListSelector.propTypes = {
    expensesLists: React.PropTypes.array.isRequired
}