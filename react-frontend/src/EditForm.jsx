import React, { Component } from 'react';
import request from 'superagent';
import './EditForm.scss'

export default class EditForm extends Component {

    constructor(props) {
        super(props);
        super(props);
        this.state = { amount: 0, name: ''};
    }


    addExpense(event) {
        event.preventDefault();
        //console.log(this.state);
        request.post('http://localhost:5000/storeExpense')
            .send({name: this.state.name, amount: this.state.amount})
            .set('Content-Type', 'application/json; charset=UTF-8')
            .set('Access-Control-Allow-Origin', '*')
            .end(function(err, res) {
                console.log(res);
            });
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
                        <input id="name" className='formInput__text' onChange={this.nameChange.bind(this)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="amount">Betrag</label>
                        <input id="amount" className='formInput__number' onChange={this.amountChange.bind(this)} />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">OK</button>
                    </div>
                </form>
            </div>

        );
    }
}
