import React, { Component } from 'react'
import DeptList from './DeptList.jsx'

import Constants from '../../constants/ExpenseConstants.jsx';

var expensesStore = require('../../stores/ExpensesStore.jsx');
var expensesActions = require('../../actions/ExpensesActions.jsx');

export default class DeptContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deptList: expensesStore.getDepts(),
            activeList: ''
        };
    }

    componentDidMount() {
        expensesStore.addEventListener(Constants.FETCH_DEPTS, this.handleStoreChange.bind(this));
        expensesStore.addEventListener(Constants.ACTIVE_LIST_CHANGED, this.handleListSelect.bind(this));
    }


    componentWillUnmount() {
        expensesStore.removeEventListener(Constants.FETCH_DEPTS, this.handleStoreChange.bind(this));
        expensesStore.removeEventListener(Constants.ACTIVE_LIST_CHANGED, this.handleListSelect.bind(this));
    }

    handleStoreChange() {
        this.setState({ deptList: expensesStore.getDepts() });
    }

    handleListSelect() {
        let activeList = expensesStore.getActiveList();
        expensesActions.fetchDepts(activeList);
        this.setState({ activeList: activeList });
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="container__header">
                    <h1>Schulden</h1>
                </div>
                <DeptList deptList={this.state.deptList}/>
            </div>
        );
    }
}