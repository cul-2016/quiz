import { connect } from 'react-redux';
import RegisterUser from '../components/register-user';
import { updateInputField, registeringUser } from '../actions/register';

const mapStateToProps = (state) => ({
    register: state.register
});

const mapDispatchToProps = (dispatch) => ({

    handleChange: (inputType, value) => {
        console.log(inputType, value);
        dispatch(updateInputField(inputType, value));
    },
    handleRegisteringUser: (email, username, password, is_lecturer) => {
        console.log(email, username, password);
        dispatch(registeringUser(email, username, password, is_lecturer));
    }

});

const RegisterUserContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterUser);

export default RegisterUserContainer;
