jest.unmock('../../../src/components/expenses/ConfirmBox.jsx');


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ConfirmBox from '../../../src/components/expenses/ConfirmBox.jsx';



describe('ConfirmBox', () => {

    const text = 'TEXT';
    const confirmText = 'CONFIRM TEXT';
    const abortText = 'ABORT TEXT';

    let callback;
    let box;
    let boxNode;

    function getQuestionLink(box) {
        return TestUtils.findRenderedDOMComponentWithTag(box, 'a');
    }

    beforeEach(function() {
        callback = jest.genMockFunction();
        box = TestUtils.renderIntoDocument(
            <ConfirmBox text={text} confirmText={confirmText} abortText={abortText} confirmCallback={callback} />
        );
        boxNode = ReactDOM.findDOMNode(box);
        
        expect(boxNode).toBeDefined();
    });


    it('should render text content', () => {

        let link = getQuestionLink(box);
        expect(link).toBeDefined();
        expect(link.textContent).toEqual(text);
        expect(box.state.confirmationNeeded).toEqual(false);
        expect(callback).not.toBeCalled();
    });

    it('should render question-buttons on link click', () => {
        
        let link = getQuestionLink(box);
        
        TestUtils.Simulate.click( link );

        let buttons = TestUtils.scryRenderedDOMComponentsWithClass(box, 'confirmBox__actionButton');
        expect(buttons.length).toEqual(2);
        expect(buttons[0].textContent).toEqual(confirmText);
        expect(buttons[1].textContent).toEqual(abortText);
        expect(box.state.confirmationNeeded).toEqual(true);
        expect(callback).not.toBeCalled();
    });

    it('should call callback on confirm click', () => {
        
        let link = getQuestionLink(box);
        
        TestUtils.Simulate.click( link );
        let buttons = TestUtils.scryRenderedDOMComponentsWithClass(box, 'confirmBox__actionButton');
        TestUtils.Simulate.click( buttons[0] );

        expect(box.state.confirmationNeeded).toEqual(false);
        expect(callback).toBeCalled();
    });

    it('should abort on abort click', () => {
        
        let link = getQuestionLink(box);
        
        TestUtils.Simulate.click( link );
        let buttons = TestUtils.scryRenderedDOMComponentsWithClass(box, 'confirmBox__actionButton');
        TestUtils.Simulate.click( buttons[1] );
        
        expect(link.textContent).toEqual(text);
        expect(box.state.confirmationNeeded).toEqual(false);

        expect(callback).not.toBeCalled();
    });
});