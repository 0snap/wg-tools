import React, { Component } from 'react'

export default class DeptGraph extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='deptGraph'>
                <h2>Graph</h2>
            </div>);
    }
}

DeptGraph.propTypes = {
    deptList: React.PropTypes.array.isRequired
}
