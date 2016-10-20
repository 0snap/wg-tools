import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import DeptList from '../../../src/components/depts/DeptList.jsx';


describe('DeptList', () => {

    const noContent = 'Keine Schulden';
    const depts = [
        {borrower: {name: 'foo'}, amount: 5, sponsor: {name: 'bar'}},
        {borrower: {name: 'bar'}, amount: 10, sponsor: {name: 'batz'}}
    ];

    it('should render noContent-headline with empty depts', () => {
        
        let deptList = TestUtils.renderIntoDocument( <DeptList deptList={[]} /> );
        
        let headline = TestUtils.findRenderedDOMComponentWithTag(deptList, 'h3');
        expect(headline.textContent).toEqual(noContent);
    });

    it('should render dept list when depts is not empty', () => {
        
        let deptList = TestUtils.renderIntoDocument( <DeptList deptList={depts} /> );
        let listComponent = TestUtils.findRenderedDOMComponentWithClass(deptList, 'deptItemList');

        expect(listComponent).toBeDefined();

        let items = TestUtils.scryRenderedDOMComponentsWithTag(deptList, 'li');
        expect(items.length).toEqual(2);
    });
});