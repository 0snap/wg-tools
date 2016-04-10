import React, { Component } from 'react';

import RegisterForm from './login/RegisterForm.jsx';


export default class Register extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='register'>
                <RegisterForm />
            </div>);
    }
}