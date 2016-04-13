jest.unmock('../../../src/components/expenses/ExpensesListSelector.jsx');


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ExpensesListSelector from '../../../src/components/expenses/ExpensesListSelector.jsx';

let expensesActions = require('../../../src/actions/ExpensesActions.jsx')


describe('ExpensesListSelector', () => {

    const headlineText = 'Liste auswählen';
    const noContent = 'Bitte neue Liste anlegen';
    const expensesLists = [
        {id: '1', name: 'L 1'},
        {id: '2', name: 'L 2'}
    ];
    const selected = '1';

    let listSelector;

    beforeEach(function() {
        listSelector = TestUtils.renderIntoDocument( <ExpensesListSelector expensesLists={expensesLists} selected={selected} /> );
    });

    expensesActions.setActiveList = jest.genMockFunction();


    it('should render headline and noContent with empty expenses lists', () => {
        
        listSelector = TestUtils.renderIntoDocument( <ExpensesListSelector expensesLists={[]} selected={''} /> );
        
        let headline = TestUtils.findRenderedDOMComponentWithTag(listSelector, 'h3');
        expect(headline.textContent).toEqual(headlineText);

        let selectOption = TestUtils.findRenderedDOMComponentWithTag(listSelector, 'option');
        expect(selectOption.textContent).toEqual(noContent);
    });

    it('should render one option per expenses list', () => {
        
        let selectOptions = TestUtils.scryRenderedDOMComponentsWithTag(listSelector, 'option');
        expect(selectOptions.length).toEqual(2);
        expect(selectOptions[0].textContent).toEqual('L 1');
        expect(selectOptions[1].textContent).toEqual('L 2');
    });

    it('should call select-action on select', () => {
        
        let select = TestUtils.findRenderedDOMComponentWithTag(listSelector, 'select');

        TestUtils.Simulate.change( select, {target: {value: '2' }} );

        expect(expensesActions.setActiveList).toBeCalledWith('2');
    });

});