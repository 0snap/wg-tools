import React, { Component } from 'react';
import Constants from '../../constants/ExpenseConstants.jsx';

import './DispensesForm.scss';

var expensesActions = require('../../actions/ExpensesActions.jsx');

const DISPENSES_INFO = 'Hier kannst du eintragen, ob irgendjemand zu den laufenden Ausgaben etwas dazugegeben hat. Zum Beispiel tut ein Kumpel zu den alltäglichen Einkäufen 5€ in eure WG-Kasse. Dies wird dann mit den Schulden verrechnet.';
const LIST_UNEDITABLE = '(Liste gesperrt)';

export default class DispensesForm extends Component {

    constructor(props) {
        super(props);
        let amount = this.props.activeList? this.props.activeList.dispenses : 0;
        this.state = { amount: amount };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.activeList) {
            this.setState({ amount: nextProps.activeList.dispenses });
        }
    }

    setDispenses(event) {
        event.preventDefault();
        let amount = parseFloat(this.state.amount);
        if (amount >= 0) {
            expensesActions.setDispenses(this.props.activeList.id, amount);
        }
    }

    decrease() {
        this.setState({amount: parseFloat(this.state.amount) - 1});
    }

    increase() {
        this.setState({amount: parseFloat(this.state.amount) + 1});
    }

    amountChange(event) {
        this.setState({amount: event.target.value});
    }

    render() {
        if ( !this.props.activeList) {
            return null;
        }
        else if (!this.props.activeList.editable) {
            return (
                <div className='dispensesForm'>
                    <span className='dispensesForm__info'>Spenden <i className='fa fa-info-circle' title={DISPENSES_INFO}/></span>
                    <span className='dispensesForm__space' />
                    {this.state.amount}€
                    <span className='dispensesForm__space' />
                    <span className='dispensesForm__info'>{LIST_UNEDITABLE}</span>
                </div>);
        }
        return (
            <div className='dispensesForm'>
                <form onSubmit={this.setDispenses.bind(this)}>
                    <div className='form-group'>
                        <span className='dispensesForm__info'>Spenden <i className='fa fa-info-circle' title={DISPENSES_INFO}/></span>
                        <span className='dispensesForm__space' />
                        <button className='dispensesForm__arrow' type='button' onClick={this.decrease.bind(this)}>&lsaquo;</button>
                        <input className='dispensesForm__dispensesInput' id='amount' type='number' step='0.01' min='0' value={this.state.amount} onChange={this.amountChange.bind(this)} />€
                        <button className='dispensesForm__arrow' type='button' onClick={this.increase.bind(this)}>&rsaquo;</button>
                        <span className='dispensesForm__space' />
                        <button className='dispensesForm__submit' type='submit'>Speichern</button>
                    </div>
                </form>
            </div>
        );
    }
}

DispensesForm.propTypes = {
    activeList: React.PropTypes.object
}
