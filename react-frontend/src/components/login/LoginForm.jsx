import React, { Component } from 'react';
import './LoginForm.scss';

var loginStore = require('../../stores/LoginStore.jsx');
var loginActions = require('../../actions/LoginActions.jsx');



export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wgName: '',
            password: ''
        };
    }

    login(event) {
        event.preventDefault();
        loginActions.login(this.state.wgName, this.state.password);
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

        return (
            <div className='loginForm'>
                <h1>Einloggen</h1>
                <form onSubmit={this.login.bind(this)}>
                    <div className="form-group">
                        <label className="loginForm__label" htmlFor="name">WG-Name</label>
                        <input className="loginForm__input" id="name" value={this.state.wgName} onChange={this.nameChange.bind(this)} />
                    </div>

                    <div className="form-group">
                        <label className="loginForm__label" htmlFor="password">Passwort</label>
                        <input className="loginForm__input" id="password" type="password" value={this.state.password} onChange={this.passwordChange.bind(this)} />
                    </div>

                    <div className="form-group">
                        <label className="loginForm__label" htmlFor="submit">Einloggen</label>
                        <button className="loginForm__button" id="submit" type="submit">Go!</button>
                    </div>
                </form>
                <div className="loginForm__register">
                    <a href='#'>neu registrieren</a>
                </div>
            </div>

        );
    }
}
