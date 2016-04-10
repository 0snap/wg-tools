import React, { Component } from 'react';
import './LoginRegisterForm.scss';

var loginRegisterActions = require('../../actions/LoginRegisterActions.jsx');



export default class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wgName: '',
            password: '',
            passwordConfirm: ''
        };
    }

    register(event) {
        event.preventDefault();
        if (this.state.password && this.state.password == this.state.passwordConfirm) {
            loginRegisterActions.register(this.state.wgName, this.state.password);
            this.setState({wgName: ''});
            this.setState({password: ''});
            this.setState({passwordConfirm: ''});
        }
    }

    nameChange(event) {
        this.setState({wgName: event.target.value});
    }

    passwordChange(event) {
        this.setState({password: event.target.value});
    }

    passwordConfirmChange(event) {
        this.setState({passwordConfirm: event.target.value});
    }

    render() {
        return (
            <div className='loginRegisterForm'>
                <h1>Registrieren</h1>
                <p>
                    Bei wg-tools kannst du dich einfach registrieren, wenn der Name noch nicht vergeben ist. Merk dir das Passwort und teile es mit deinen Mitbewohnern (klebt es z.B. an den Kühlschrank).
                    Alle WG-Bewohner dürfen alle Funktionen nutzen. 
                </p>
                <form onSubmit={this.register.bind(this)}>
                    <div className="form-group">
                        <label className="loginRegisterForm__label" htmlFor="name">WG-Name</label>
                        <input className="loginRegisterForm__input" id="name" value={this.state.wgName} onChange={this.nameChange.bind(this)} />
                    </div>

                    <div className="form-group">
                        <label className="loginRegisterForm__label" htmlFor="password">Passwort</label>
                        <input className="loginRegisterForm__input" id="password" type="password" value={this.state.password} onChange={this.passwordChange.bind(this)} />
                    </div>

                    <div className="form-group">
                        <label className="loginRegisterForm__label" htmlFor="passwordConfirm">Passwort wdh.</label>
                        <input className="loginRegisterForm__input" id="passwordConfirm" type="password" value={this.state.passwordConfirm} onChange={this.passwordConfirmChange.bind(this)} />
                    </div>

                    <div className="form-group">
                        <label className="loginRegisterForm__label" htmlFor="submit">Registrieren</label>
                        <button className="loginRegisterForm__button" id="submit" type="submit">Go!</button>
                    </div>
                </form>
            </div>

        );
    }
}
