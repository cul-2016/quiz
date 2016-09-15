import { connect } from 'react-redux';
import App from '../components/app';
import { toggleCookieMessage, clearError } from '../actions/user';


const mapStateToProps = (state) => ({
    userState: state.user,
    isCookieAccepted: state.user.isCookieAccepted,
    error: state.dashboard.error || state.joinModule.error || state.leaderboard.error || state.liveQuiz.error || state.login.error || state.module.error || state.newModule.error || state.newQuiz.error || state.quizMembers.error || state.register.error || state.result.error || state.review.error || state.user.error
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
