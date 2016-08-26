import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setActiveList } from '../actions/ExpensesListActionCreators.jsx';

import ExpensesWrapper from '../components/expenses/ExpensesWrapper.jsx';
import DeptWrapper from '../components/depts/DeptWrapper.jsx';

export class ExpensesContainer extends Component {


	componentDidMount() {
		const { setActiveList, activeListName } = this.props;
		// initially mark listName active (from URL)
		setActiveList(activeListName);
	}

	componentWillReceiveProps(nextProps) {
		const { setActiveList, activeListName } = this.props;

		if (nextProps.activeListName !== activeListName) {
			// URL changed, mark this list as active 
			setActiveList(nextProps.activeListName);
		}
	}


	render() {
		return (
			<div>
				<ExpensesWrapper />
				<DeptWrapper />
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		activeListName: ownProps.params.activeListName
	};
}

ExpensesContainer.propTypes = {
	activeListName: React.PropTypes.string.isRequired
}

export default connect(mapStateToProps, {
	setActiveList
})(ExpensesContainer)