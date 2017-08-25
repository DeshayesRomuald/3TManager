import './assets/styles/main.scss';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';

import configureStore from './js/configureStore';
import App from './js/components/App.jsx';
import NotFound from './js/components/NotFound.jsx';
import Login from './js/components/LoginComponent.jsx';

ReactDOM.render(
    <Provider store={configureStore()}>
        <Router history={browserHistory}>
            <Switch>
                <Route path="/" exact component={App}>
                
                </Route>
                <Route path="/login" exact component={Login} />
                <Route component={NotFound} />                
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('app')
);
