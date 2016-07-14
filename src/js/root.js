import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, hashHistory, Link } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/app';
import Login from './components/login';
import LecturerDashboardContainer from './containers/lecturer-dashboard';
import StudentDashboardContainer from './containers/student-dashboard';
import NewModuleContainer from './containers/new-module';

import composeHooks from './lib/composeHooks';
import fetchModules from './lib/fetchModules';
import authenticate from './lib/authenticate';

import { store } from './store';


const Authd = () => {
    return (
        <div>
            We are authenticated
            <nav>
                <Link to="/dashboard-student">Students</Link><br/>
                <Link to="/dashboard-lecturer">Lecturer</Link>
            </nav>
        </div>
    );
};

const Root = ({ store }) => (

    <Provider store={ store }>
        <Router history={ hashHistory }>
            <Route path="/" component={ App }>
                <IndexRoute component={ Login } />
                <Route onEnter={ authenticate } path="auth" component={ Authd } />
                <Route onEnter={ composeHooks(authenticate, fetchModules) }  path="dashboard-lecturer" component={ LecturerDashboardContainer } />
                <Route onEnter={ authenticate } path="dashboard-student" component={ StudentDashboardContainer } />
                <Route onEnter={ authenticate } path="new-module" component={ NewModuleContainer } />
            </Route>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;
