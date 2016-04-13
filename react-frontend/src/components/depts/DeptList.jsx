import React, { Component } from 'react';
import DeptItem from './DeptItem.jsx';

import './DeptList.scss'

export default class DeptList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let depts = this.props.deptList;
        // console.log(depts);
        if(Object.keys(depts).length === 0) {
            return (<div className='container__nocontent'><h3>Keine Schulden</h3></div>);
        }
        
        let _this = this;
        return (
            <div>
                <ul className='deptItemList'>
                {depts.map(item => {
                    return <DeptItem borrower={item.borrower} amount={item.amount} sponsor={item.sponsor} />
                })}
                </ul>
            </div>);
    }
}

DeptList.propTypes = {
    deptList: React.PropTypes.array.isRequired
}
