import React, { Component } from 'react';
import DeptPostForm from './DeptPostForm.jsx'
import DeptList from './DeptList.jsx'
import './MainFrame.scss'

export default class MainFrame extends Component {

    render() {
        return (
            <div>
            <h1> WG-Tools </h1>
            <div className="deptWrapper">
                <DeptPostForm />
                <DeptList />
            </div>
            </div>
        );
    }
}