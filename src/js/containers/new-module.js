import { connect } from 'react-redux';
import { updateMedalValues } from '../actions/new-module';
import NewModule from '../components/new-module';


const mapStateToProps = (state) => ({
    medals: state.newModule.medals
});

const mapDispatchToProps = (dispatch) => ({

    updateValues: (medal, value) => {
        dispatch(updateMedalValues(medal, value));
    }
});

const NewModuleContainer = connect(mapStateToProps, mapDispatchToProps)(NewModule);

export default NewModuleContainer;
