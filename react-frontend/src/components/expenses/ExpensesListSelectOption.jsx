import React, { Component } from 'react';
var expensesActions = require('../../actions/ExpensesActions.jsx');

//import './ExpensesListSelectOption.scss'


export default class ExpensesListSelectOption extends Component {

    constructor(props) {
        super(props);
    }

    handleSelect(event) {
        //console.log(event.target.value);
        expensesActions.setActiveList(event.target.value);
    }

    render() {
        return (
            <option value={this.props.list.id} onClick={this.handleSelect}>
                {this.props.list.name}
            </option>
        );
    }

}

ExpensesListSelectOption.propTypes = {
    list: React.PropTypes.object.isRequired
}