import React, { Component } from 'react';
import Constants from '../../constants/LoginConstants.jsx';
import cookie from 'react-cookie';

import './LoginHeader.scss';

var loginStore = require('../../stores/LoginStore.jsx');


export default class LoginHeader extends Component {
    

    constructor(props) {
        super(props);
    }

    logout() {
        cookie.remove(Constants.WG_TOOLS_AUTH, {'path': '/'});
        location.reload();
    }

    render() {
        return (
            <div className='loginHeader'>
                <a className='loginHeader__logout' onClick={this.logout.bind(this)}>abmelden</a>
            </div>
        );
    }
}