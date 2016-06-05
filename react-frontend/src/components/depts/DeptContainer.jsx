import React, { Component } from 'react'
import DeptList from './DeptList.jsx'
import DispensesForm from './DispensesForm.jsx'

import Constants from '../../constants/ExpenseConstants.jsx';

export default class DeptContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="container__header">
                    <h1>Schulden</h1>
                    <DispensesForm activeList={this.props.activeList} setDispenses={this.props.setDispenses} />

                </div>
                <DeptList deptList={this.props.deptList}/>
            </div>
        );
    }
}

DeptContainer.propTypes = {
    deptList: React.PropTypes.array.isRequired,
    activeList: React.PropTypes.object,
    setDispenses: React.PropTypes.func.isRequired
}