import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import LoginForm from '../../../src/components/login/LoginForm.jsx';


describe('LoginForm', () => {

	const login = jest.genMockFunction();
    
	const loginForm = TestUtils.renderIntoDocument( <LoginForm loginCallback={login}/> );


	it('should render', () => {
		let loginFormNode = ReactDOM.findDOMNode(loginForm);
		expect(loginFormNode).toBeDefined();
       
		let link = TestUtils.findRenderedDOMComponentWithTag(loginForm, 'a');
		expect(link.textContent).toEqual('neu registrieren');
	});

	it('should change state on input', () => {
        
		let inputs = TestUtils.scryRenderedDOMComponentsWithTag(loginForm, 'input');
        
		TestUtils.Simulate.change( inputs[0], {target: {value: 'USER' }} );
		expect(loginForm.state.wgName).toEqual('USER');

		TestUtils.Simulate.change( inputs[1], {target: {value: 'PASS' }} );
		expect(loginForm.state.password).toEqual('PASS');
	});

	it('should call action on form-submit', () => {

		let inputs = TestUtils.scryRenderedDOMComponentsWithTag(loginForm, 'input');
        
		TestUtils.Simulate.change( inputs[0], {target: {value: 'USER' }} );
		TestUtils.Simulate.change( inputs[1], {target: {value: 'SECRET' }} );
        
		let form = TestUtils.findRenderedDOMComponentWithTag(loginForm, 'form');
		TestUtils.Simulate.submit( form );

		expect(login).toBeCalledWith('USER', 'SECRET');
		expect(loginForm.state.wgName).toEqual('');
		expect(loginForm.state.password).toEqual('');
	});

	it('should display error text on error', () => {

		loginForm.setState({error: true});
		let errorMsg = TestUtils.findRenderedDOMComponentWithClass(loginForm, 'loginRegisterForm__error');
		expect(errorMsg).toBeDefined();

		loginForm.setState({error: false});
		errorMsg = TestUtils.scryRenderedDOMComponentsWithClass(loginForm, 'loginRegisterForm__error');
		expect(errorMsg.length).toEqual(0);

	});
});