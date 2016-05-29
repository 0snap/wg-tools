import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import routes from './routes.js';

import './src/global.scss';

render((
    <Router history={browserHistory}>
        { routes }
    </Router>
), document.getElementById('content'));