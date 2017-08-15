import { connect } from 'react-redux';
import Signup from '../components/signup';
import { updateInputField, registeringUser, toggleTcAgreed } from '../actions/register.js';

const mapStateToProps = (state) => ({
    register: state.register
});

const mapDispatchToProps = (dispatch) => ({

    handleChange: (inputType, value) => {
        dispatch(updateInputField(inputType, value));
    },
    handleRegisteringUser: (email, username, password, is_lecturer) => {
        dispatch(registeringUser(email, username, password, is_lecturer));
    },
    handleToggleTcAgreed: () => {
        dispatch(toggleTcAgreed());
    }
});

const SignupContainer = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default SignupContainer;
