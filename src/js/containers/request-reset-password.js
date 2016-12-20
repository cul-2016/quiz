import { connect } from 'react-redux';
import RequestResetPassword from '../components/login/request-reset-password.js';
import {
    updateEmail,
    updatePassword,
    updateConfirmedPassword,
    resetPassword
} from '../actions/reset-password';

const mapStateToProps = (state) => ({
    resetPassword: state.resetPassword
});

const mapDispatchToProps = (dispatch) => ({

    handleEmailChange: (value) => {
        dispatch(updateEmail(value));
    },
    handlePasswordChange: (value) => {
        dispatch(updatePassword(value));
    },
    handleConfirmedPasswordChange: (value) => {
        dispatch(updateConfirmedPassword(value));
    },
    handleResetPassword: (email) => {
        dispatch(resetPassword(email));
    }
});

const RequestResetPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(RequestResetPassword);

export default RequestResetPasswordContainer;
