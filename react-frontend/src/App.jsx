import React, { Component } from 'react';
import './App.scss';

import { EditForm } from './EditForm.jsx';
import { ExpensesList } from './ExpensesList.jsx';

export class App extends Component {

    render() {
        return (
            <div className='app'>
                <ExpensesList />
                <EditForm />
            </div>);
    }
}
