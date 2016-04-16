jest.unmock('../../../src/components/login/LoginForm.jsx');


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import LoginForm from '../../../src/components/login/LoginForm.jsx';

let actions = require('../../../src/actions/LoginRegisterActions.jsx')


describe('LoginForm', () => {

    const loginForm = TestUtils.renderIntoDocument( <LoginForm /> );
    
    actions.login = jest.genMockFunction();


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

        expect(actions.login).toBeCalledWith('USER', 'SECRET');
        expect(loginForm.state.wgName).toEqual('');
        expect(loginForm.state.password).toEqual('');
    });
});