import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from './components/app';
import LoginContainer from './containers/login';
import DashboardContainer from './containers/dashboard';
import NewModuleContainer from './containers/new-module';
import RegisterUserContainer from './containers/register-user';
import ModuleContainer from './containers/module';
import StudentModuleContainer from './containers/student-module';
import Spinner from './components/general/spinner';
import NewQuizContainer from './containers/new-quiz';
import LeaderboardContainer from './containers/leaderboard';
import LiveQuizContainer from './containers/live-quiz';
import QuizReviewContainer from './containers/quiz-review';
import QuizHistoryContainer from './containers/quiz-history';

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
                    path="register-student"
                    component={ RegisterUserContainer } />
                <Route
                    path="register-lecturer1000"
                    component={ RegisterUserContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.fetchUserDetails) }
                    path="dashboard"
                    component={ DashboardContainer } />
                <Route
                    onEnter={ hooks.authenticate }
                    path="new-module"
                    component={ NewModuleContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.fetchModule) }
                    path="lecturer/:module_id"
                    component={ ModuleContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.fetchModule) }
                    path="student/:module_id"
                    component={ StudentModuleContainer } />
                <Route
                    onEnter={ hooks.authenticate }
                    path=":module_id/new-quiz"
                    component={ NewQuizContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate) }
                    path=":module_id/:quiz_id/live"
                    component={ LiveQuizContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate) }
                    path=":module_id/:quiz_id/review"
                    component={ QuizReviewContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate) }
                    path=":module_id/:quiz_id/history"
                    component={ QuizHistoryContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.fetchModule) }
                    path=":module_id/leaderboard"
                    component={ LeaderboardContainer } />
            </Route>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;
