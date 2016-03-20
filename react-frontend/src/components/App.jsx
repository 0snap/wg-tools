import React, { Component } from 'react';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Constants from '../constants/LoginConstants.jsx';
import './App.scss';


var loginStore = require('../stores/LoginStore.jsx');


export default class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {loggedIn: this.getLoginStatus()};
    }

    componentDidMount() {
        loginStore.addEventListener(Constants.LOGIN_STATUS_CHANGED, this.loginStatusChange.bind(this));
    }

    loginStatusChange() {
        console.log(this.getLoginStatus());
        this.setState( {'loggedIn': this.getLoginStatus()} );
    }
    
    getLoginStatus() {
        return loginStore.isLoggedIn();
    }

    componentWillUnmount() {
        loginStore.removeEventListener(Constants.LOGIN_STATUS_CHANGED, this.loginStatusChange.bind(this));
    }


    render() {
        if (this.state.loggedIn) {
            console.log('logged in');
            return (
                <div className='app'>
                    <Main wg={loginStore.getWgName()}/>
                </div>
            );
        }
        else {
            console.log('not logged in');
            return (
                <div className='app'>
                    <Login />
                </div>
            );
        }
    }

}