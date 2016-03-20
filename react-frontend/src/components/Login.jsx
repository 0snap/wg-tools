import React, { Component } from 'react';

import LoginForm from './login/LoginForm.jsx';


export default class Login extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='login'>
                <LoginForm />
            </div>);
    }
}