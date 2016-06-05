import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppHeader from '../components/header/AppHeader.jsx';
import FAQPage from '../components/staticPages/FAQPage.jsx';
import Constants from '../constants/ExpenseConstants.jsx';

import { logout } from '../actions/LoginRegisterActionCreators.jsx';

export default class FAQ extends Component {

	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div className='staticPage'>
				<AppHeader activeList={this.props.activeList} logoutCallback={this.props.logout} />
				<FAQPage />
			</div>
		);
	}
}

FAQ.propTypes = {
	logout: React.PropTypes.func.isRequired,
	activeList: React.PropTypes.object
}

function mapStateToProps(state) {
	return {
		activeList: state.expensesLists.activeList,
	}
}


export default connect(mapStateToProps, { logout } )(FAQ)