import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { fetchExpensesLists, storeList, deleteList, lockList } from '../actions/ExpensesListActionCreators.jsx';
import { storeExpense } from '../actions/ExpensePostActionCreators.jsx';

import ExpensesHeader from '../components/expenses/ExpensesHeader.jsx';

export class HomePage extends Component {

	/**
		HomePage container: all money related things are rooted here
		This container controls at least the ExpensesHeader and eventually renders children, if they
		exist (injected by router)
		This component controls the URL for route /home(/:listName)
	*/

	constructor(props) {
		super(props);
		this.handleListSelect = this.handleListSelect.bind(this);
		this.handleListCreate = this.handleListCreate.bind(this);
	}

	componentWillMount() {
		this.props.fetchExpensesLists();
	}

	componentWillReceiveProps(nextProps) {
		const { expensesLists, activeList }  = this.props;
		const newExpensesLists = nextProps.expensesLists;
		const newActiveList = nextProps.activeList;

		// URL invoked with no listname? try to find one
		if (newExpensesLists.length && !nextProps.children) {
			this.handleListSelect(newExpensesLists[0]);
		}
		// or list deleted? pick new value for URL
		else if (activeList && !newActiveList) {
			if(newExpensesLists.length) {
				// some list deleted
				this.handleListSelect(newExpensesLists[0]);
			}
			else {
				// last list was deleted, no more lists!
				browserHistory.push('/home');
			}

		}
	}

	handleListSelect(listName) {
		// trigger nested components render
		browserHistory.push(`/home/${listName}`);
	}

	handleListCreate(listName) {
		this.props.storeList(listName);	
		browserHistory.push(`/home/${listName}`);
	}

	render() {
		const {
			fetchExpensesLists,
			deleteList,
			lockList,
			storeExpense,
			activeList,
			expensesLists,
			children
		} = this.props;
		return (
			<div className='homepage'>
				<ExpensesHeader expensesLists={expensesLists} selected={activeList} 
					storeExpense={storeExpense} lockList={lockList} deleteList={deleteList}
					storeList={this.handleListCreate} setActiveList={this.handleListSelect} />
				{children}
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		activeList: state.expensesLists.activeList,
		expensesLists: state.expensesLists.expensesLists
	};
}

HomePage.propTypes = {
	activeList: React.PropTypes.object,
	children: React.PropTypes.node
}

export default connect(mapStateToProps, {
	fetchExpensesLists,
	storeList,
	deleteList,
	lockList,
	storeExpense
})(HomePage)