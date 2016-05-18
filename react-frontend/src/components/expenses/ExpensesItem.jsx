import React, { Component } from 'react';
var expensesActions = require('../../actions/ExpensesActions.jsx');

import './ExpensesItem.scss';

export default class ExpensesItem extends Component {

    constructor(props) {
        super(props);
        this.state = { alive: true }
    }

    onDelete() {
        this.setState({alive: false});
    }

    onAbort() {
        this.setState({alive: true});
    }

    doDelete() {
        this.setState({alive: true});
        expensesActions.deleteExpense(this.props.item.id, this.props.activeList.listId);
    }

    render() {
        let nameStyle = {
            color: this.props.item.color
        }
        if(this.state.alive) {
            return (
                <li className='expensesItem moneyItem' title={this.props.item.comment}>
                    <span className='expensesItem__title' style={nameStyle}>{this.props.item.name} {this.props.item.amount}€</span>
                    { this.props.activeList.editable ? <button className='expensesItem__deleteButton' onClick={this.onDelete.bind(this)}>&#10006;</button> : ''}
                </li>
            );
        }
        return (
            <li className='expensesItem moneyItem'>
                <span className='expensesItem__title'>Löschen?</span>
                <button className='expensesItem__actionButton' onClick={this.onAbort.bind(this)}>Nein</button>
                <button className='expensesItem__actionButton' onClick={this.doDelete.bind(this)}>Ja</button>
            </li>
        );
    }
}

ExpensesItem.propTypes = {
    item: React.PropTypes.object.isRequired,
    activeList: React.PropTypes.object.isRequired
}