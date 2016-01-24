import React, { Component } from 'react'
import DeptList from './DeptList.jsx'
import './DeptContainer.scss'


var expensesStore = require('../stores/ExpensesStore.jsx');


export default class DeptContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { deptList: expensesStore.getDepts() };
    }

    componentDidMount() {
        expensesStore.addChangeListener(this.handleStoreChange.bind(this));
    }

    componentWillUnmount() {
        expensesStore.removeChangeListener(this.handleStoreChange.bind(this));
    }

    handleStoreChange() {
        this.setState({ deptList: expensesStore.getDepts() });
    }

    render() {
        return(
            <div className="deptContainer">
                <DeptList deptList={this.state.deptList}/>
            </div>
        );
    }

}