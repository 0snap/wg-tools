import React, { Component } from 'react';
var expensesActions = require('../../actions/ExpensesActions.jsx');

import './ExpensesItem.scss';

export default class ExpensesItem extends Component {

    constructor(props) {
        super(props);
    }

    onDelete() {
        //console.log("del ", this.props.id);
        expensesActions.deleteExpense(this.props.item.id);
    }

    render() {
        let nameStyle = {
            color: this.props.item.color
        }
        return (
            <li className='expensesItem'>
                <span className='expensesItem__title' style={nameStyle}>{this.props.item.name}&nbsp;&nbsp;&nbsp;&nbsp;{this.props.item.amount}€</span>
                <button className='deleteButton' onClick={this.onDelete.bind(this)}>&#10006;</button>
            </li>
        );
    }



}

ExpensesItem.propTypes = {
    item: React.PropTypes.object.isRequired
}