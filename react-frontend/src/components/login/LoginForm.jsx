import React, { Component } from 'react';
import './LoginRegisterForm.scss';
import { Link } from 'react-router'

var loginRegisterActions = require('../../actions/LoginRegisterActions.jsx');


export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wgName: '',
            password: '',
            error: undefined
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({error: nextProps.error});
    }

    login(event) {
        event.preventDefault();
        loginRegisterActions.login(this.state.wgName, this.state.password);
        this.setState({wgName: ''});
        this.setState({password: ''});
    }

    nameChange(event) {
        this.setState({wgName: event.target.value});
    }

    passwordChange(event) {
        this.setState({password: event.target.value});
    }

    render() {
        let errMsg;
        if (this.state.error == true) {
            errMsg = <span className="loginRegisterForm__error">WG-Name oder Passwort falsch</span>
        }

        return (
            <div className='container-fluid'>
                <div className='loginRegisterForm'>
                    <h1>Einloggen</h1>
                    <form onSubmit={this.login.bind(this)}>
                        <div className="form-group">
                            <label className="loginRegisterForm__label" htmlFor="name">WG-Name</label>
                            <input className="loginRegisterForm__input" id="name" value={this.state.wgName} onChange={this.nameChange.bind(this)} />
                        </div>

                        <div className="form-group">
                            <label className="loginRegisterForm__label" htmlFor="password">Passwort</label>
                            <input className="loginRegisterForm__input" id="password" type="password" value={this.state.password} onChange={this.passwordChange.bind(this)} />
                        </div>
                        <div className="form-group">
                            <label className="loginRegisterForm__label" htmlFor="submit">Einloggen</label>
                            <button className="loginRegisterForm__button" id="submit" type="submit">Go!</button>
                        </div>
                        {errMsg}
                    </form>
                    <div className="loginRegisterForm__register">
                        <Link to="/register">neu registrieren</Link>
                    </div>
                </div>
            </div>
        );
    }
}


LoginForm.propTypes = {
    error: React.PropTypes.bool
}