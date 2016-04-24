import React, { Component } from 'react';
var expensesAction = require('../../actions/ExpensesActions.jsx');
var expensesStore = require('../../stores/ExpensesStore.jsx');
import Constants from '../../constants/ExpenseConstants.jsx';


export default class EditForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            name: '',
            comment: ''
        };
    }

    addExpense(event) {
        event.preventDefault();
        let amount = this.state.amount;
        let name = this.state.name.trim();
        let comment = this.state.comment.trim();

        this.props.submitCallback(name, amount, comment);

        this.clearInputfields();
    }

    clearInputfields() {
        this.setState({amount: 0, name: '', comment: ''});
    }

    nameChange(event) {
        this.setState({name: event.target.value});
    }

    amountChange(event) {
        this.setState({amount: event.target.value});
    }

    commentChange(event) {
        this.setState({comment: event.target.value});
    }

    render() {
        if(this.props.activeList === undefined) {
            return (
                <div className='container__nocontent'>
                    <h3>Keine Liste ausgewählt</h3>
                </div>
            );
        }
        return (
            <form onSubmit={this.addExpense.bind(this)}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" value={this.state.name} onChange={this.nameChange.bind(this)} />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Betrag</label>
                    <input id="amount" type="number" step="0.01" min="0" value={this.state.amount} onChange={this.amountChange.bind(this)} />
                </div>

                <div className="form-group">
                    <label htmlFor="comment">Kommentar</label>
                    <input id="comment" value={this.state.comment} onChange={this.commentChange.bind(this)} />
                </div>

                <div className="form-group">
                    <label htmlFor="submit">Speichern</label>
                    <button id="submit" type="submit">OK</button>
                </div>
            </form>
        );
    }
}

EditForm.propTypes = {
    activeList: React.PropTypes.string,
    submitCallback: React.PropTypes.func.isRequired
}
