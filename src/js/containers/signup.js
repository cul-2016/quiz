import { connect } from 'react-redux';
import Signup from '../components/signup';
import * as actions from '../actions/register.js';

const mapStateToProps = (state) => ({
    register: state.register
});

const SignupContainer = connect(mapStateToProps, actions)(Signup);

export default SignupContainer;
