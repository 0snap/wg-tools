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
        //console.log("del ", this.props.id);
        this.setState({alive: true});
        expensesActions.deleteExpense(this.props.item.id, this.props.listId);
    }

    render() {
        let nameStyle = {
            color: this.props.item.color
        }
        if(!this.state.alive) {
            return (
                <li className='expensesItem'>
                    <span className='expensesItem__title'>Wirklich löschen?</span>
                    <button className='expensesItem__actionButton' onClick={this.onAbort.bind(this)}>Nein</button>
                    <button className='expensesItem__actionButton' onClick={this.doDelete.bind(this)}>Ja</button>
                </li>
            );
        }
        return (
            <li className='expensesItem'>
                <span className='expensesItem__title' style={nameStyle}>{this.props.item.name}&nbsp;&nbsp;&nbsp;&nbsp;{this.props.item.amount}€</span>
                <button className='expensesItem__deleteButton' onClick={this.onDelete.bind(this)}>&#10006;</button>
            </li>
        );
    }



}

ExpensesItem.propTypes = {
    item: React.PropTypes.object.isRequired,
    listId: React.PropTypes.string.isRequired
}