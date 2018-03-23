import { connect } from 'react-redux';
import App from '../components/app';
import { toggleCookieMessage, clearError } from '../actions/user';


const mapStateToProps = (state) => ({
    username: state.user.username,
    isCookieAccepted: state.user.isCookieAccepted,
    is_lecturer: state.user.is_lecturer,
    trial_expiry_time: state.user.trial_expiry_time,
    is_super_admin: state.user.is_super_admin,
    is_group_admin: state.user.is_group_admin,
    error: state.dashboard.error || state.leaderboard.error || state.liveQuiz.error || state.login.error || state.module.error || state.newModule.error || state.quizMembers.error || state.result.error || state.review.error || state.user.error,
    loading: state.dashboard.isFetchingDashboard || state.feedback.isFetchingFeedback || state.module.isJoiningModule || state.leaderboard.isFetchingLeaderboard || state.liveQuiz.isFetchingQuizQuestions || state.login.isAuthenticating || state.module.isFetchingModule || state.module.isFetchingMembers || state.newModule.isSavingModule || state.newQuiz.isFetchingQuizDetails || state.newQuiz.isUpdatingQuiz || state.quizMembers.isFetchingQuizMembers || state.register.isRegistering || state.resetPassword.isrequesting || state.result.isFetchingResult || state.review.isFetchingReview ||  state.superAdmin.isFetchingSuperAdminDashboard || state.superAdmin.isSavingClient
});

const mapDispatchToProps = (dispatch) => ({
    handleCookieMessage: () => {
        document.cookie = "cul_is_cookie_accepted=false";
        dispatch(toggleCookieMessage());
    },

    handleErrorClearance: (reducerState) => {

        dispatch(clearError(reducerState));
    }
});
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
