import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/app';
import LoginContainer from './containers/login';
import LecturerDashboardContainer from './containers/lecturer-dashboard';
import StudentDashboardContainer from './containers/student-dashboard';
import NewModuleContainer from './containers/new-module';
import RegisterUserContainer from './containers/register-user';
import ModuleContainer from './containers/module';
import Spinner from './components/general/spinner';

import composeHooks from './lib/composeHooks';
import fetchModules from './lib/fetchModules';
import authenticate from './lib/authenticate';
import userHasSignedIn from './lib/userHasSignedIn';
import fetchUserDetails from './lib/fetchUserDetails';

import { store } from './store';


const Root = ({ store }) => (

    <Provider store={ store }>
        <Router history={ hashHistory }>
            <Route path="/" component={ App }>
                <IndexRoute onEnter={ userHasSignedIn } component={ LoginContainer } />
                <Route onEnter={ composeHooks(authenticate, fetchUserDetails) } path="auth" component={ Spinner } />
                <Route path="/register-student" component={ RegisterUserContainer } />
                <Route path="/register-lecturer1000" component={ RegisterUserContainer } />
                <Route onEnter={ composeHooks(authenticate, fetchModules) }  path="dashboard-lecturer" component={ LecturerDashboardContainer } />
                <Route onEnter={ authenticate } path="dashboard-student" component={ StudentDashboardContainer } />
                <Route onEnter={ authenticate } path="new-module" component={ NewModuleContainer } />
                <Route onEnter={ authenticate } path="module/:module_id" component={ ModuleContainer } />
            </Route>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;
