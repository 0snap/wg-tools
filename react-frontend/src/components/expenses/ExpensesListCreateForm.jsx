import React, { Component } from 'react';

import './ExpensesListCreateForm.scss'

var expensesActions = require('../../actions/ExpensesActions.jsx');

const MOBILE_NOT_VISIBLE = 'mobile-not-visible';
export default class ExpensesListCreateForm extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            cssMobileVisible: MOBILE_NOT_VISIBLE
        };
    }

    addList(event) {
        event.preventDefault();
        expensesActions.storeList(this.state.name.trim()); // gracefully
        this.setState({name: ''});
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    showContent(event) {
        event.preventDefault();
        if(this.state.cssMobileVisible) {
            this.setState({cssMobileVisible: undefined});
        } 
        else {
            this.setState({cssMobileVisible: MOBILE_NOT_VISIBLE});
        }
    }


    render() {
        return (
            <div className='expensesListCreateForm'>
                <button className='expensesListCreateForm__mobileButton' onClick={this.showContent.bind(this)}>Add List</button>
                <div className={this.state.cssMobileVisible}>
                    <h3 className='expensesListCreateForm__headline'>Liste anlegen</h3>
                    <form onSubmit={this.addList.bind(this)}>
                        <div className="form-group">
                            <label className="expensesListCreateForm__label" htmlFor="name">Name</label>
                            <input className="expensesListCreateForm__input" id="name" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
                        </div>

                        <div className="form-group">
                            <label className="expensesListCreateForm__label" htmlFor="submit">Speichern</label>
                            <button id="submit" type="submit">OK</button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }

}