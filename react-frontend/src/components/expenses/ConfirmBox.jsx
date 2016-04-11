import React, { Component } from 'react';

import './ConfirmBox.scss';

export default class ConfirmBox extends Component {

    constructor(props) {
        super(props);
        this.state = { confirmationNeeded: false };
        //console.log('selected list ', this.props.selected);
    }

    questionableButtonClicked() {
        this.setState({ confirmationNeeded: true });
    }

    onAbort() {
        this.setState({ confirmationNeeded: false });
    }

    onClick() {
        this.setState({ confirmationNeeded: false });
        this.props.confirmCallback();
    }

    render() {
        if (this.state.confirmationNeeded) {
            return (
                <div className ='confirmBox'>
                    <button className='confirmBox__actionButton' onClick={this.onClick.bind(this)}>
                        {this.props.confirmText}
                    </button>
                    <button className='confirmBox__actionButton' onClick={this.onAbort.bind(this)}>
                        {this.props.abortText}
                    </button>
                </div>
            );
        }
        return (
            <a className='confirmBox__questButton' onClick={this.questionableButtonClicked.bind(this)}>{this.props.text}</a>
        );
    }

}

ConfirmBox.propTypes = {
    confirmCallback: React.PropTypes.func.isRequired,
    text: React.PropTypes.string.isRequired,
    confirmText: React.PropTypes.string.isRequired,
    abortText: React.PropTypes.string.isRequired
}
