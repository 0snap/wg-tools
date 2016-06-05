jest.unmock('../../../src/components/expenses/ExpensesListCreateForm.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import ExpensesListCreateForm from '../../../src/components/expenses/ExpensesListCreateForm.jsx';


describe('ExpensesListCreateForm', () => {

	const headlineText = 'Liste anlegen';

	const storeList = jest.genMockFunction(); 

	const createForm = TestUtils.renderIntoDocument( <ExpensesListCreateForm storeList={storeList} /> );



	it('should render headline and form', () => {

		let headline = TestUtils.findRenderedDOMComponentWithTag(createForm, 'h3');
		expect(headline.textContent).toEqual(headlineText);

		let form = TestUtils.findRenderedDOMComponentWithTag(createForm, 'form');
		expect(form).toBeDefined();
	});

	it('should change state on input', () => {
		
		let input = TestUtils.findRenderedDOMComponentWithTag(createForm, 'input');
		TestUtils.Simulate.change( input, {target: {value: 'NEW' }} );
		
		expect(createForm.state.name).toEqual('NEW');
	});


	it('should call submit on form-submit', () => {

		let input = TestUtils.findRenderedDOMComponentWithTag(createForm, 'input');
		TestUtils.Simulate.change( input, {target: {value: 'SOMETHING' }} );
		
		let form = TestUtils.findRenderedDOMComponentWithTag(createForm, 'form');
		TestUtils.Simulate.submit( form );

		expect(storeList).toBeCalledWith('SOMETHING');
		expect(createForm.state.name).toEqual('');
	});
});