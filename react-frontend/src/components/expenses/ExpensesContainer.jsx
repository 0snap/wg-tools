import React, { Component } from 'react';
import ExpensesList from './ExpensesList.jsx';
import ExpensesGraph from './ExpensesGraph.jsx';
import ExpensesHeader from './ExpensesHeader.jsx';
import ExpensesListSelector from './ExpensesListSelector.jsx';
import ExpensesListCreateForm from './ExpensesListCreateForm.jsx';
import EditForm from './EditForm.jsx';
import Constants from '../../constants/ExpenseConstants.jsx';

export default class ExpensesContainer extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		//console.log("rendering container " + this.state.activeList, this.state.expensesLists);
		return(
			<div className="container-fluid">
				<ExpensesHeader
					expensesLists={this.props.expensesLists}
					selected={this.props.activeList}
					storeList={this.props.storeList}
					setActiveList={this.props.setActiveList}
					deleteList={this.props.deleteList}
					lockList={this.props.lockList}
					storeExpense={this.props.storeExpense} />
				<ExpensesList expenses={this.props.expenses} activeList={this.props.activeList} />
				<ExpensesGraph expenses={this.props.expenses} />
			</div>
		);
	}

}

ExpensesContainer.propTypes = {
	expenses: React.PropTypes.array.isRequired,
	expensesLists: React.PropTypes.array.isRequired,
	activeList: React.PropTypes.object,
	storeList: React.PropTypes.func.isRequired,
	setActiveList: React.PropTypes.func.isRequired,
	deleteList: React.PropTypes.func.isRequired,
	lockList: React.PropTypes.func.isRequired,
	storeExpense: React.PropTypes.func.isRequired,
	deleteExpense: React.PropTypes.func.isRequired,
}