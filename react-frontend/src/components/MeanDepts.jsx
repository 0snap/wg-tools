import React, { Component } from 'react';
var expensesStore = require('../stores/ExpensesStore.jsx');

import './MeanDepts.scss'

export default class MeanDepts extends Component {

    constructor(props) {
        super(props);
        this.state = { meanDepts: expensesStore.getMeans() };
    }

    componentDidMount() {
        expensesStore.addChangeListener(this.handleStoreChange.bind(this));
    }

    componentWillUnmount() {
        expensesStore.removeChangeListener(this.handleStoreChange.bind(this));
    }

    handleStoreChange() {
        this.setState({ meanDepts: expensesStore.getMeans() });
    }

    render() {
        let means = this.state.meanDepts;
        console.log(means);
        
        
        let _this = this;
        return (
            <div className='meansDiv'>
                <h2>Schulden</h2>
                {means}
            </div>);
    }
}
