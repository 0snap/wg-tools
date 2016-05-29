import React, { Component } from 'react';
import AppHeader from '../components/header/AppHeader.jsx';
import FAQPage from '../components/staticPages/FAQPage.jsx';
import Constants from '../constants/ExpenseConstants.jsx';

var expensesStore = require('../stores/ExpensesStore.jsx');
var loginStore = require('../stores/LoginStore.jsx');
var expensesActions = require('../actions/ExpensesActions.jsx');

export default class FAQ extends Component {

	constructor(props) {
		super(props);
		this.state = {
			activeList: expensesStore.getActiveList()
		}
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

	render() {
		return (
			<div className='staticPage'>
				<AppHeader activeList={this.state.activeList} isLoggedIn={loginStore.isLoggedIn()}/>
				<FAQPage />
			</div>
		);
	}
}