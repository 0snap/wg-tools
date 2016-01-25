import React, { Component } from 'react'
import DeptList from './DeptList.jsx'
import './DeptContainer.scss'


var expensesStore = require('../../stores/ExpensesStore.jsx');


export default class DeptContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { deptList: expensesStore.getDepts() };
    }

    componentDidMount() {
        expensesStore.addEventListener('dept', this.handleStoreChange.bind(this));
    }

    componentWillUnmount() {
        expensesStore.removeEventListener('dept', this.handleStoreChange.bind(this));
    }

    handleStoreChange() {
        this.setState({ deptList: expensesStore.getDepts() });
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