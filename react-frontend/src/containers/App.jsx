import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import AppHeader from '../components/header/AppHeader.jsx';
import ExpensesContainer from './ExpensesContainer.jsx';
import DeptContainer from './DeptContainer.jsx';

import Constants from '../constants/ExpenseConstants.jsx';


import { logout } from '../actions/LoginRegisterActionCreators.jsx';
import { setActiveList, fetchExpensesLists } from '../actions/ExpensesListActionCreators.jsx';


import './App.scss';

export default class App extends Component {
	
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// init the app by fetching the expenses lists.
		// using the lists, the app will build its state.
		this.props.fetchExpensesLists();
	}

	componentWillReceiveProps(nextProps) {
		this.guaranteeActiveList(nextProps);
		this.handleExpensesListsChange(nextProps);
	}

	guaranteeActiveList(nextProps) {
		const { activeList, expensesLists, setActiveList } = nextProps
		if ((!activeList || !activeList.id) && expensesLists[0] && expensesLists[0].id) {
			setActiveList(expensesLists[0].id);
		}
	}

	handleExpensesListsChange(nextProps) {
		const { expensesLists, setActiveList } = this.props;
		const newExpLists = nextProps.expensesLists;
		if(expensesLists.length != newExpLists.length && newExpLists[0]) {
			setActiveList(newExpLists[0].id);
		}
	}


	render() {
		return (
			<div className='app'>
				<AppHeader activeList={this.props.activeList} logoutCallback={this.props.logout} />
				<ExpensesContainer />
				<DeptContainer />
			</div>
		);
	}
}


App.propTypes = {
	activeList: React.PropTypes.object,
	setActiveList: React.PropTypes.func.isRequired,
	expensesLists: React.PropTypes.array.isRequired,
	fetchExpensesLists: React.PropTypes.func.isRequired,
	logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	let expensePosts = []
	for (var key in state.expensePosts.expensePosts) {
		expensePosts.push(state.expensePosts.expensePosts[key]);
	}
	return { 
		expensesLists: state.expensesLists.expensesLists,
		activeList: state.expensesLists.activeList,
	};
}


export default connect(mapStateToProps, {
	fetchExpensesLists,
	setActiveList,
	logout
})(App)