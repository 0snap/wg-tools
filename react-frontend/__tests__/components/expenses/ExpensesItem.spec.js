jest.unmock('../../../src/components/expenses/ExpensesItem.jsx');


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ExpensesItem from '../../../src/components/expenses/ExpensesItem.jsx';

const expensesItem = require('../../../src/components/expenses/ExpensesItem.jsx')


describe('ExpensesItem', () => {

    const expItemData = { id: 123, color: '#ff', name: 'foo', amount: 23.42 };
    const defaultText = 'foo 23.42€✖';
    const deleteText = 'Löschen?NeinJa';

    it('renders correct content', () => {
        const expItem = TestUtils.renderIntoDocument(
            <ExpensesItem item={expItemData} listId={'123456'} />
        );
        const itemNode = ReactDOM.findDOMNode(expItem);
        expect(itemNode.textContent).toEqual(defaultText);
    });

    it('becomes inactive after click on delete x-button', () => {
        const expItem = TestUtils.renderIntoDocument(
            <ExpensesItem item={expItemData} listId={'123456'} />
        );
        const itemNode = ReactDOM.findDOMNode(expItem);
        TestUtils.Simulate.click(
            TestUtils.findRenderedDOMComponentWithTag(expItem, 'button')
        );
        expect(itemNode.textContent).toEqual(deleteText);
    });

    it('becomes active again with click on "no"', () => {
        const expItem = TestUtils.renderIntoDocument(
            <ExpensesItem item={expItemData} listId={'123456'} />
        );
        const itemNode = ReactDOM.findDOMNode(expItem);
        
        TestUtils.Simulate.click(
            TestUtils.findRenderedDOMComponentWithTag(expItem, 'button')
        );
        let yesNoButtons = TestUtils.scryRenderedDOMComponentsWithTag(expItem, 'button')

        TestUtils.Simulate.click(
            yesNoButtons[0]
        );
        expect(itemNode.textContent).toEqual(defaultText);
    });

    it('get deleted with click on "yes"', () => {
        const expItem = TestUtils.renderIntoDocument(
            <ExpensesItem item={expItemData} listId={'123456'} />
        );
        
        TestUtils.Simulate.click(
            TestUtils.findRenderedDOMComponentWithTag(expItem, 'button')
        );
        let yesNoButtons = TestUtils.scryRenderedDOMComponentsWithTag(expItem, 'button')

        TestUtils.Simulate.click(
            yesNoButtons[1]
        );
        
        let itemNode = ReactDOM.findDOMNode(expItem);
        expect(itemNode.textContent).toEqual(defaultText);
        // TODO mock call / use callback in item.
    });
});