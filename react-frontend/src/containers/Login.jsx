import React, { Component } from 'react';

import LoginForm from '../components/login/LoginForm.jsx';
import Constants from '../constants/LoginConstants.jsx';

import AppHeader from '../components/header/AppHeader.jsx';

import './LoginRegister.scss';

var loginStore = require('../stores/LoginStore.jsx');


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: undefined
        };
        this.handleLoginFail = this.handleLoginFail.bind(this);
    }

    componentDidMount() {
        loginStore.addEventListener(Constants.LOGIN_FAILED, this.handleLoginFail);
    }

    componentWillUnmount() {
        loginStore.removeEventListener(Constants.LOGIN_FAILED, this.handleLoginFail);
    }

    handleLoginFail() {
        this.setState({error: true});
    }

    render() {
        return (
            <div className='login'>
                <AppHeader activeList={undefined} isLoggedIn={loginStore.isLoggedIn()} />
                <LoginForm error={this.state.error}/>
            </div>);
    }
}