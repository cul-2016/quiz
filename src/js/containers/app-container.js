import { connect } from 'react-redux';
import App from '../components/app';
import { toggleCookieMessage, ClearErrorFromState } from '../actions/user';
import { hashHistory } from 'react-router';

const mapStateToProps = (state) => ({
    userState: state.user,
    cookieMessage: state.user.cookieMessage,
    error: state.dashboard.error || state.joinModule.error || state.leaderboard.error || state.liveQuiz.error || state.login.error || state.module.error || state.newModule.error || state.newQuiz.error || state.quizMembers.error || state.register.error || state.result.error || state.review.error || state.user.error
});

const mapDispatchToProps = (dispatch) => ({
    handleCookiePopup: () => {
        document.cookie = "cookie_message=false";
        dispatch(toggleCookieMessage());
    },

    handleErrorClearance: (reducerState) => {

        dispatch(ClearErrorFromState(reducerState));
        hashHistory.push('/');
    }
});
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
