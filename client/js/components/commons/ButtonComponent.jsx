import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
    render() {
        return (
            <button className="btn btn-default" type="submit" disabled={this.props.disabled}>
                {this.props.children}
            </button>
        );
    }
}

Button.propTypes = {    
    disabled: PropTypes.bool
};