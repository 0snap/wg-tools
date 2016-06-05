import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExpensesList from '../components/expenses/ExpensesList.jsx';
import ExpensesGraph from '../components/expenses/ExpensesGraph.jsx';
import ExpensesHeader from '../components/expenses/ExpensesHeader.jsx';
import ExpensesListSelector from '../components/expenses/ExpensesListSelector.jsx';
import ExpensesListCreateForm from '../components/expenses/ExpensesListCreateForm.jsx';
import EditForm from '../components/expenses/EditForm.jsx';
import Constants from '../constants/ExpenseConstants.jsx';


import { setActiveList, storeList, deleteList, lockList } from '../actions/ExpensesListActionCreators.jsx';
import { storeExpense, deleteExpense, fetchExpenses } from '../actions/ExpensePostActionCreators.jsx';


export default class ExpensesContainer extends Component {

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		const newActiveList = nextProps.activeList;
		const { activeList, fetchExpenses } = this.props;
		if (activeList != newActiveList && newActiveList.id ) {
			fetchExpenses(newActiveList.id);
		}
	}

	render() {
		const { expensesLists, activeList, storeList, setActiveList, deleteList, lockList, storeExpense,
			expensePosts, deleteExpense } = this.props;
		//console.log("rendering container " + this.state.activeList, this.state.expensesLists);
		return(

			<div className="container-fluid">
				<ExpensesHeader expensesLists={expensesLists} selected={activeList} storeList={storeList}
					setActiveList={setActiveList} deleteList={deleteList} lockList={lockList} storeExpense={storeExpense} />
				<ExpensesList expenses={expensePosts} activeList={activeList} deleteExpense={deleteExpense} />
				<ExpensesGraph expenses={expensePosts} />
			</div>
		);
	}

}

ExpensesContainer.propTypes = {
	expensePosts: React.PropTypes.array.isRequired,
	expensesLists: React.PropTypes.array.isRequired,
	activeList: React.PropTypes.object,
	storeList: React.PropTypes.func.isRequired,
	setActiveList: React.PropTypes.func.isRequired,
	deleteList: React.PropTypes.func.isRequired,
	lockList: React.PropTypes.func.isRequired,
	storeExpense: React.PropTypes.func.isRequired,
	deleteExpense: React.PropTypes.func.isRequired,
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
	};
}


export default connect(mapStateToProps, {
	fetchExpenses,
	storeList,
	setActiveList,
	deleteList,
	lockList,
	storeExpense,
	deleteExpense
})(ExpensesContainer)