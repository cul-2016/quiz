import { connect } from 'react-redux';
import JoinModule from '../components/join-module';
import { inputChange } from '../actions/join-module';

const mapStateToProps = (state) => ({
    module_id: state.joinModule.module_id,
});

const mapDispatchToProps = (dispatch) => ({

    handleInputChange: (value) => {
        const upperCaseValue = value.toUpperCase();
        console.log(upperCaseValue);
        dispatch(inputChange(upperCaseValue));
    }

});

const JoinModuleContainer = connect(mapStateToProps, mapDispatchToProps)(JoinModule);

export default JoinModuleContainer;
