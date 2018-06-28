import { connect } from 'react-redux';
import Login from '../components/login/login';
import { updateEmail, updatePassword, authenticateUser, migrateUser } from '../actions/login';

const mapStateToProps = (state) => ({
    login: state.login
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
    },
    handleMigrateUser: (email, password) => {
        dispatch(migrateUser(email, password));
    }
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
