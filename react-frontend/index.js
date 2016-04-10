import React from 'react';
import { render } from 'react-dom';
import App from './src/components/App.jsx';
import Login from './src/components/Login.jsx';
import Register from './src/components/Register.jsx';

import { Router, Route, browserHistory } from 'react-router'


render((
    <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path='/register' component={Register} />
    </Router>
), document.getElementById('content'));