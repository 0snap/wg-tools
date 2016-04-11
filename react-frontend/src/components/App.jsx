import React, { Component } from 'react';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Constants from '../constants/LoginConstants.jsx';

import './App.scss';


export default class App extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='app'>
                <Main />
            </div>
        );
    }

}