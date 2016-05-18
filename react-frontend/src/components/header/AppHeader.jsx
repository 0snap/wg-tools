import React, { Component } from 'react';
import Constants from '../../constants/ExpenseConstants.jsx';
import { Link } from 'react-router'

import './AppHeader.scss';

var loginRegisterActions = require('../../actions/LoginRegisterActions.jsx');
var loginStore = require('../../stores/LoginStore.jsx');
var expensesStore = require('../../stores/ExpensesStore.jsx');


export default class AppHeader extends Component {
    

    constructor(props) {
        super(props);
        this.state = { activeList: expensesStore.getActiveList() };

        this.handleActiveListChange = this.handleActiveListChange.bind(this);
    }

    componentDidMount() {
        expensesStore.addEventListener(Constants.ACTIVE_LIST_CHANGED, this.handleActiveListChange);
    }

    componentWillUnmount() {
        expensesStore.removeEventListener(Constants.ACTIVE_LIST_CHANGED, this.handleActiveListChange);
    }

    handleActiveListChange() {
        this.setState({ activeList: expensesStore.getActiveList() });
    }


    logout() {
        loginRegisterActions.logout();
    }

    getLoginLink() {
        if(loginStore.isLoggedIn()) {
            return <Link className='appHeader__loginLink' to='/login' onClick={this.logout.bind(this)}>
                    abmelden
                </Link>
        }
        else {
            return <Link className='appHeader__loginLink' to='/login' >
                    anmelden
                </Link>
        }
    }

    getActiveListLink() {
        if (this.state.activeList && loginStore.isLoggedIn()) {
            return <Link to={'/app/' + this.state.activeList.name}>
                    home
                </Link>
        }
        else if (loginStore.isLoggedIn()) {
            return <Link to={'/app'}>
                    home
                </Link>
        }
        return undefined;
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='appHeader'>
                    <Link to='/about'>
                        about
                    </Link>
                    <Link to='/faq'>
                        faq
                    </Link>
                    {this.getActiveListLink()}
                    {this.getLoginLink()}
                </div>
            </div>
        );
    }
}