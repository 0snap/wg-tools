import React, { Component } from 'react';
import ExpensesListSelectOption from './ExpensesListSelectOption.jsx';

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
                <select className="expensesListSelector__select">
                    {this.props.expensesLists.map((list) => {
                        return <ExpensesListSelectOption list={list}/>
                    })};
                </select> 
            </div>
        );
    }

}

ExpensesListSelector.propTypes = {
    expensesLists: React.PropTypes.array.isRequired
}