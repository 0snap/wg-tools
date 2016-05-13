import React, { Component } from 'react';

var expensesAction = require('../../actions/ExpensesActions.jsx');
var expensesStore = require('../../stores/ExpensesStore.jsx');
import Constants from '../../constants/ExpenseConstants.jsx';


export default class EditContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeList: undefined,
            editable: true
        };
    }

    componentDidMount() {
        expensesStore.addEventListener(Constants.ACTIVE_LIST_CHANGED, this.handleListSelect.bind(this));
    }

    componentWillUnmount() {
        expensesStore.removeEventListener(Constants.ACTIVE_LIST_CHANGED, this.handleListSelect.bind(this));
    }

    handleListSelect() {
        this.setState({ activeList: expensesStore.getActiveList() });
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="container__header">
                    <h1>Eintrag anlegen</h1>
                </div>
            </div>
        );
    }
}
