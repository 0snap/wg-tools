jest.unmock('../../../src/components/expenses/ExpensesItem.jsx');


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ExpensesItem from '../../../src/components/expenses/ExpensesItem.jsx';


describe('ExpensesItem', () => {

    const expItemData = { id: 123, color: '#ff', name: 'foo', amount: 23.42 };
    const defaultText = 'foo 23.42€✖';
    const deleteText = 'Löschen?NeinJa';
    let expItem;
    let itemNode;

    beforeEach(function() {
        expItem = TestUtils.renderIntoDocument(
            <ExpensesItem item={expItemData} listId={'123456'} />
        );
        itemNode = ReactDOM.findDOMNode(expItem);
        expect(itemNode).toBeDefined();
    });


    it('renders correct content', () => {
        
        expect(itemNode.textContent).toEqual(defaultText);
        expect(expItem.state.alive).toEqual(true);

    });

    it('becomes inactive after click on delete x-button', () => {
        
        TestUtils.Simulate.click(
            TestUtils.findRenderedDOMComponentWithTag(expItem, 'button')
        );

        expect(itemNode.textContent).toEqual(deleteText);
        expect(expItem.state.alive).toEqual(false);

    });

    it('becomes active again with click on "no"', () => {
        
        TestUtils.Simulate.click(
            TestUtils.findRenderedDOMComponentWithTag(expItem, 'button')
        );
        let yesNoButtons = TestUtils.scryRenderedDOMComponentsWithTag(expItem, 'button')

        TestUtils.Simulate.click(
            yesNoButtons[0]
        );

        expect(itemNode.textContent).toEqual(defaultText);
        expect(expItem.state.alive).toEqual(true);
    });

    it('get deleted with click on "yes"', () => {
        
        TestUtils.Simulate.click(
            TestUtils.findRenderedDOMComponentWithTag(expItem, 'button')
        );
        let yesNoButtons = TestUtils.scryRenderedDOMComponentsWithTag(expItem, 'button')

        TestUtils.Simulate.click(
            yesNoButtons[1]
        );
        
        ExpensesItem.prototype.doDelete = jest.genMockFunction();

        expect(itemNode.textContent).toEqual(defaultText);
        expect(expItem.state.alive).toEqual(true);
    });
});