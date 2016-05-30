import React, { Component } from 'react';
import { connect } from 'react-redux'

import AppHeader from '../components/header/AppHeader.jsx';
import ExpensesContainer from '../components/expenses/ExpensesContainer.jsx';
import DeptContainer from '../components/depts/DeptContainer.jsx';

import Constants from '../constants/ExpenseConstants.jsx';

import { fetchDepts } from '../actions/DeptsActionCreators.jsx';
import { setActiveList, storeList, deleteList, lockList, fetchExpensesLists } from '../actions/ExpensesListActionCreators.jsx';
import { storeExpense, deleteExpense, fetchExpenses } from '../actions/ExpensePostActionCreators.jsx';


import './App.scss';

export default class App extends Component {
	
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// init the app by fetching all relevant stuff
		const { fetchExpensesLists } = this.props;
		fetchExpensesLists();
	}

	componentWillReceiveProps(nextProps) {
		this.guaranteeActiveList(nextProps);
		this.reactOnActiveListChange(nextProps);
		this.reactOnExpensePostsChange(nextProps);
	}

	guaranteeActiveList(nextProps) {
		const { activeList, expensesLists, setActiveList } = nextProps
		if ((!activeList || !activeList.id) && expensesLists[0]) {
			setActiveList(expensesLists[0].id);
		}
	}

	reactOnActiveListChange(nextProps) {
		const newActiveList = nextProps.activeList
		if (this.props.activeList != newActiveList && newActiveList.id) {
			// new active list - refetch everything
			const { fetchDepts, fetchExpenses } = this.props
			fetchExpenses(newActiveList.id);
		}
	}

	reactOnExpensePostsChange(nextProps) {
		const { expensePosts, fetchDepts } = this.props;
		const newExpensePosts = nextProps.expensePosts;
		if (expensePosts.length != newExpensePosts.length) {
			fetchDepts(nextProps.activeList.id);
		}
	}



	render() {
		return (
			<div className='app'>
				<AppHeader activeList={this.props.activeList} isLoggedIn={true} />
				<ExpensesContainer 
					expenses={this.props.expensePosts} 
					expensesLists={this.props.expensesLists} 
					activeList={this.props.activeList}
					setActiveList={this.props.setActiveList}
					storeExpense={this.props.storeExpense}
					deleteExpense={this.props.deleteExpense}
					storeList={this.props.storeList}
					lockList={this.props.lockList}
					deleteList={this.props.deleteList} />
				<DeptContainer deptList={this.props.depts} activeList={this.props.activeList} />
			</div>
		);
	}
}


App.propTypes = {
	expensePosts: React.PropTypes.array.isRequired,
	expensesLists: React.PropTypes.array.isRequired,
	activeList: React.PropTypes.object,
	depts: React.PropTypes.array.isRequired,
	fetchExpensesLists: React.PropTypes.func.isRequired,
	fetchExpenses: React.PropTypes.func.isRequired,
	fetchDepts: React.PropTypes.func.isRequired,
	storeExpense: React.PropTypes.func.isRequired,
	deleteExpense: React.PropTypes.func.isRequired,
	setActiveList: React.PropTypes.func.isRequired,
	storeList: React.PropTypes.func.isRequired,
	deleteList: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	let expensePosts = []
	for (var key in state.expensePosts.expensePosts) {
		expensePosts.push(state.expensePosts.expensePosts[key]);
	}
	return { 
		expensePosts: expensePosts,
		expensesLists: state.expensesLists.expensesLists,
		activeList: state.expensesLists.activeList,
		depts: state.depts.depts,
	};
}


export default connect(mapStateToProps, {
	fetchExpensesLists,
	fetchDepts,
	fetchExpenses,
	storeList,
	setActiveList,
	deleteList,
	lockList,
	storeExpense,
	deleteExpense,
})(App)