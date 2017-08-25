import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Select extends Component {
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

    componentDidUpdate(){
        if(this.props.items.length > 1 && !this.state.value){
            this.onChange(this.props.items[0][this.props.itemValue]);
        }
    }

    onChange(value) {
        this.setState({ value });
        this.props.onChange(value, true);
    }

    render() {
        const classes = classNames({
            'form-group': true,
            'has-error': !this.state.isValid
        });

        return (
            <div className={classes}>
                {this.renderLabel()}
                {this.renderSelect()}
            </div>
        );
    }

    renderLabel() {
        if (this.props.label) {
            return <label htmlFor={this.props.id}>{this.props.label}</label>;
        }
        return null;
    }

    renderSelect() {
        const options = this.props.items.map((option, i) => {
            return <option key={i} value={option[this.props.itemValue]} label={option[this.props.itemText]}>{option[this.props.itemText]}</option>;
        });

        return <select
            className="form-control"
            id={this.props.id}
            onChange={(event) => this.onChange(event.target.value)}
            disabled={this.props.disabled}>
            {options}
        </select>;
    }
}

Select.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    items: PropTypes.array.isRequired,
    itemValue: PropTypes.string.isRequired,
    itemText: PropTypes.string.isRequired
};

Select.defaultProps = {
    label: '',
    value: ''
};