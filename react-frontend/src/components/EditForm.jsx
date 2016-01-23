import React, { Component } from 'react';
var expensesAction = require('../actions/ExpensesActions.jsx');
import './EditForm.scss'

export default class EditForm extends Component {

    constructor(props) {
        super(props);
        this.state = { amount: '', name: ''};
    }


    addExpense(event) {
        event.preventDefault();
        var amount = this.state.amount.trim();
        var name = this.state.name.trim();
        expensesAction.storeExpense(name, amount);
        this.clearInputfields();
    }

    clearInputfields() {
        this.setState({amount: ''});
        this.setState({name: ''});
    }

    nameChange(event) {
        this.setState({name: event.target.value});
    }

    amountChange(event) {
        this.setState({amount: event.target.value});
    }

    render() {
        return (
            <div className='editForm'>
                <h2>Eintrag anlegen</h2>
                <form onSubmit={this.addExpense.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input id="name" className='formInput__text' value={this.state.name} onChange={this.nameChange.bind(this)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="amount">Betrag</label>
                        <input id="amount" type="number" step="0.01" min="0" className='formInput__number' value={this.state.amount} onChange={this.amountChange.bind(this)} />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">OK</button>
                    </div>
                </form>
            </div>

        );
    }
}
