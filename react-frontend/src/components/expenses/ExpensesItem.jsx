import React, { Component } from 'react';
var expensesActions = require('../../actions/ExpensesActions.jsx');

import './ExpensesItem.scss';

export default class ExpensesItem extends Component {

    constructor(props) {
        super(props);
    }

    onDelete() {
        //console.log("del ", this.props.id);
        expensesActions.deleteExpense(this.props.id);
    }

    render() {
        return (
            <li className='expensesItem'>
                <span className='expensesItem__title'>{this.props.name}&nbsp;&nbsp;&nbsp;&nbsp;{this.props.amount}€</span>
                <button className='deleteButton' onClick={this.onDelete.bind(this)}>&#10006;</button>
            </li>
        );
    }



}

ExpensesItem.propTypes = {
    name: React.PropTypes.string.isRequired,
    amount: React.PropTypes.number.isRequired,
    date: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired
}