import React, { PropTypes } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import AppContainer from './containers/app-container';

const Root = ({ store }) => (

    <Provider store={ store }>
        <Router history={ hashHistory }>
            <Route path='/' component={ AppContainer }>
            </Route>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;
