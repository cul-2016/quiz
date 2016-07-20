import { connect } from 'react-redux';
import Module from '../components/module';


const mapStateToProps = (state) => ({

    state,
    module: {
        module_id: 'CS50',
        name: 'Intro to Computer Science',
        medals: {
            medal_name: ["bronze", "silver", "gold"],
            condition: [39, 69]
        },
        trophies: {
            trophy_name: [
                "participation",
                "overall_average",
                "high_score",
                "first_quiz"
            ],
            condition: [3, 60, 100, 1]
        }
    }
});

const mapDispatchToProps = (dispatch) => ({
    dispatch
});


const ModuleContainer = connect(mapStateToProps, mapDispatchToProps)(Module);

export default ModuleContainer;
