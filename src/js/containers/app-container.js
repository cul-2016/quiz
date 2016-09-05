import { connect } from 'react-redux';
import App from '../components/app';
import { toggleCookieMessage } from '../actions/user';

const mapStateToProps = (state) => ({
    userState: state.user,
    cookieMessage: state.user.cookieMessage
});

const mapDispatchToProps = (dispatch) => ({
    handleCookiePopup: () => {
        document.cookie = "cookie_message=false";
        dispatch(toggleCookieMessage());
    }
});
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
