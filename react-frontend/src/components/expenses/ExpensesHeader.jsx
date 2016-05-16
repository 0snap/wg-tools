import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import ExpensesListSelector from './ExpensesListSelector.jsx';
import ExpensesListCreateForm from './ExpensesListCreateForm.jsx';
import EditForm from './EditForm.jsx';

import './ExpensesHeader.scss';

var expensesActions = require('../../actions/ExpensesActions.jsx');


const CSS_NOT_VISIBLE = 'mobile-not-visible';

export default class ExpensesHeader extends Component {

    constructor(props) {
        super(props);
        this.state = { flyoutContent: -1 };
    }

    refreshMenu() {
        this.menu = <div className='container__header__flyout'>
            <div className={this.isVisibleCss(0) + ' container__header__flyoutEntry'}>
                <ExpensesListCreateForm />
            </div>
            <div className={this.isVisibleCss(1)+ ' container__header__flyoutEntry'}>
                <ExpensesListSelector expensesLists={this.props.expensesLists} selected={this.props.selected} />
             </div>
            <div className={this.isVisibleCss(2)+ ' container__header__flyoutEntry'}>
                <EditForm activeList={this.props.selected} submitCallback={this.addExpense.bind(this)} />
            </div>
        </div>;
    }

    addExpense(name, amount, comment) {
        expensesActions.storeExpense(name, amount, comment, this.props.selected.id);
    }

    isVisibleCss(id) {
        return id == this.state.flyoutContent? '' : CSS_NOT_VISIBLE;
    }

    getFlyoutContent() {
        if ( !this.state.flyoutContent ) {
            return undefined;
        }
        return this.menu;
    }

    setFlyoutContent(event) {
        let clickedId = event.target.id;
        if (this.state.flyoutContent == clickedId) {
            this.setState( { flyoutContent: undefined } );
        }
        else {
            this.setState( { flyoutContent: event.target.id } );
        }
    }

    render() {
        this.refreshMenu();
        return(
            <div className="container__header expensesHeader">
                <h1>Ausgaben</h1>
                <ul className='container__header__navigation'>
                    <li className='container__header__navigationEntry'>
                        <a id={0} onClick={this.setFlyoutContent.bind(this)}>
                            Liste <i className='fa fa-plus-circle' aria-hidden='true'/>
                        </a>
                    </li>
                    <li className='container__header__navigationEntry'>
                        <a id={1} onClick={this.setFlyoutContent.bind(this)}>
                            Liste <i className='fa fa-sort-amount-asc' aria-hidden='true'/>
                        </a>
                    </li>
                    <li className='container__header__navigationEntry'>
                        <a id={2} onClick={this.setFlyoutContent.bind(this)}>
                            Eintrag <i className='fa fa-plus-circle' aria-hidden='true'/>
                        </a>
                    </li>
                </ul>
                {this.getFlyoutContent()}
            </div>
        );
    }

}

ExpensesHeader.propTypes = {
    expensesLists: React.PropTypes.array.isRequired,
    selected: React.PropTypes.object
}