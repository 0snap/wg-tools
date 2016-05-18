jest.unmock('../../../src/components/staticPages/FAQItem.jsx');
jest.unmock('classnames');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import FAQItem from '../../../src/components/staticPages/FAQItem.jsx';



describe('FAQItem', () => {

    const iconClasses = 'fa fa-li';
    const question = 'QUESTION';
    const answer = 'ANSWER';

    let faqItem;
    let faqItemNode;

    function getQuestionLink(faqItem) {
        return TestUtils.findRenderedDOMComponentWithTag(faqItem, 'a');
    }

    beforeEach(function() {
        faqItem = TestUtils.renderIntoDocument(
            <FAQItem iconClasses={iconClasses} question={question} answer={answer} />
        );
        faqItemNode = ReactDOM.findDOMNode(faqItem);
        
        expect(faqItemNode).toBeDefined();
        expect(faqItem.state.expanded).toEqual(false);
    });


    it('should render icon with iconClasses', () => {
        let icon = TestUtils.findRenderedDOMComponentWithClass(faqItem, iconClasses);
        expect(icon).toBeDefined();
    });

    it('should render question', () => {
        let question = TestUtils.findRenderedDOMComponentWithClass(faqItem, 'faqItem__question');
        expect(question).toBeDefined();
    });

    it('should render answer with "invisible" css class', () => {
        let answer = TestUtils.findRenderedDOMComponentWithClass(faqItem, 'faqItem__answer');
        expect(answer).toBeDefined();
        let notVisibleThings = TestUtils.scryRenderedDOMComponentsWithClass(faqItem, 'not-visible');
        expect(notVisibleThings.length).toEqual(1);
    });

    it('should show answer on click', () => {
        let clickableDiv = TestUtils.findRenderedDOMComponentWithClass(faqItem, 'faqItem__clickable');
        expect(clickableDiv).toBeDefined();
        TestUtils.Simulate.click( clickableDiv );
        let notVisibleThings = TestUtils.scryRenderedDOMComponentsWithClass(faqItem, 'not-visible');
        expect(notVisibleThings.length).toEqual(0);
        
    });

    it('should hide answer on second click', () => {
        let clickableDiv = TestUtils.findRenderedDOMComponentWithClass(faqItem, 'faqItem__clickable');
        expect(clickableDiv).toBeDefined();
        TestUtils.Simulate.click( clickableDiv );
        TestUtils.Simulate.click( clickableDiv ); // second 
        let notVisibleThings = TestUtils.scryRenderedDOMComponentsWithClass(faqItem, 'not-visible');
        expect(notVisibleThings.length).toEqual(1);
    });

});