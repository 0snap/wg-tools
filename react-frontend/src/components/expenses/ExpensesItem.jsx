import React, { Component } from 'react';

import './ExpensesItem.scss';

export default class ExpensesItem extends Component {

    constructor(props) {
        super(props);
        this.state = { alive: true }
        this.onDelete = this.onDelete.bind(this);
        this.doDelete = this.doDelete.bind(this);
        this.onAbort = this.onAbort.bind(this);
    }

    onDelete() {
        this.setState({alive: false});
    }

    onAbort() {
        this.setState({alive: true});
    }

    doDelete() {
        this.setState({alive: true});
        const { item, activeList, deleteExpense } = this.props;
        deleteExpense(item.id, activeList.id);
    }

    render() {
        const { item, activeList } = this.props;
        let nameStyle = {
            color: item.color
        }
        if(this.state.alive) {
            return (
                <li className='expensesItem moneyItem' title={item.comment}>
                    <span className='expensesItem__title' style={nameStyle}>{item.name} {item.amount}€</span>
                    { activeList.editable ? <button className='expensesItem__deleteButton' onClick={this.onDelete}>&#10006;</button> : ''}
                </li>
            );
        }
        return (
            <li className='expensesItem moneyItem'>
                <span className='expensesItem__title'>Löschen?</span>
                <button className='expensesItem__actionButton' onClick={this.onAbort}>Nein</button>
                <button className='expensesItem__actionButton' onClick={this.doDelete}>Ja</button>
            </li>
        );
    }
}

ExpensesItem.propTypes = {
    item: React.PropTypes.object.isRequired,
    activeList: React.PropTypes.object.isRequired,
    deleteExpense: React.PropTypes.func.isRequired

}