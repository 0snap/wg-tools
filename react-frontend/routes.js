import React from  'react';
import { Route, Redirect } from 'react-router';

import HomePage from './src/containers/HomePage.jsx';
import App from './src/containers/App.jsx';
import ExpensesContainer from './src/containers/ExpensesContainer.jsx';
import Login from './src/containers/Login.jsx';
import Register from './src/containers/Register.jsx';
import AboutPage from './src/components/staticPages/AboutPage.jsx';
import FAQPage from './src/components/staticPages/FAQPage.jsx';

import { isLoggedIn } from './src/services/LoginService.jsx';

function redirectToLoginWhenNotLoggedIn(nextState, replace) {

	if (!isLoggedIn()) {
		replace( {
			pathname:'/login',
			state: { nextPathname: '/home' } 
		});
	}
}


function redirectToAppWhenLoggedIn(nextState, replace) {

	if (isLoggedIn()) {
		replace( {   
			pathname:'/home',
			state: { nextPathname: '/login' }
		});
	}
}


export default (
	<Route>
		<Redirect from="/" to="/home" />
		<Route path="/" component={App}>
			<Route path="home(/)" component={HomePage} onEnter={redirectToLoginWhenNotLoggedIn}>
				<Route path=":activeListName" component={ExpensesContainer} />
			</Route>
			<Route path="login(/)" component={Login} onEnter={redirectToAppWhenLoggedIn} />
			<Route path='register(/)' component={Register} onEnter={redirectToAppWhenLoggedIn} />
			<Route path="about(/)" component={AboutPage} />
			<Route path="faq(/)" component={FAQPage} />
		</Route>
	</Route>
);