import React, { Component } from 'react';
import { connect } from 'react-redux'

import RegisterForm from '../components/login/RegisterForm.jsx';
import Constants from '../constants/LoginConstants.jsx';
import AppHeader from '../components/header/AppHeader.jsx';

import './LoginRegister.scss';

import { register } from '../actions/LoginRegisterActionCreators.jsx';


export default class Register extends Component {

    constructor(props) {
        super(props);
        this.doRegister = this.doRegister.bind(this);
    }

    doRegister(wgName, password) {
        this.props.dispatch(register(wgName, password))
    }

    render() {
        let error = this.props.registerError? 'conflict' : undefined;
        return (
            <div className='register'>
                <AppHeader isLoggedIn={false} />
                <RegisterForm error={error} registerCallback={this.doRegister} />
            </div>
        );
    }
}

Register.propTypes = {
    registerError: React.PropTypes.bool.isRequired,
    dispatch: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return { 
        registerError: state.registerError
    };
}


export default connect(mapStateToProps)(Register)