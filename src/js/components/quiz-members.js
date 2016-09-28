import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Spinner from './general/spinner';
import QuizMembersModal from './quiz-members-modal';
import EditScoreModal from './edit-score-modal';
import { store } from '../store.js';


class QuizMembers extends Component {

    constructor (props) {
        super(props);
        this.state = {
            isQuizQuestionsVisible: false,
            isEditScoreVisible: false,
            member_key: undefined
        };
        this.showQuizQuestions = this.showQuizQuestions.bind(this);
        this.hideQuizQuestions = this.hideQuizQuestions.bind(this);
        this.showEditScore = this.showEditScore.bind(this);
        this.hideEditScore = this.hideEditScore.bind(this);
    }

    showQuizQuestions () {
        this.setState({
            isQuizQuestionsVisible: true
        });
    }

    showEditScore (member_key) {
        this.setState({
            member_key,
            isEditScoreVisible: true
        });
    }

    hideEditScore () {
        this.setState({
            isEditScoreVisible: false
        });
    }

    hideQuizQuestions () {
        this.setState({
            isQuizQuestionsVisible: false
        });
    }

    getQuizName () {
        let quizzesArray = store.getState().module.quizzes;
        let quiz_id = parseInt(this.props.params.quiz_id);

        return quizzesArray.filter((quiz) => {
            return quiz_id === quiz.quiz_id;
        }).map((quiz) => {
            return quiz.name;
        })[0];
    }

    render () {

        let { members, isFetchingQuizMembers, questions, params, handleUpdateScore, handleEditScore } = this.props;
        let quizName = this.getQuizName();

        let mappedMembers = members.map((member, i) => {
            return (
                <tr key={ i } className="quiz-members">
                    <td>
                        <p>{ member.email }</p>
                    </td>
                    <td>
                        <p>{ member.username }</p>
                    </td>
                    <td>
                        <p>{ member.score }</p>
                    </td>
                    <td>
                        <button className="button is-warning" onClick={ () => this.showEditScore(i) }>Edit Score</button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                {
                    isFetchingQuizMembers && <Spinner />
                }
                {
                    !isFetchingQuizMembers && members &&
                    <div className="quiz-members container average">

                        <EditScoreModal
                            isVisible={ this.state.isEditScoreVisible }
                            hide={ this.hideEditScore }
                            member_key={ this.state.member_key }
                            members={ store.getState().quizMembers.members }
                            quiz_id={ params.quiz_id }
                            module_id={ params.module_id }
                            handleEditScore={ handleEditScore }
                            handleUpdateScore={ handleUpdateScore }/>

                        <QuizMembersModal
                            isVisible={ this.state.isQuizQuestionsVisible }
                            questions={ questions }
                            hide={ this.hideQuizQuestions }/>

                        <h2 className="has-text-centered"> Quiz History </h2>
                        <h3 className="has-text-centered"> { quizName } </h3>
                        <div className="column">
                            <Link to={ `/${this.props.params.module_id}/lecturer` }>
                                <button className="button is-3 is-light is-inverted">
                                    <span className="icon">
                                        <i className="fa fa-chevron-left"></i>
                                    </span>
                                    <span>Back to { this.props.params.module_id }</span>
                                </button>
                            </Link>
                        </div>

                        <div className="has-text-centered">
                            <button className="button is-info" onClick={ () => this.showQuizQuestions() }>
                                Show quiz questions
                            </button>
                        </div>

                        <div className="section">
                            <h3>Quiz Members</h3>
                            <table className="table">
                                <thead>
                                    <th>
                                        <label className="label">Email</label>
                                    </th>
                                    <th>
                                        <label className="label">Nickname</label>
                                    </th>
                                    <th colSpan="2">
                                        <label className="label">Score</label>
                                    </th>
                                </thead>
                                <tbody>
                                    { mappedMembers }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

QuizMembers.propTypes = {
    members: PropTypes.array,
    isFetchingQuizMembers: PropTypes.bool,
    params: PropTypes.object,
    questions: PropTypes.array,
    handleEditScore: PropTypes.func,
    handleUpdateScore: PropTypes.func
};

export default QuizMembers;
