jest.unmock('../../../src/components/depts/DispensesForm.jsx');


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import DispensesForm from '../../../src/components/depts/DispensesForm.jsx';

describe('DispensesForm', () => {

    const activeList = { id: 'LIST ID', name: 'LIST NAME', editable: true, dispenses: 5 };
    const uneditableContent = '(Liste gesperrt)';
    let dispensesForm;
    const setDispenses = jest.genMockFunction();

    beforeEach(function() {
        dispensesForm = TestUtils.renderIntoDocument( <DispensesForm activeList={activeList} setDispenses={setDispenses} /> );
    });


    it('should not render if no active list is defined', () => {
        dispensesForm = TestUtils.renderIntoDocument( <DispensesForm activeList={undefined} setDispenses={setDispenses} /> );
        let formDiv = TestUtils.scryRenderedDOMComponentsWithClass(dispensesForm, 'dispensesForm');
        expect(formDiv.length).toEqual(0);
    });

    it('should render text content if list is not editable', () => {
        let activeList = { id: 'LIST ID', name: 'LIST NAME', editable: false };
        dispensesForm = TestUtils.renderIntoDocument( <DispensesForm activeList={activeList} setDispenses={setDispenses} /> );
        let infoFields = TestUtils.scryRenderedDOMComponentsWithClass(dispensesForm, 'dispensesForm__info');
        expect(infoFields[1].textContent).toEqual(uneditableContent);
    });

    it('should change state on input', () => {
        
        let inputs = TestUtils.scryRenderedDOMComponentsWithTag(dispensesForm, 'input');
        
        TestUtils.Simulate.change( inputs[0], {target: {value: 15 }} );
        expect(dispensesForm.state.amount).toEqual(15);
    });

    it('should change increase/decrease on click', () => {
        
        let buttons = TestUtils.scryRenderedDOMComponentsWithClass(dispensesForm, 'dispensesForm__arrow');
        
        TestUtils.Simulate.click( buttons[0] );
        expect(dispensesForm.state.amount).toEqual(4); // 5 - 1
        
        TestUtils.Simulate.click( buttons[1] );
        expect(dispensesForm.state.amount).toEqual(5); // 4 + 1
    });

    it('should submit form on click', () => {
        
        let form = TestUtils.findRenderedDOMComponentWithTag(dispensesForm, 'form');
        TestUtils.Simulate.submit( form );

        expect(setDispenses).toBeCalledWith('LIST NAME', 5);
    });
});