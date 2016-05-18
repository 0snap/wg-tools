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
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleActiveListChange = this.handleActiveListChange.bind(this);
    }

    componentDidMount() {
        expensesStore.addEventListener(Constants.FETCH_DEPTS, this.handleStoreChange);
        expensesStore.addEventListener(Constants.ACTIVE_LIST_CHANGED, this.handleActiveListChange);
    }


    componentWillUnmount() {
        expensesStore.removeEventListener(Constants.FETCH_DEPTS, this.handleStoreChange);
        expensesStore.removeEventListener(Constants.ACTIVE_LIST_CHANGED, this.handleActiveListChange);
    }

    handleStoreChange() {
        //console.log('depts', expensesStore.getDepts())
        this.setState({ deptList: expensesStore.getDepts() });
    }

    handleActiveListChange() {
        let activeList = expensesStore.getActiveList();
        //console.log('active', activeList),
        if (activeList) {
            expensesActions.fetchDepts(activeList.id);
        }
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