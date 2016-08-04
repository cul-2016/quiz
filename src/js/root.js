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
import NewQuizContainer from './containers/new-quiz';

import composeHooks from './lib/composeHooks';
import * as hooks from './lib/onEnterHooks';

import { store } from './store';

const Root = ({ store }) => (

    <Provider store={ store }>
        <Router history={ hashHistory }>
            <Route path="/" component={ App }>
                <IndexRoute
                    onEnter={ hooks.userHasSignedIn }
                    component={ LoginContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.fetchUserDetails) }
                    path="auth"
                    component={ Spinner } />
                <Route
                    path="/register-student"
                    component={ RegisterUserContainer } />
                <Route
                    path="/register-lecturer1000"
                    component={ RegisterUserContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.hydrateDashboard) }
                    path="dashboard-lecturer"
                    component={ LecturerDashboardContainer } />
                <Route
                    onEnter={ hooks.authenticate }
                    path="dashboard-student"
                    component={ StudentDashboardContainer } />
                <Route
                    onEnter={ hooks.authenticate }
                    path="new-module"
                    component={ NewModuleContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.fetchModule) }
                    path="module/:module_id"
                    component={ ModuleContainer } />
                <Route
                    onEnter={ hooks.authenticate }
                    path=":module_id/new-quiz"
                    component={ NewQuizContainer } />
            </Route>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;
