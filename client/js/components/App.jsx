import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './user/userActions';
import { NavBar, NavBarRight } from './navBar';
import Quote from './quote/QuoteComponent.jsx';

class App extends Component {
    componentDidMount() {
        this.props.getUser();
    }

    render() {
        if (!this.props.user.name) {
            return null;
        }

        return (
            <div>
                <NavBar>
                    <NavBarRight>
                        <li><a>{this.props.strings.hello} {this.props.user.name}</a></li>
                        <li><a onClick={() => this.props.logout()}>{this.props.strings.logout}</a></li>
                    </NavBarRight>
                </NavBar>
                <div className="container app-container">
                    <Quote />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(actions.getUser()),
    logout: () => dispatch(actions.logout())
});

const mapStateToProps = (state) => {
    return {
        user: state.user.data,
        strings: state.languages.data.pages.app
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);