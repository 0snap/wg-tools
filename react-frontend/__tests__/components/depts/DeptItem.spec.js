import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import DeptItem from '../../../src/components/depts/DeptItem.jsx';


describe('DeptItem', () => {

    const borrower = {name: 'foo', color: '#FFFFFF'}; 
    const amount = 5;
    const sponsor = {name: 'bar', color: '#000000'};

    it('should render with individual colors', () => {
        
        let deptItem = TestUtils.renderIntoDocument( <DeptItem borrower={borrower} sponsor={sponsor} amount={amount} /> );
        let deptItemNode = ReactDOM.findDOMNode(deptItem);
        expect(deptItemNode).toBeDefined();
        

    });
});