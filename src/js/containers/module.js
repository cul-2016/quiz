import { connect } from 'react-redux';
import Module from '../components/module/module';


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
        },
        numUsers: 100
    },
    quizzes: [
        {
            quiz_id: 2,
            name: 'Pop quiz',
            numQuestions: 10,
            numEntries: 121,
            isPresented: false
        },
        {
            quiz_id: 5,
            name: 'Awesome quiz',
            numQuestions: 18,
            numEntries: 11,
            isPresented: true
        }
    ]
});

const mapDispatchToProps = (dispatch) => ({
    dispatch
});


const ModuleContainer = connect(mapStateToProps, mapDispatchToProps)(Module);

export default ModuleContainer;
