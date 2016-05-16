import React, { Component } from 'react';
import Constants from '../../constants/LoginConstants.jsx';
import { Link } from 'react-router'

import './AppHeader.scss';

var loginRegisterActions = require('../../actions/LoginRegisterActions.jsx');



export default class AppHeader extends Component {
    

    constructor(props) {
        super(props);
    }

    logout() {
        loginRegisterActions.logout();
    }

    render() {
        return (
            <div className='appHeader container-fluid'>
                <Link to='/login' onClick={this.logout.bind(this)}>
                    abmelden
                </Link>
            </div>
        );
    }
}