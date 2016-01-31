import React, { Component } from 'react';
import ExpensesListSelectOption from './ExpensesListSelectOption.jsx';

import './ExpensesListSelector.scss'


export default class ExpensesListSelector extends Component {

    constructor(props) {
        super(props);
        this.state = { show: false };
        // console.log(this.props.expensesLists);
        console.log(this.props.selected);
    }
 handleKeyDown(event) {
        console.log("keydown");
        console.log(event);
    }
    render() {
        let _this = this;
        if(this.props.expensesLists.length === 0) {
            return (
                <select className="expensesListSelector__select">
                    <option>Bitte neue Liste anlegen</option>
                </select>
            );
        }
        return(
            <div className="expensesListSelector"> 
            <h3>Liste auswählen</h3>
                <select className="expensesListSelector__select" defaultValue={this.props.selected} onKeyDown={this.handleKeyDown}>
                    {this.props.expensesLists.map((list) => {
                        return <ExpensesListSelectOption list={list} />
                    })};
                </select> 
            </div>
        );
    }

}

ExpensesListSelector.propTypes = {
    expensesLists: React.PropTypes.array.isRequired,
    selected: React.PropTypes.string.isRequired
}