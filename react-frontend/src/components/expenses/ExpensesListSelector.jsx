import React, { Component } from 'react';
import ConfirmBox from './ConfirmBox.jsx';

import './ExpensesListSelector.scss'

var expensesActions = require('../../actions/ExpensesActions.jsx');


export default class ExpensesListSelector extends Component {

    constructor(props) {
        super(props);
        //console.log('selected list ', this.props.selected);
    }

    handleSelect(event) {
        // console.log('select ', event.target.value);
        expensesActions.setActiveList(event.target.value);
    }

    doDeleteList() {
        // console.log('perform delete');
        expensesActions.deleteList(this.props.selected);
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
                <select className="expensesListSelector__select" onChange={this.handleSelect.bind(this)} value={this.props.selected} >
                    {this.props.expensesLists.map((list) => {
                        return <option key={list.id} value={list.id}>{list.name}</option>
                    })}
                </select>
                <ConfirmBox text={'diese Liste löschen'} abortText={'doch nicht'} confirmText={'ja, löschen'}
                    confirmCallback={this.doDeleteList.bind(this)} />
            </div>
        );
    }

}

ExpensesListSelector.propTypes = {
    expensesLists: React.PropTypes.array.isRequired,
    selected: React.PropTypes.string
}