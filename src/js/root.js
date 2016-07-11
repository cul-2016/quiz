import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import AppContainer from './containers/app-container';
import Login from './components/login';
import authenticate from './lib/authenticate';


const Authd = () => {
    return <div>We are authenticated!</div>;
};

const Root = ({ store }) => (

    <Provider store={ store }>
        <Router history={ hashHistory }>
            <Route path='/' component={ AppContainer }>
                <IndexRoute component={ Login } />
                <Route path='/auth'
                       component={ Authd }
                       onEnter={ authenticate } />
            </Route>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;
