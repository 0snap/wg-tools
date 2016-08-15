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
		const { activeList, activeListName, expensesLists, setActiveList, setActiveListError } = nextProps;
		const oldActiveList = this.props.activeList;
		const oldExpensesLists = this.props.expensesLists;

		if (activeListName && activeList.name != activeListName && !setActiveListError) {
			// listname by url
			setActiveList(activeListName, true);
		}
		else if((expensesLists.length != oldExpensesLists.length || setActiveListError) && expensesLists[0]) {
			// delete / add exp list or initial load without name
			setActiveList(expensesLists[0].name);
		}
		else if(setActiveListError) {
			// invalid entry in url or all lists deleted
			setActiveList('');
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

function mapStateToProps(state, ownProps) {
	let expensePosts = []
	for (var key in state.expensePosts.expensePosts) {
		expensePosts.push(state.expensePosts.expensePosts[key]);
	}
	return { 
		expensesLists: state.expensesLists.expensesLists,
		activeList: state.expensesLists.activeList,
		activeListName: ownProps.params.activeListName,
		setActiveListError: state.expensesLists.setActiveListError
	};
}


export default connect(mapStateToProps, {
	fetchExpensesLists,
	setActiveList,
	logout
})(App)