import React, { Component } from 'react';
import MobileExpandable from './MobileExpandable.jsx';

import './ExpensesHeaderEntry.scss'

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
            <MobileExpandable displayText='Add List'>
                <div className='expensesListCreateForm'>
                    <h3 className='expensesListCreateForm__headline'>Liste anlegen</h3>
                    <form onSubmit={this.addList.bind(this)}>
                        <div className='form-group'>
                            <label className='form__label' htmlFor='name'>Name</label>
                            <input className='form__input' id='name' value={this.state.name} onChange={this.handleNameChange.bind(this)} />
                        </div>

                        <div className='form-group'>
                            <label className='expensesListCreateForm__label' htmlFor='submit'>Speichern</label>
                            <button id='submit' type='submit'>OK</button>
                        </div>
                    </form>
                </div>
            </MobileExpandable>

        );
    }

}