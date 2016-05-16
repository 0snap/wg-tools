import React, { Component } from 'react';

import './DeptItem.scss';

export default class DeptItem extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        let sponsorNameStyle = {
            color: this.props.sponsor.color
        }
        let borrowerNameStyle = {
            color: this.props.borrower.color
        }
        return (
            <li className='deptItem moneyItem'>
                <span style={borrowerNameStyle}>{this.props.borrower.name}</span> an <span style={sponsorNameStyle}>{this.props.sponsor.name}</span>: <span className='deptItem__amount'>{this.props.amount}€</span>
            </li>
        );
    }



}

DeptItem.propTypes = {
    borrower: React.PropTypes.object.isRequired,
    sponsor: React.PropTypes.object.isRequired,
    amount: React.PropTypes.number.isRequired
}