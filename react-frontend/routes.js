import React, { Component } from  'react'
import { Route, Redirect } from 'react-router';

import App from './src/containers/App.jsx';
import Login from './src/containers/Login.jsx';
import Register from './src/containers/Register.jsx';
import About from './src/containers/About.jsx';
import FAQ from './src/containers/FAQ.jsx';
import Constants from './src/constants/LoginConstants.jsx';

import { isLoggedIn } from './src/services/LoginService.jsx';

function redirectToLoginWhenNotLoggedIn(nextState, replace) {

	if (!isLoggedIn()) {
		replace( {
			pathname:'/login',
			state: { nextPathname: '/app' } 
		});
	}
}


function redirectToAppWhenLoggedIn(nextState, replace) {

	if (isLoggedIn()) {
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
		<Route path="/about(/)" component={About} />
		<Route path="/faq(/)" component={FAQ} />
	</Route>
);