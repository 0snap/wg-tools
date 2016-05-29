import React, { Component } from 'react';
import Constants from '../../constants/ExpenseConstants.jsx';
import { Link } from 'react-router'
import classNames from 'classnames';

import './AppHeader.scss';

var loginRegisterActions = require('../../actions/LoginRegisterActions.jsx');

export default class AppHeader extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            hamburgerExpanded: false
        };
    }


    logout() {
        loginRegisterActions.logout();
    }

    getLoginLink() {
        if(this.props.isLoggedIn) {
            return <Link className={this.getLinkClassnames(true)} to='/login' onClick={this.logout.bind(this)}>
                    abmelden
                </Link>
        }
        else {
            return <Link className={this.getLinkClassnames(true)} to='/login' onClick={this.toggleHamburger.bind(this)}>
                    anmelden
                </Link>
        }
    }

    toggleHamburger() {
        this.setState({ hamburgerExpanded: !this.state.hamburgerExpanded });
    }

    getLinkClassnames(isLoginLink) {
        return classNames( 
            'appHeader__menuLink', {
            'appHeader__loginLink': isLoginLink, 
            'is-active': this.state.hamburgerExpanded
        });
    }

    getActiveListLink() {
        if (this.props.activeList && this.props.isLoggedIn) {
            return <Link className={this.getLinkClassnames()} to={'/app/' + this.props.activeList.name} onClick={this.toggleHamburger.bind(this)}>
                    home
                </Link>
        }
        else if (this.props.isLoggedIn) {
            return <Link className={this.getLinkClassnames()} to={'/app'} onClick={this.toggleHamburger.bind(this)}>
                    home
                </Link>
        }
        return undefined;
    }

    render() {
        let hamburgerClassnames = classNames('hamburger hamburger--slider', {'is-active': this.state.hamburgerExpanded});
        let headerClassnames = classNames('appHeader', {'is-active': this.state.hamburgerExpanded});
        let wrapperClassnames = classNames({'mobile-not-visible': !this.state.hamburgerExpanded});
        return (
            <div className='container-fluid'>
                <div className={headerClassnames}>
                    <button className={hamburgerClassnames} type='button' onClick={this.toggleHamburger.bind(this)}>
                        <span className='hamburger-box'>
                            <span className='hamburger-inner'></span>
                        </span>
                    </button>
                    <div className={wrapperClassnames}>
                        <Link className={this.getLinkClassnames()} to='/about' onClick={this.toggleHamburger.bind(this)}>
                            about
                        </Link>
                        <Link className={this.getLinkClassnames()} to='/faq' onClick={this.toggleHamburger.bind(this)}>
                            faq
                        </Link>
                        {this.getActiveListLink()}
                        {this.getLoginLink()}
                    </div>
                </div>
            </div>
        );
    }
}


AppHeader.propTypes = {
    activeList: React.PropTypes.object,
    isLoggedIn: React.PropTypes.bool.isRequired
}