import { connect } from 'react-redux';
import RegisterUser from '../components/register-user';
import { updateInputField, registeringUser } from '../actions/register';

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

const RegisterUserContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterUser);

export default RegisterUserContainer;
