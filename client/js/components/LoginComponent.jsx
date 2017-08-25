import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from './user/userActions';
import { TextInput, Button, Alert } from './commons';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {
                email: {
                    value: '',
                    isValid: false
                },
                password: {
                    value: '',
                    isValid: false
                }
            },
            isFormValid: false
        };
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

    connection(e) {
        e.preventDefault();
        this.props.login(this.state.fields.email.value, this.state.fields.password.value);

    }

    render() {
        return (
            <div className="container">
                <div className="login-container well col-sm-4 col-sm-offset-4">
                    <form onSubmit={(e) => this.connection(e)}>
                        <TextInput id="email"
                            label={this.props.strings.email}
                            placeholder={this.props.strings.email}
                            onChange={(value, isValid) => this.onChange('email', value, isValid)}
                            isRequired
                            disabled={this.props.pending} />
                        <TextInput id="password"
                            type="password"
                            label={this.props.strings.password}
                            onChange={(value, isValid) => this.onChange('password', value, isValid)}
                            isRequired
                            disabled={this.props.pending} />
                        <Button disabled={!this.state.isFormValid || this.props.pending}>
                            {this.props.strings.button}
                        </Button>
                        {this.renderError()}
                    </form>
                </div>

            </div>
        );
    }

    renderError() {
        if (this.props.hasError) {
            return (<Alert>
                <strong>{this.props.strings.error.title}</strong> {this.props.strings.error.content}
            </Alert>);
        }

        return null;
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => dispatch(actions.login(email, password))
});

const mapStateToProps = (state) => {
    return {
        pending: state.user.pending,
        hasError: state.user.error,
        strings: state.languages.data.pages.login
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);