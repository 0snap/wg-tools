import React, { Component } from 'react'
import DeptList from './DeptList.jsx'
import DispensesForm from './DispensesForm.jsx'

import Constants from '../../constants/ExpenseConstants.jsx';

var expensesStore = require('../../stores/ExpensesStore.jsx');
var expensesActions = require('../../actions/ExpensesActions.jsx');

export default class DeptContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deptList: expensesStore.getDepts()
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
        if (activeList) {
            expensesActions.fetchDepts(activeList.id);
        }
        else {
            // no active list, so there cannot be depts
            this.setState( { deptList: undefined } );
        }
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="container__header">
                    <h1>Schulden</h1>
                    <DispensesForm activeList={expensesStore.getActiveList()} />

                </div>
                <DeptList deptList={this.state.deptList}/>
            </div>
        );
    }
}