import React, { Component } from 'react'
import DeptList from './DeptList.jsx'

import './DeptContainer.scss'


export default class DeptContainer extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="deptContainer">
                <DeptList />
            </div>
        );
    }

}