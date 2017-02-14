import { connect } from 'react-redux';
import ResetPasswordForm from '../components/login/reset-password-form.js';
import {
    updatePassword,
    updateConfirmedPassword,
    submitNewPassword
} from '../actions/reset-password';

const mapStateToProps = (state) => ({
    resetPassword: state.resetPassword
});

const mapDispatchToProps = (dispatch) => ({

    handlePasswordChange: (value) => {
        dispatch(updatePassword(value));
    },
    handleConfirmedPasswordChange: (value) => {
        dispatch(updateConfirmedPassword(value));
    },
    handleSubmitNewPassword: (email, code) => {
        dispatch(submitNewPassword(email, code));
    }
});

const ResetPasswordFormContainer = connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);

export default ResetPasswordFormContainer;
