import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from './components/app';
import LoginContainer from './containers/login';
import DashboardContainer from './containers/dashboard';
import NewModuleContainer from './containers/new-module';
import RegisterUserContainer from './containers/register-user';
import NewQuizContainer from './containers/new-quiz';

import ModuleContainer from './containers/module';
import LecturerLiveQuizContainer from './containers/lecturer-live-quiz';
import QuizHistoryContainer from './containers/quiz-history';
import LeaderboardContainer from './containers/leaderboard';
import ReviewContainer from './containers/review';
import ModuleMembersContainer from './containers/module-members';
import QuizMembersContainer from './containers/quiz-members';
import EditScoreContainer from './containers/edit-score';


import StudentJoinModuleContainer from './containers/student/join-module';
import StudentModuleContainer from './containers/student/module';
import StudentHistory from './components/student-module/history';
import StudentFeedback from './components/student-module/feedback';
import StudentLiveQuizContainer from './containers/student/live-quiz';
import StudentQuizResultContainer from './containers/student/result';

import composeHooks from './lib/composeHooks';
import * as hooks from './lib/onEnterHooks';

import { store } from './store';

const Root = ({ store }) => (

    <Provider store={ store }>
        <Router history={ hashHistory }>
            <Route path="/" component={ App }>
                <IndexRoute
                    onEnter={ hooks.shouldUserRedirect }
                    component={ LoginContainer } />
                <Route
                    path="register-student"
                    component={ RegisterUserContainer } />
                <Route
                    path="register-lecturer1000"
                    component={ RegisterUserContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.fetchModuleList) }
                    path="dashboard"
                    component={ DashboardContainer } />
                <Route
                    onEnter={ hooks.authenticate }
                    path="add-new-module"
                    component={ NewModuleContainer } />
                <Route
                    onEnter={ hooks.authenticate }
                    path="join-module"
                    component={ StudentJoinModuleContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.fetchModule) }
                    path=":module_id/lecturer"
                    component={ ModuleContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.fetchModule) }
                    path=":module_id/student"
                    component={ StudentModuleContainer }>
                    <IndexRedirect to="feedback" />
                    <Route
                        onEnter={ composeHooks(hooks.authenticate) }
                        path="history"
                        component={ StudentHistory } />
                    <Route
                        onEnter={ composeHooks(hooks.authenticate) }
                        path="feedback"
                        component={ StudentFeedback } />
                </Route>
                <Route
                    onEnter={ hooks.authenticate }
                    path=":module_id/new-quiz"
                    component={ NewQuizContainer } />
                <Route
                onEnter={ composeHooks(hooks.authenticate, hooks.fetchModuleMembers) }
                path=":module_id/members"
                component={ ModuleMembersContainer } />
                <Route
                onEnter={ composeHooks(hooks.authenticate, hooks.fetchQuizMembers) }
                path=":module_id/:quiz_id/members"
                component={ QuizMembersContainer } />
                <Route
                onEnter={ hooks.authenticate }
                path=":module_id/:quiz_id/:member_key/edit-score"
                component={ EditScoreContainer } />
                <Route
                    onEnter={ hooks.authenticate }
                    path=":module_id/lecturer/live"
                    component={ LecturerLiveQuizContainer } />
                <Route
                    onEnter={ hooks.authenticate }
                    path=":module_id/student/live"
                    component={ StudentLiveQuizContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.fetchquizReview) }
                    path=":module_id/:quiz_id/review"
                    component={ ReviewContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.fetchResult) }
                    path=":module_id/:quiz_id/result"
                    component={ StudentQuizResultContainer } />
                <Route
                    onEnter={ hooks.authenticate }
                    path=":module_id/:quiz_id/history"
                    component={ QuizHistoryContainer } />
                <Route
                    onEnter={ hooks.authenticate }
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
