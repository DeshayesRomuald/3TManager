import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../carContract/carContractActions';
import { TextInput, Button, Alert, Select, Success, Price } from '../commons';

class Quote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {
                driver: {
                    value: '',
                    isValid: false
                },
                brand: {
                    value: '',
                    isValid: false
                },
                value: {
                    value: '',
                    isValid: false
                }
            },
            isFormValid: false
        };
    }

    componentDidMount() {
        this.props.getSpecifications();
    }

    onChange(prop, value, isValid) {
        const fields = this.state.fields;
        fields[prop].value = value;
        fields[prop].isValid = isValid;

        let isFormValid = true;

        for (let fieldKey in fields) {
            if (!fields[fieldKey].isValid) {
                isFormValid = false;
                break;
            }
        }

        this.setState({ fields, isFormValid });
    }

    submitQuote(e) {
        e.preventDefault();
        this.props.addQuote({
            driver: this.state.fields.driver.value,
            brand: this.state.fields.brand.value,
            value: parseInt(this.state.fields.value.value, 10)
        });
    }

    render() {
        return (
            <div className="container">
                <div className="well col-sm-4 col-sm-offset-4">
                    <h1>{this.props.strings.title}</h1>
                    <form onSubmit={(e) => this.submitQuote(e)}>
                        <TextInput id="driver"
                            label={this.props.strings.driver}
                            onChange={(value, isValid) => this.onChange('driver', value, isValid)}
                            isRequired
                            disabled={this.props.pending} />
                        <Select id="brand"
                            label={this.props.strings.brand}
                            onChange={(value, isValid) => this.onChange('brand', value, isValid)}
                            disabled={this.props.pending}
                            items={this.props.specifications}
                            itemValue="id"
                            itemText="brand" />
                        <TextInput id="value"
                            type="number"
                            label={this.props.strings.value.title}
                            onChange={(value, isValid) => this.onChange('value', value, isValid)}
                            isRequired
                            disabled={this.props.pending} />

                        <div className="small">*{this.props.strings.value.help}</div>
                        <Button disabled={!this.state.isFormValid || this.props.pending}>
                            {this.props.strings.button}
                        </Button>

                    </form>
                    {this.renderResult()}
                </div>
                
            </div>
        );
    }

    renderResult(){
        if(this.props.quote){
            if(this.props.quote.status === 'rejected'){
                return <Alert>{this.props.strings.rejected} {this.props.quote.rejectReason}</Alert>
            } else if(this.props.quote.status === 'accepted'){
                return <Success>{this.props.strings.accepted} <Price value={this.props.quote.price} /></Success>
            }
        }

        return null;
    }
}

const mapDispatchToProps = (dispatch) => ({
    getSpecifications: () => dispatch(actions.getSpecifications()),
    addQuote: (payload) => dispatch(actions.addQuote(payload))
});

const mapStateToProps = (state) => {
    return {
        pending: state.carContract.pending,
        hasError: state.carContract.error,
        specifications: state.carContract.specifications,
        strings: state.languages.data.pages.quote,
        quote: state.carContract.quote
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Quote);