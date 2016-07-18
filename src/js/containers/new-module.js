import { connect } from 'react-redux';
import { updateMedalValues, updateTrophyValues } from '../actions/new-module';
import NewModule from '../components/new-module';


const mapStateToProps = (state) => ({
    medals: state.newModule.medals,
    trophies: state.newModule.trophies
});

const mapDispatchToProps = (dispatch) => ({

    updateMedalVals: (medal, value) => {

        if (value !== "") {
            value = parseInt(value, 10);
        }
        dispatch(updateMedalValues(medal, value));
    },
    updateTrophyVals: (trophy, value) => {
        console.log("dispatch updateTrophyValues", trophy, value);
        dispatch(updateTrophyValues(trophy, value));
    }
});

const NewModuleContainer = connect(mapStateToProps, mapDispatchToProps)(NewModule);

export default NewModuleContainer;
