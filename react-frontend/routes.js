import React, { Component } from  'react'
import { Route, Redirect } from 'react-router';

import App from './src/containers/App.jsx';
import Login from './src/components/login/Login.jsx';
import Register from './src/components/login/Register.jsx';
import About from './src/components/staticPages/About.jsx';
import FAQ from './src/components/staticPages/FAQ.jsx';
import Constants from './src/constants/LoginConstants.jsx';


let loginRegisterActions = require('./src/actions/LoginRegisterActions.jsx');
let loginStore = require('./src/stores/LoginStore.jsx');


function getLoginStatus() {
	return loginStore.isLoggedIn();
}

function tryLoginByCookie(nextState, replace) {

	loginRegisterActions.tryLoginByCookie();
}

function redirectToLoginWhenNotLoggedIn(nextState, replace) {

	tryLoginByCookie();
	if (!getLoginStatus()) {
		replace( {
			pathname:'/login',
			state: { nextPathname: '/app' } 
		});
	}
}


function redirectToAppWhenLoggedIn(nextState, replace) {

	tryLoginByCookie();

	if (getLoginStatus()) {
		replace( {   
			pathname:'/app',
			state: { nextPathname: '/login' }
		});
	}
}


export default (
	<Route>
		<Redirect from='/' to='/app' />
		<Route path="/app(/)(:activeListName)" component={App} onEnter={redirectToLoginWhenNotLoggedIn} />
		<Route path="/login(/)" component={Login} onEnter={redirectToAppWhenLoggedIn} />
		<Route path='/register(/)' component={Register} onEnter={redirectToAppWhenLoggedIn} />
		<Route path="/about(/)" component={About} onEnter={tryLoginByCookie} />
		<Route path="/faq(/)" component={FAQ} onEnter={tryLoginByCookie} />
	</Route>
);