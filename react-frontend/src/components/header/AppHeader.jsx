import React, { Component } from 'react';
import Constants from '../../constants/LoginConstants.jsx';
import { Link } from 'react-router'

import './AppHeader.scss';

var loginRegisterActions = require('../../actions/LoginRegisterActions.jsx');
var loginStore = require('../../stores/LoginStore.jsx');
var expensesStore = require('../../stores/ExpensesStore.jsx');


export default class AppHeader extends Component {
    

    constructor(props) {
        super(props);
    }

    logout() {
        loginRegisterActions.logout();
    }

    getLoginLink() {
        if(loginStore.isLoggedIn()) {
            return <Link className='appHeader__loginLink' to='/login' onClick={this.logout.bind(this)}>
                    abmelden
                </Link>
        }
        else {
            return <Link className='appHeader__loginLink' to='/login' >
                    anmelden
                </Link>
        }
    }

    getActiveListLink() {
        let activeList = expensesStore.getActiveList();
        if (activeList) {
            return <Link to={'/app/' + activeList.name}>
                    home
                </Link>
        }
        return undefined;
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='appHeader'>
                    <Link to='/about'>
                        about
                    </Link>
                    <Link to='/faq'>
                        faq
                    </Link>
                    {this.getActiveListLink()}
                    {this.getLoginLink()}
                </div>
            </div>
        );
    }
}