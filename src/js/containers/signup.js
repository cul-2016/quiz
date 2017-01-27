import { connect } from 'react-redux';
import Signup from '../components/signup';
import { updateInputField, registeringUser } from '../actions/register.js';

const mapStateToProps = (state) => ({
    register: state.register
});

const mapDispatchToProps = (dispatch) => ({

    handleChange: (inputType, value) => {
        dispatch(updateInputField(inputType, value));
    },
    handleRegisteringUser: (email, username, password, is_lecturer) => {
        dispatch(registeringUser(email, username, password, is_lecturer));
    }

});

const SignupContainer = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default SignupContainer;
