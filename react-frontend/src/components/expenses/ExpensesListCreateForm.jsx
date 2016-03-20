import React, { Component } from 'react';

import './ExpensesListCreateForm.scss'

var expensesActions = require('../../actions/ExpensesActions.jsx');

export default class ExpensesListCreateForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };
    }

    addList(event) {
        event.preventDefault();
        expensesActions.storeList(this.state.name.trim(), this.props.wgName); // gracefully
        this.setState({name: ''});
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }


    render() {
        return (
            <div className='expensesListCreateForm'>
                <h3>Liste anlegen</h3>
                <form onSubmit={this.addList.bind(this)}>
                    <div className="form-group">
                        <label className="expensesListCreateForm__label" htmlFor="name">Name</label>
                        <input className="expensesListCreateForm__input" id="name" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
                    </div>

                    <div className="form-group">
                        <label className="expensesListCreateForm__label" htmlFor="submit">Speichern</label>
                        <button className="expensesListCreateForm__button btn btn-primary" id="submit" type="submit">OK</button>
                    </div>
                </form>
            </div>

        );
    }

}

ExpensesListCreateForm.propTypes = {
    wgName: React.PropTypes.string.isRequired
}