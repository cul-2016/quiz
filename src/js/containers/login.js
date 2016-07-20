import { connect } from 'react-redux';
import Login from '../components/login';
import { updateEmail, updatePassword, authenticateUser } from '../actions/signup';

const mapStateToProps = (state) => ({
    signup: state.signup
});

const mapDispatchToProps = (dispatch) => ({

    handleEmailChange: (value) => {
        dispatch(updateEmail(value));
    },
    handlePasswordChange: (value) => {
        dispatch(updatePassword(value));
    },
    handleAuthenticateUser: (email, password) => {
        dispatch(authenticateUser(email, password));
    }
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
