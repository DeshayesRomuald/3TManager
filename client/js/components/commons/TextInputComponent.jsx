import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class TextInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            isValid: true
        };
    }

    componentDidMount(event) {
        this.setState({ value: this.props.value });
    }

    onChange(value) {
        let isValid = (this.props.isRequired && !value) ? false : true;

        this.setState({ value, isValid });
        this.props.onChange(value, isValid);
    }

    render() {
        const classes = classNames({
            'form-group': true,
            'has-error': !this.state.isValid
        });

        return (
            <div className={classes}>
                {this.renderLabel()}
                {this.renderInput()}
            </div>
        );
    }

    renderLabel() {
        if (this.props.label) {
            return <label htmlFor={this.props.id}>{this.props.label}</label>;
        }
        return null;
    }

    renderInput() {
        return <input
            className="form-control"
            type={this.props.type}
            id={this.props.id}
            value={this.state.value}
            onChange={(event) => this.onChange(event.target.value)}
            placeholder={this.props.placeholder} 
            disabled={this.props.disabled}/>;
    }
}

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool,
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

TextInput.defaultProps = {
    label: '',
    value: '',
    placeholder: '',
    type: 'text'
};