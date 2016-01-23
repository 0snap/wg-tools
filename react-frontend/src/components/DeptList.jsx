import React, { Component } from 'react';
import DeptItem from './DeptItem.jsx';
var expensesStore = require('../stores/ExpensesStore.jsx');

import './DeptList.scss'

export default class DeptList extends Component {

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
        let depts = this.state.deptList;
        console.log(depts);
        
        
        let _this = this;
        return (
            <div className='deptsDiv'>
                <h2>Schulden</h2>
                <ul className='deptItemList'>
                {depts.map(item => {
                    return <DeptItem borrower={item[0]} amount={item[1]} sponsor={item[2]} />
                })}
                </ul>
            </div>);
    }
}
