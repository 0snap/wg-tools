import React, { Component } from 'react';

import './MobileExpandable.scss';

const NOT_VISIBLE = 'not-visible';
export default class MobileExpandable extends Component {


    constructor(props) {
        super(props);
        this.state = {
            cssContent: NOT_VISIBLE
        };
    }


    showContent(event) {
        event.preventDefault();
        if(this.state.cssContent) {
            this.setState({cssContent: undefined});
        } 
        else {
            this.setState({cssContent: NOT_VISIBLE});
        }
    }


    render() {
        return (
            <div className='mobileExpandable'>
                <button className='mobileExpandable__expendButton' onClick={this.showContent.bind(this)}>
                    {this.props.displayText}
                </button>
                <div className={this.state.cssContent}>
                    {this.props.children}
                </div>
            </div>

        );
    }

}

MobileExpandable.propTypes = {
    displayText: React.PropTypes.string
}