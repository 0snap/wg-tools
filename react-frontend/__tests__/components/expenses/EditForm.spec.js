import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import EditForm from '../../../src/components/expenses/EditForm.jsx';

describe('EditForm', () => {

    const noContent = 'Keine Liste ausgewählt';
    const uneditableContent = 'Die ausgewählte Liste ist nicht mehr bearbeitbar';
    const activeList = { id: 'LIST ID', name: 'LIST NAME', editable: true };

    let editForm;
    const submitCallback = jest.genMockFunction(); 

    beforeEach(function() {
        editForm = TestUtils.renderIntoDocument( <EditForm activeList={activeList} submitCallback={submitCallback}/> );
    });


    it('should render no content if no active list is defined', () => {
        editForm = TestUtils.renderIntoDocument( <EditForm activeList={undefined} submitCallback={submitCallback} /> );
        let headline = TestUtils.findRenderedDOMComponentWithTag(editForm, 'h3');
        expect(headline.textContent).toEqual(noContent);
    });

    it('should render text content if list is not editable', () => {
        let activeList = { id: 'LIST ID', name: 'LIST NAME', editable: false };
        editForm = TestUtils.renderIntoDocument( <EditForm activeList={activeList} submitCallback={submitCallback} /> );
        let headline = TestUtils.findRenderedDOMComponentWithTag(editForm, 'h3');
        expect(headline.textContent).toEqual(uneditableContent);
    });

    it('should change state on input', () => {
        
        let inputs = TestUtils.scryRenderedDOMComponentsWithTag(editForm, 'input');
        
        TestUtils.Simulate.change( inputs[0], {target: {value: 'NEW' }} );
        expect(editForm.state.name).toEqual('NEW');

        TestUtils.Simulate.change( inputs[1], {target: {value: 15 }} );
        expect(editForm.state.amount).toEqual(15);

        TestUtils.Simulate.change( inputs[2], {target: {value: 'COMMENT' }} );
        expect(editForm.state.comment).toEqual('COMMENT');
    });


    it('should call submit on form-submit without comment', () => {

        let inputs = TestUtils.scryRenderedDOMComponentsWithTag(editForm, 'input');
        
        TestUtils.Simulate.change( inputs[0], {target: {value: 'SUPER' }} );
        TestUtils.Simulate.change( inputs[1], {target: {value: 100 }} );
        
        let form = TestUtils.findRenderedDOMComponentWithTag(editForm, 'form');
        TestUtils.Simulate.submit( form );

        expect(submitCallback).toBeCalledWith('SUPER', 100, '');
        expect(editForm.state.name).toEqual('');
        expect(editForm.state.amount).toEqual(0);
        expect(editForm.state.comment).toEqual('');
    });

    it('should call submit on form-submit with comment', () => {

        let inputs = TestUtils.scryRenderedDOMComponentsWithTag(editForm, 'input');
        
        TestUtils.Simulate.change( inputs[0], {target: {value: 'SUPER' }} );
        TestUtils.Simulate.change( inputs[1], {target: {value: 100 }} );
        TestUtils.Simulate.change( inputs[2], {target: {value: 'COMMENT' }} );
        
        let form = TestUtils.findRenderedDOMComponentWithTag(editForm, 'form');
        TestUtils.Simulate.submit( form );

        expect(submitCallback).toBeCalledWith('SUPER', 100, 'COMMENT');
        expect(editForm.state.name).toEqual('');
        expect(editForm.state.amount).toEqual(0);
        expect(editForm.state.comment).toEqual('');
    });
});