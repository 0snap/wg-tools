import React, { Component } from 'react'
import { connect } from 'react-redux';

import DeptList from '../components/depts/DeptList.jsx'
import DispensesForm from '../components/depts/DispensesForm.jsx'

import Constants from '../constants/ExpenseConstants.jsx';

import { fetchDepts } from '../actions/DeptsActionCreators.jsx';
import { setDispenses } from '../actions/ExpensesListActionCreators.jsx';


export default class DeptContainer extends Component {

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		const newActiveList = nextProps.activeList
		const newExpensePosts = nextProps.expensePosts;
		const { activeList, expensePosts, fetchDepts } = this.props;
		//console.log(activeList != newActiveList)
		//console.log(expensePosts.length != newExpensePosts.length)
		if ((activeList != newActiveList || expensePosts.length != newExpensePosts.length)
			&& newActiveList.id ) {
				
			fetchDepts(newActiveList.id);
		}
	}

	render() {

		const { activeList, setDispenses, deptList } = this.props;
		return(
			<div className="container-fluid">
				<div className="container__header">
					<h1>Schulden</h1>
					<DispensesForm activeList={activeList} setDispenses={setDispenses} />

				</div>
				<DeptList deptList={deptList}/>
			</div>
		);
	}
}

DeptContainer.propTypes = {
	expensePosts: React.PropTypes.array.isRequired,
	deptList: React.PropTypes.array.isRequired,
	activeList: React.PropTypes.object,
	setDispenses: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	let expensePosts = []
	for (var key in state.expensePosts.expensePosts) {
		expensePosts.push(state.expensePosts.expensePosts[key]);
	}
	return { 
		expensePosts: expensePosts,
		activeList: state.expensesLists.activeList,
		deptList: state.depts.depts,
	};
}


export default connect(mapStateToProps, {
	fetchDepts,
	setDispenses
})(DeptContainer)