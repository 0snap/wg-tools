jest.unmock('../../../src/components/login/RegisterForm.jsx');


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import RegisterForm from '../../../src/components/login/RegisterForm.jsx';

let actions = require('../../../src/actions/LoginRegisterActions.jsx')


describe('RegisterForm', () => {

    let loginForm;
    actions.register = jest.genMockFunction();
    
    beforeEach(function() {
        loginForm = TestUtils.renderIntoDocument( <RegisterForm /> );
    });

    it('should render', () => {
        let loginFormNode = ReactDOM.findDOMNode(loginForm);
        expect(loginFormNode).toBeDefined();
    });

    it('should change state on input', () => {
        
        let inputs = TestUtils.scryRenderedDOMComponentsWithTag(loginForm, 'input');
        
        TestUtils.Simulate.change( inputs[0], {target: {value: 'NEW USER' }} );
        TestUtils.Simulate.change( inputs[1], {target: {value: 'PASS' }} );
        TestUtils.Simulate.change( inputs[2], {target: {value: 'PASS CONFIRM' }} );

        expect(loginForm.state.wgName).toEqual('NEW USER');
        expect(loginForm.state.password).toEqual('PASS');
        expect(loginForm.state.passwordConfirm).toEqual('PASS CONFIRM');
    });

    it('should not submit unequal passwords', () => {

        let inputs = TestUtils.scryRenderedDOMComponentsWithTag(loginForm, 'input');
        
        TestUtils.Simulate.change( inputs[0], {target: {value: 'USER' }} );
        TestUtils.Simulate.change( inputs[1], {target: {value: 'SECRET' }} );
        TestUtils.Simulate.change( inputs[2], {target: {value: 'OTHER SECRET' }} );
        
        let form = TestUtils.findRenderedDOMComponentWithTag(loginForm, 'form');
        TestUtils.Simulate.submit( form );

        expect(actions.register).not.toBeCalled();
        expect(loginForm.state.wgName).toEqual('USER');
        expect(loginForm.state.password).toEqual('SECRET');
        expect(loginForm.state.passwordConfirm).toEqual('OTHER SECRET');
    });

    it('should display error text on unequal passwords', () => {

        loginForm.setState({error: 'conflict'});
        let errorMsg = TestUtils.findRenderedDOMComponentWithClass(loginForm, 'loginRegisterForm__error');
        expect(errorMsg).toBeDefined();

        loginForm.setState({error: 'password'});
        errorMsg = TestUtils.findRenderedDOMComponentWithClass(loginForm, 'loginRegisterForm__error');
        expect(errorMsg).toBeDefined();

        loginForm.setState({error: 'foobar'});
        errorMsg = TestUtils.scryRenderedDOMComponentsWithClass(loginForm, 'loginRegisterForm__error');
        expect(errorMsg.length).toEqual(0);
    });

    it('should call action on valid form-submit', () => {

        let inputs = TestUtils.scryRenderedDOMComponentsWithTag(loginForm, 'input');
        
        TestUtils.Simulate.change( inputs[0], {target: {value: 'USER' }} );
        TestUtils.Simulate.change( inputs[1], {target: {value: 'SAME SECRET' }} );
        TestUtils.Simulate.change( inputs[2], {target: {value: 'SAME SECRET' }} );
        
        let form = TestUtils.findRenderedDOMComponentWithTag(loginForm, 'form');
        TestUtils.Simulate.submit( form );

        expect(actions.register).toBeCalledWith('USER', 'SAME SECRET');
        expect(loginForm.state.wgName).toEqual('');
        expect(loginForm.state.password).toEqual('');
        expect(loginForm.state.passwordConfirm).toEqual('');
    });
});