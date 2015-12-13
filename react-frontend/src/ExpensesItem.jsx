import React, { Component } from 'react';

export default class ExpensesItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li><span>{this.props.name}</span> <span>{this.props.amount}</span></li>
        );
    }



}

ExpensesItem.propTypes = {
    name: React.PropTypes.string.isRequired,
    amount: React.PropTypes.number.isRequired,
    date: React.PropTypes.number.isRequired
}