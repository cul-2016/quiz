import { connect } from 'react-redux';
import MoodleSignup from '../components/moodle-signup';
import * as actions from '../actions/register.js';

const mapStateToProps = (state) => ({
    register: state.register
});

const MoodleSignupContainer = connect(mapStateToProps, actions)(MoodleSignup);

export default MoodleSignupContainer;
