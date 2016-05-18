import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router'

import App from './src/components/App.jsx';
import Login from './src/components/Login.jsx';
import Register from './src/components/Register.jsx';
import About from './src/components/staticPages/About.jsx';
import FAQ from './src/components/staticPages/FAQ.jsx';
import Constants from './src/constants/LoginConstants.jsx';


let loginRegisterActions = require('./src/actions/LoginRegisterActions.jsx');
let loginStore = require('./src/stores/LoginStore.jsx');


function getLoginStatus() {
    return loginStore.isLoggedIn();
}

function checkAuthCookie(nextState, replace) {

    loginRegisterActions.tryLoginByCookie();
    if (!getLoginStatus()) {
        replace(
            {   
                pathname:'/login',
                state: { nextPathname: '/app' } 
            });
    }
}

function checkAlreadyLoggedIn(nextState, replace) {

    loginRegisterActions.tryLoginByCookie();
}

function redirectWhenLoggedIn(nextState, replace) {
    
    checkAlreadyLoggedIn();

    if (getLoginStatus()) {
        replace(
            {   
                pathname:'/app',
                state: { nextPathname: '/login' } 
            });
    }        
}

render((
    <Router history={browserHistory}>
        <Route path="/app(/)(:activeListName)" component={App} onEnter={checkAuthCookie} />
        <Route path="/login(/)" component={Login} onEnter={redirectWhenLoggedIn} />
        <Route path='/register(/)' component={Register} onEnter={redirectWhenLoggedIn} />
        <Redirect from='/' to='/app' />
        <Route path="/about(/)" component={About} onEnter={checkAlreadyLoggedIn} />
        <Route path="/faq(/)" component={FAQ} onEnter={checkAlreadyLoggedIn} />
    </Router>
), document.getElementById('content'));