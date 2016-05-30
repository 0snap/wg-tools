import React, { Component } from 'react';
import ConfirmBox from './ConfirmBox.jsx';


import './ExpensesHeaderEntry.scss'


export default class ExpensesListSelector extends Component {

    constructor(props) {
        super(props);
        //console.log('selected list ', this.props.selected);
    }

    handleSelect(event) {
        console.log('select ', event.target.value);
        this.props.setActiveList(event.target.value);
    }

    doDeleteList() {
        // console.log('perform delete');
        this.props.deleteList(this.props.selected.id);
    }

    doLockList() {
        //console.log('perform lock');
        this.props.lockList(this.props.selected.id);
    }

    render() {
        let _this = this;
        if(this.props.expensesLists.length === 0) {
            return (
                <div className="expensesListSelector"> 
                <h3>Liste auswählen</h3>
                    <select className="form__select">
                        <option>Bitte neue Liste anlegen</option>
                    </select>
                </div>
            );
        }
        let selected = this.props.selected ? this.props.selected.id : '';
        let editable = this.props.selected ? this.props.selected.editable : false;
        return(
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
                        confirmCallback={this.doLockList.bind(this)} /> : <span>(Liste gesperrt)</span>}
                </div>
            </div>
        );
    }

}

ExpensesListSelector.propTypes = {
    expensesLists: React.PropTypes.array.isRequired,
    selected: React.PropTypes.object,
    setActiveList: React.PropTypes.func.isRequired,
    deleteList: React.PropTypes.func.isRequired,
    lockList: React.PropTypes.func.isRequired
}