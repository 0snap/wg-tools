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
            activeList: undefined
        };
    }

    componentDidMount() {
        expensesStore.addEventListener(Constants.FETCH_DEPTS, this.handleStoreChange.bind(this));
        expensesStore.addEventListener(Constants.ACTIVE_LIST_CHANGED, this.handleActiveListChange.bind(this));
    }


    componentWillUnmount() {
        expensesStore.removeEventListener(Constants.FETCH_DEPTS, this.handleStoreChange.bind(this));
        expensesStore.removeEventListener(Constants.ACTIVE_LIST_CHANGED, this.handleActiveListChange.bind(this));
    }

    handleStoreChange() {
        //console.log('depts', expensesStore.getDepts())
        this.setState({ deptList: expensesStore.getDepts() });
    }

    handleActiveListChange() {
        let activeList = expensesStore.getActiveList();
        //console.log('active', activeList),
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