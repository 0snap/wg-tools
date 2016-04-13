jest.unmock('../../../src/components/edit/EditForm.jsx');


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import EditForm from '../../../src/components/edit/EditForm.jsx';

let expensesActions = require('../../../src/actions/ExpensesActions.jsx')


describe('EditForm', () => {

    const noContent = 'Keine Liste ausgewählt';
    const activeList = 'LIST ID';

    let editForm;
    const submitCallback = jest.genMockFunction(); 

    beforeEach(function() {
        editForm = TestUtils.renderIntoDocument( <EditForm activeList={activeList} submitCallback={submitCallback}/> );
    });


    it('should render no content if no active list is undefined', () => {
        editForm = TestUtils.renderIntoDocument( <EditForm activeList={undefined} submitCallback={submitCallback} /> );
        let headline = TestUtils.findRenderedDOMComponentWithTag(editForm, 'h3');
        expect(headline.textContent).toEqual(noContent);
    });

    it('should change state on input', () => {
        
        let inputs = TestUtils.scryRenderedDOMComponentsWithTag(editForm, 'input');
        
        TestUtils.Simulate.change( inputs[0], {target: {value: 'NEW' }} );
        expect(editForm.state.name).toEqual('NEW');

        TestUtils.Simulate.change( inputs[1], {target: {value: 15 }} );
        expect(editForm.state.amount).toEqual(15);
    });


    it('should call submit on form-submit', () => {

        let inputs = TestUtils.scryRenderedDOMComponentsWithTag(editForm, 'input');
        
        TestUtils.Simulate.change( inputs[0], {target: {value: 'SUPER' }} );
        TestUtils.Simulate.change( inputs[1], {target: {value: 100 }} );
        
        let form = TestUtils.findRenderedDOMComponentWithTag(editForm, 'form');
        TestUtils.Simulate.submit( form );

        expect(submitCallback).toBeCalledWith('SUPER', 100);
        expect(editForm.state.name).toEqual('');
        expect(editForm.state.amount).toEqual(0);
    });
});