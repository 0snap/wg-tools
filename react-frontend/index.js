import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import App from './src/components/App.jsx';
import Login from './src/components/Login.jsx';
import Register from './src/components/Register.jsx';
import Constants from './src/constants/LoginConstants.jsx';


var loginRegisterActions = require('./src/actions/LoginRegisterActions.jsx');
var loginStore = require('./src/stores/LoginStore.jsx');


function getLoginStatus() {
    return loginStore.isLoggedIn();
}

function checkAuthCookie(nextState, replace) {

    loginRegisterActions.tryLoginByCookie();
    if (!getLoginStatus()) {
        replace(
            {   
                pathname:'/login',
                state: { nextPathname: '/' } 
            });
    }
}

function checkAlreadyLoggedIn(nextState, replace) {

    loginRegisterActions.tryLoginByCookie();
    if (getLoginStatus()) {
        replace(
            {   
                pathname:'/',
                state: { nextPathname: '/login' } 
            });
    }         
}

render((
    <Router history={browserHistory}>
        <Route path="/" component={App} onEnter={checkAuthCookie} />
        <Route path="/login" component={Login} onEnter={checkAlreadyLoggedIn} />
        <Route path='/register' component={Register} onEnter={checkAlreadyLoggedIn} />
    </Router>
), document.getElementById('content'));