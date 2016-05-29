import React, { Component } from 'react';

import './LoginRegisterForm.scss';

var loginRegisterActions = require('../../actions/LoginRegisterActions.jsx');


const errMsgs = [];
errMsgs['conflict'] = <span className="loginRegisterForm__error">Dieser WG-Name existiert bereits</span>;
errMsgs['password'] = <span className="loginRegisterForm__error">Passwörter sind nicht identisch</span>;

export default class RegisterForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            wgName: '',
            password: '',
            passwordConfirm: '',
            error: this.props.error
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({error: nextProps.error});
    }

    register(event) {
        event.preventDefault();

        if (this.state.password && this.state.password == this.state.passwordConfirm) {
            this.props.registerCallback(this.state.wgName, this.state.password);
            this.setState({wgName: '', password: '', passwordConfirm: '', error: undefined})
        }
        else {
            this.setState({error: 'password'});
        }
    }

    nameChange(event) {
        this.setState({wgName: event.target.value, error: undefined});
    }

    passwordChange(event) {
        this.setState({password: event.target.value, error: undefined});
    }

    passwordConfirmChange(event) {
        this.setState({passwordConfirm: event.target.value, error: undefined});
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='loginRegisterForm'>
                    <h1>Registrieren</h1>
                    <p>
                        Bei wg-tools kannst du dich einfach registrieren, wenn der Name noch nicht vergeben ist. Merk dir das Passwort und teile es mit deinen Mitbewohnern (klebt es z.B. an den Kühlschrank).
                        Alle WG-Bewohner dürfen alle Funktionen nutzen. 
                    </p>
                    <hr />
                    <form onSubmit={this.register.bind(this)}>
                        <div className="form-group">
                            <label className="loginRegisterForm__label" htmlFor="name">WG-Name</label>
                            <input className="loginRegisterForm__input" id="name" value={this.state.wgName} onChange={this.nameChange.bind(this)} />
                        </div>
                        {this.state.error == 'conflict'? errMsgs['conflict'] : null}

                        <div className="form-group">
                            <label className="loginRegisterForm__label" htmlFor="password">Passwort</label>
                            <input className="loginRegisterForm__input" id="password" type="password" value={this.state.password} onChange={this.passwordChange.bind(this)} />
                        </div>

                        <div className="form-group">
                            <label className="loginRegisterForm__label" htmlFor="passwordConfirm">Passwort wdh.</label>
                            <input className="loginRegisterForm__input" id="passwordConfirm" type="password" value={this.state.passwordConfirm} onChange={this.passwordConfirmChange.bind(this)} />
                        </div>
                        {this.state.error == 'password'? errMsgs['password'] : null}

                        <div className="form-group">
                            <label className="loginRegisterForm__label" htmlFor="submit">Registrieren</label>
                            <button className="loginRegisterForm__button" id="submit" type="submit">Go!</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

RegisterForm.propTypes = {
    error: React.PropTypes.string,
    registerCallback: React.PropTypes.func.isRequired
}