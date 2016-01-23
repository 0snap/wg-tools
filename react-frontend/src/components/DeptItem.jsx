import React, { Component } from 'react';
var expensesActions = require('../actions/ExpensesActions.jsx');

import './DeptItem.scss';

export default class DeptItem extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <li className='deptItem'>
                <span className='deptItem__title'>{this.props.borrower} an {this.props.sponsor}: {this.props.amount}€</span>
            </li>
        );
    }



}

DeptItem.propTypes = {
    borrower: React.PropTypes.string.isRequired,
    sponsor: React.PropTypes.string.isRequired,
    amount: React.PropTypes.number.isRequired,
}