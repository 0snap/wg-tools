import React, { Component } from 'react';
import AppHeader from '../components/header/AppHeader.jsx';
import ExpensesContainer from '../components/expenses/ExpensesContainer.jsx';
import DeptContainer from '../components/depts/DeptContainer.jsx';

import Constants from '../constants/ExpenseConstants.jsx';

import './App.scss';

var expensesStore = require('../stores/ExpensesStore.jsx');
var expensesActions = require('../actions/ExpensesActions.jsx');

export default class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			expenses: expensesStore.getAllExpenses(),
			expensesLists: expensesStore.getExpensesLists(),
			deptList: expensesStore.getDepts(),
			activeList: expensesStore.getActiveList()
		}
		this.handleDeptsChange = this.handleDeptsChange.bind(this);
		this.handleActiveListChange = this.handleActiveListChange.bind(this);
		this.handleExpensesListsChange = this.handleExpensesListsChange.bind(this);
		this.handleExpensesChange = this.handleExpensesChange.bind(this);
		this.handleActiveListChange = this.handleActiveListChange.bind(this);
	}

	componentDidMount() {
		expensesStore.addEventListener(Constants.FETCH_DEPTS, this.handleDeptsChange);
		expensesStore.addEventListener(Constants.ACTIVE_LIST_CHANGED, this.handleActiveListChange);
		expensesStore.addEventListener(Constants.EXPENSE_POSTS_CHANGED, this.handleExpensesChange);
		expensesStore.addEventListener(Constants.EXPENSES_LISTS_CHANGED, this.handleExpensesListsChange);

		// init store by calling actions:
		expensesActions.fetchExpensesLists( () => 
			expensesActions.setActiveListByName(this.props.params.activeListName)
		);
	}

	componentWillUnmount() {
		expensesStore.removeEventListener(Constants.FETCH_DEPTS, this.handleDeptsChange);
		expensesStore.removeEventListener(Constants.ACTIVE_LIST_CHANGED, this.handleActiveListChange);
		expensesStore.removeEventListener(Constants.EXPENSE_POSTS_CHANGED, this.handleExpensesChange);
		expensesStore.removeEventListener(Constants.EXPENSES_LISTS_CHANGED, this.handleExpensesListsChange);
	}

	handleDeptsChange() {
		this.setState({ deptList: expensesStore.getDepts() });
	}

	handleExpensesChange() {
		this.setState({ expenses: expensesStore.getAllExpenses() });
	}

	handleExpensesListsChange() {
		this.setState({ expensesLists: expensesStore.getExpensesLists() });
	}

	handleActiveListChange() {
		let activeList = expensesStore.getActiveList();
		let listId = activeList? activeList.id : undefined;
		expensesActions.fetchDepts(listId);
		expensesActions.fetchExpenses(listId);
		this.setState({ activeList: activeList });
	}


	render() {
		// console.log(this.props.params.activeListName);
		return (
			<div className='app'>
				<AppHeader />
				<ExpensesContainer expenses={this.state.expenses} expensesLists={this.state.expensesLists} activeList={this.state.activeList} />
				<DeptContainer deptList={this.state.deptList} activeList={this.state.activeList} />
			</div>
		);
	}
}