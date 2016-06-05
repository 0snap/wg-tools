jest.unmock('../../../src/components/expenses/ExpensesList.jsx');


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ExpensesList from '../../../src/components/expenses/ExpensesList.jsx';



describe('ExpensesList', () => {

    const noContentText = 'Keine Ausgaben';
    const expenses = [
        {id: '1', name: 'n1'},
        {id: '2', name: 'n2'}
    ];
    const activeList = { id: 'LIST ID', name: 'LIST NAME', editable: true };
    const deleteExpense = jest.genMockFunction();


    it('should render noContentText if expenses are empty', () => {
        let expList = TestUtils.renderIntoDocument(
            <ExpensesList activeList={activeList} expenses={[]} deleteExpense={deleteExpense} />
        );
        let expListNode = ReactDOM.findDOMNode(expList);
        expect(expListNode).toBeDefined();

        let headline = TestUtils.findRenderedDOMComponentWithTag(expList, 'h3');
        expect(headline.textContent).toEqual(noContentText);
    });

    it('should render expenses if expenses are not empty', () => {
        let expList = TestUtils.renderIntoDocument(
            <ExpensesList activeList={activeList} expenses={expenses} deleteExpense={deleteExpense}/>
        );
        let expListNode = ReactDOM.findDOMNode(expList);
        expect(expListNode).toBeDefined();

        let list = TestUtils.findRenderedDOMComponentWithClass(expList, 'expensesItemList');
        expect(list).toBeDefined();
    });
    
});