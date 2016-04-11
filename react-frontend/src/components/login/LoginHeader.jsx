import React, { Component } from 'react';
import Constants from '../../constants/LoginConstants.jsx';
import { Link } from 'react-router'

import './LoginHeader.scss';

var loginRegisterActions = require('../../actions/LoginRegisterActions.jsx');



export default class LoginHeader extends Component {
    

    constructor(props) {
        super(props);
    }

    logout() {
        loginRegisterActions.logout();
    }

    render() {
        return (
            <div className='loginHeader'>
                <Link to='/login' onClick={this.logout.bind(this)}>
                    abmelden
                </Link>
            </div>
        );
    }
}