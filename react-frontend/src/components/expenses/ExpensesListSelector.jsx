import React, { Component } from 'react';
import ConfirmBox from './ConfirmBox.jsx';
import MobileExpandable from './MobileExpandable.jsx';


import './ExpensesHeaderEntry.scss'

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
        expensesActions.deleteList(this.props.selected.id);
    }

    doLockList() {
        //console.log('perform lock');
        expensesActions.lockList(this.props.selected.id);
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
        let selected = this.props.selected ? this.props.selected.id : '';
        let editable = this.props.selected ? this.props.selected.editable : false;
        return(
            <MobileExpandable displayText='Select List'>
                <div className="expensesListSelector"> 
                    <h3>Liste auswählen</h3>
                    <select className="form__select" onChange={this.handleSelect.bind(this)} value={selected} >
                        {this.props.expensesLists.map((list) => {
                            return <option key={list.id} value={list.id}>{list.name}</option>
                        })}
                    </select>
                    <div>
                        <ConfirmBox text={'Liste löschen'} abortText={'doch nicht'} confirmText={'ja, löschen'}
                            confirmCallback={this.doDeleteList.bind(this)} />
                        {editable? <ConfirmBox text={'Liste sperren'} abortText={'doch nicht'} confirmText={'ja, sperren'}
                            confirmCallback={this.doLockList.bind(this)} /> : <span>(diese Liste ist gesperrt)</span>}
                    </div>
                </div>
            </MobileExpandable>
        );
    }

}

ExpensesListSelector.propTypes = {
    expensesLists: React.PropTypes.array.isRequired,
    selected: React.PropTypes.object
}