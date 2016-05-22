import React, { Component } from 'react';

import RegisterForm from './RegisterForm.jsx';
import Constants from '../../constants/LoginConstants.jsx';

import AppHeader from '../header/AppHeader.jsx';

import './LoginRegister.scss';

var loginStore = require('../../stores/LoginStore.jsx');

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: undefined
        };
        this.handleRegisterFail = this.handleRegisterFail.bind(this);
    }

    componentDidMount() {
        loginStore.addEventListener(Constants.REGISTER_FAILED, this.handleRegisterFail);
    }

    componentWillUnmount() {
        loginStore.removeEventListener(Constants.REGISTER_FAILED, this.handleRegisterFail);
    }

    handleRegisterFail() {
        this.setState({error: 'conflict'});
    }

    render() {
        return (
            <div className='register'>
                <AppHeader />
                <RegisterForm error={this.state.error}/>
            </div>);
    }
}