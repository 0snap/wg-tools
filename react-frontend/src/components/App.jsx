import React, { Component } from 'react';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Constants from '../constants/LoginConstants.jsx';
import cookie from 'react-cookie';

import './App.scss';

const AUTH_COOKIE = 'wgtoolsAuthenticationToken';


var loginStore = require('../stores/LoginStore.jsx');
var loginActions = require('../actions/LoginActions.jsx');



export default class App extends Component {
    
    constructor(props) {
        super(props);
        this.checkAuthCookie();
        this.state = { loggedIn: this.getLoginStatus() };
    }

    componentDidMount() {
        loginStore.addEventListener(Constants.LOGIN_STATUS_CHANGED, this.loginStatusChange.bind(this));
    }

    loginStatusChange() {
        //console.log(this.getLoginStatus());
        let loggedIn = this.getLoginStatus();
        if (loggedIn) {
            cookie.save(AUTH_COOKIE, this.getLoginToken(), {'path': '/', 'maxAge': 30*24*3600});
        }
        else {
            cookie.remove(AUTH_COOKIE, {'path': '/'});
        }
        this.setState( {'loggedIn': loggedIn } );
    }

    checkAuthCookie() {
        let token = cookie.load(AUTH_COOKIE);
        if (token && !this.getLoginStatus()) {
            //console.log('token found, logging in');
            loginActions.storeToken(token);
        }

    }
    
    getLoginStatus() {
        return loginStore.isLoggedIn();
    }

    getLoginToken() {
        return loginStore.getToken();
    }

    componentWillUnmount() {
        loginStore.removeEventListener(Constants.LOGIN_STATUS_CHANGED, this.loginStatusChange.bind(this));
    }


    render() {
        if (this.state.loggedIn) {
            //console.log('logged in');
            return (
                <div className='app'>
                    <Main />
                </div>
            );
        }
        else {
            //console.log('not logged in');
            return (
                <div className='app'>
                    <Login />
                </div>
            );
        }
    }

}