import React, { Component } from 'react'
import DeptList from './DeptList.jsx'
import './DeptContainer.scss'


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
        expensesStore.addEventListener('depts', this.handleStoreChange.bind(this));
        expensesStore.addEventListener('activeList', this.handleListSelect.bind(this));
    }


    componentWillUnmount() {
        expensesStore.removeEventListener('depts', this.handleStoreChange.bind(this));
        expensesStore.removeEventListener('activeList', this.handleListSelect.bind(this));
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
            <div className="deptContainer">
                <h1>Schulden</h1>
                <DeptList deptList={this.state.deptList}/>
            </div>
        );
    }

}