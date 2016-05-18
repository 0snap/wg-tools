import React, { Component } from 'react';
import AppHeader from '../header/AppHeader.jsx';
import classNames from 'classnames';


import './FAQItem.scss';

const NOT_VISIBLE_CSS = 'not-visible';

export default class FAQItem extends Component {

    constructor(props) {
        super(props);
        this.state = { expanded: false };
    }

    toggleContent() {
        this.setState( { expanded: !this.state.expanded } );
    }

    getContentVisibleCSS() {
        return this.state.expanded? '' : NOT_VISIBLE_CSS;
    }

    render() {
        let clickableClasses = classNames('faqItem__clickable', {active: this.state.expanded});
        return (
            <div className='faqItem'>
                <div className={clickableClasses}  onClick={this.toggleContent.bind(this)}>
                    <div className='faqItem__icon'>
                        <i className={this.props.iconClasses} aria-hidden='true' />
                    </div>
                    <div className='faqItem__question'>
                        {this.props.question}
                    </div>
                </div>
                <div className={'faqItem__answer ' + this.getContentVisibleCSS() } dangerouslySetInnerHTML={{__html: this.props.answer}} />
            </div>);
    }
}

FAQItem.propTypes = {
    iconClasses: React.PropTypes.string.isRequired,
    question: React.PropTypes.string.isRequired,
    answer: React.PropTypes.string.isRequired
}