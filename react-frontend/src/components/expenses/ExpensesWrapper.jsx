import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import ExpensesList from './ExpensesList.jsx';
import ExpensesGraph from './ExpensesGraph.jsx';


import { deleteExpense, fetchExpenses } from '../../actions/ExpensePostActionCreators.jsx';


export class ExpensesWrapper extends Component {

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		const newActiveList = nextProps.activeList;
		const { activeList, fetchExpenses } = this.props;

		const oldListName = activeList? activeList.name : undefined;
		const newListName = newActiveList? newActiveList.name : undefined;

		if ( oldListName != newListName ) {
			fetchExpenses(newListName);
		}
	}

	render() {
		const { activeList, expensePosts, deleteExpense } = this.props;

		return(
			<div className="container-fluid">
				<ExpensesList expenses={expensePosts} activeList={activeList} deleteExpense={deleteExpense} />
				<ExpensesGraph expenses={expensePosts} />
			</div>
		);
	}

}

ExpensesWrapper.propTypes = {
	expensePosts: React.PropTypes.array.isRequired,
	activeList: React.PropTypes.object,
	deleteExpense: React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
	let expensePosts = []
	for (var key in state.expensePosts.expensePosts) {
		expensePosts.push(state.expensePosts.expensePosts[key]);
	}
	return { 
		expensePosts: expensePosts,
		activeList: state.expensesLists.activeList,
	};
}


export default connect(mapStateToProps, {
	deleteExpense,
	fetchExpenses
})(ExpensesWrapper)