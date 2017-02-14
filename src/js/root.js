import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import AppContainer from './containers/app-container';
import LoginContainer from './containers/login';
import RequestResetPasswordContainer from './containers/request-reset-password.js';
import RequestEmailSentComponent from './components/login/reset-password-email-sent.js';
import ResetPasswordFormContainer from './containers/reset-password-form-container.js';
import DashboardContainer from './containers/dashboard';
import NewModuleContainer from './containers/new-module';
import SignupContainer from './containers/signup';
import NewQuizContainer from './containers/new-quiz';
import EditQuizContainer from './containers/edit-quiz';

import AppLoadingContainer from './containers/app-loading';

import ModuleContainer from './containers/module';
import LecturerLiveQuizContainer from './containers/lecturer-live-quiz';
import QuizHistoryContainer from './containers/quiz-history';
import LeaderboardContainer from './containers/leaderboard';
import HoldingPageComponent from './components/holding-page';
import ReviewContainer from './containers/review';
import ModuleMembersContainer from './containers/module-members';
import QuizMembersContainer from './containers/quiz-members';
import QuizMembersReviewContainer from './containers/quiz-members-review';
import ReviewQuizStudentContainer from './containers/student/quiz-review.js';

import StudentJoinModuleContainer from './containers/student/join-module';
import StudentModuleContainer from './containers/student/module';
import StudentPerformanceContainer from './containers/student/feedback';
import StudentLiveQuizContainer from './containers/student/live-quiz';
import StudentQuizResultContainer from './containers/student/result';

import VerficationMessageComponent from './components/email-verification/verify-email-message.js';
import VerifiedComponent from './components/email-verification/verified.js';

import NotFound from './components/general/not-found';

import composeHooks from './lib/composeHooks';
import * as hooks from './lib/onEnterHooks';

import { store } from './store'; // eslint-disable-line

const Root = ({ store }) => (

    <Provider store={ store }>
        <Router history={ hashHistory } onUpdate={() => window.scrollTo(0, 0)}>
            <Route path="/" component={ AppContainer }>
                <IndexRoute
                    onEnter={ hooks.shouldUserRedirect }
                    component={ LoginContainer } />
                <Route
                    onEnter={ hooks.clearState }
                    path="request-reset-password"
                    component={ RequestResetPasswordContainer } />
                <Route
                    path="reset-password-email-sent"
                    component={ RequestEmailSentComponent } />
                <Route
                    onEnter={ hooks.clearState }
                    path="reset-password/:code"
                    component={ ResetPasswordFormContainer } />
                <Route
                    path="register-student"
                    component={ SignupContainer } />
                <Route
                    path="register-lecturer-invite-only"
                    component={ SignupContainer } />
                <Route
                    path="please-verify"
                    component={ VerficationMessageComponent } />
                <Route
                    path="verification/:verified"
                    component={ VerifiedComponent } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.fetchModuleList, hooks.leaveRoom) }
                    path="dashboard"
                    component={ DashboardContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.checkUserRole) }
                    path="add-new-module"
                    component={ NewModuleContainer } />
                <Route
                    onEnter={ hooks.authenticate }
                    path="join-module"
                    component={ StudentJoinModuleContainer } />
                <Route
                    onEnter={ hooks.fetchUserDetails }
                    path="app-loading"
                    component={ AppLoadingContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.checkUserRole, hooks.fetchModule, hooks.checkModuleOwner) }
                    path=":module_id/lecturer"
                    component={ ModuleContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.fetchModule) }
                    path=":module_id/student"
                    component={ StudentModuleContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.fetchModule) }
                    path=":module_id/student/performance"
                    component={ StudentPerformanceContainer } />
                <Route
                    onEnter={ composeHooks(hooks.fetchQuizDetailsStudent) }
                    path=":module_id/student/history/:quiz_id"
                    component={ ReviewQuizStudentContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.checkUserRole, hooks.checkModuleOwner) }
                    path=":module_id/new-quiz"
                    component={ NewQuizContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.checkUserRole, hooks.fetchQuizDetails, hooks.checkModuleOwner) }
                    path=":module_id/:quiz_id/edit-quiz"
                    component={ EditQuizContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.checkUserRole, hooks.fetchQuizDetails, hooks.checkModuleOwner) }
                    path=":module_id/:survey_id/edit-survey"
                    component={ EditQuizContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.checkUserRole, hooks.fetchModuleMembers, hooks.checkModuleOwner) }
                    path=":module_id/members"
                    component={ ModuleMembersContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.checkUserRole, hooks.fetchQuizMembers, hooks.fetchQuizReview, hooks.checkModuleOwner) }
                    path=":module_id/:quiz_id/members"
                    component={ QuizMembersContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.checkUserRole, hooks.fetchQuizMembers, hooks.fetchQuizReview, hooks.checkModuleOwner) }
                    path=":module_id/:quiz_id/members/quiz-review"
                    component={ QuizMembersReviewContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.checkUserRole, hooks.checkModuleOwner) }
                    path=":module_id/lecturer/live"
                    component={ LecturerLiveQuizContainer } />
                <Route
                    onEnter={ hooks.authenticate }
                    path=":module_id/student/live"
                    component={ StudentLiveQuizContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.checkUserRole, hooks.checkModuleOwner) }
                    path=":module_id/:quiz_id/holding-page"
                    component={ HoldingPageComponent } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.checkUserRole, hooks.fetchQuizReview, hooks.checkModuleOwner) }
                    path=":module_id/:quiz_id/review"
                    component={ ReviewContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.fetchResult) }
                    path=":module_id/:quiz_id/result"
                    component={ StudentQuizResultContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.checkModuleOwner) }
                    path=":module_id/:quiz_id/history"
                    component={ QuizHistoryContainer } />
                <Route
                    onEnter={ composeHooks(hooks.authenticate, hooks.checkUserRole, hooks.fetchLeaderboard, hooks.checkModuleOwner) }
                    path=":module_id/leaderboard"
                    component={ LeaderboardContainer } />
                <Route path='/404' component={ NotFound } />
                <Redirect from='*' to='/404' />
            </Route>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;
