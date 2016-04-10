import React, { Component } from 'react';
import Main from './Main.jsx';
import Login from './Login.jsx';
import cookie from 'react-cookie';
import Constants from '../constants/LoginConstants.jsx';
import { browserHistory } from 'react-router';

import './App.scss';


var loginStore = require('../stores/LoginStore.jsx');
var loginRegisterActions = require('../actions/LoginRegisterActions.jsx');



export default class App extends Component {
    
    constructor(props) {
        super(props);
        this.checkAuthCookie();
        this.state = { loggedIn: this.getLoginStatus() };
    }

    componentDidMount() {
        loginStore.addEventListener(Constants.LOGIN_STATUS_CHANGED, this.loginStatusChange.bind(this));
        
        // use URL queryparam, if existent
        if(this.state.loggedIn && this.props.params.activeList) {
            // TODO: set active list to lsits
        }
    }

    loginStatusChange() {
        //console.log(this.getLoginStatus());
        let loggedIn = this.getLoginStatus();
        if (loggedIn) {
            cookie.save(Constants.WG_TOOLS_AUTH, this.getLoginToken(), {'path': '/', 'maxAge': 30*24*3600});
            browserHistory.push('/')
        }
        else {
            cookie.remove(Constants.WG_TOOLS_AUTH, {'path': '/'});
        }
        this.setState( {'loggedIn': loggedIn } );
    }

    checkAuthCookie() {
        let token = cookie.load(Constants.WG_TOOLS_AUTH);
        if (token && !this.getLoginStatus()) {
            //console.log('token found, logging in');
            loginRegisterActions.storeToken(token);
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