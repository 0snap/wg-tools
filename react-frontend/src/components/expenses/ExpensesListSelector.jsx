import React, { Component } from 'react';
import ExpensesListSelectOption from './ExpensesListSelectOption.jsx';

import './ExpensesListSelector.scss'


export default class ExpensesListSelector extends Component {

    constructor(props) {
        super(props);
        this.state = { show: false };
        //console.log('selected list ', this.props.selected);
    }

    render() {
        let _this = this;
        if(this.props.expensesLists.length === 0) {
            return (
                <div className="expensesListSelector"> 
                <h3>Liste auswählen</h3>
                    <select className="expensesListSelector__select">
                        <option>Bitte neue Liste anlegen</option>
                    </select>
                </div>
            );
        }
        return(
            <div className="expensesListSelector"> 
            <h3>Liste auswählen</h3>
                <select className="expensesListSelector__select" value={this.props.selected} >
                    {this.props.expensesLists.map((list) => {
                        return <ExpensesListSelectOption key={list.id} list={list} />
                    })}
                </select> 
            </div>
        );
    }

}

ExpensesListSelector.propTypes = {
    expensesLists: React.PropTypes.array.isRequired,
    selected: React.PropTypes.string.isRequired
}