import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Spinner from './general/spinner';
import QuizMembersModal from './quiz-members-modal';
import { store } from '../store.js';

class QuizMembers extends Component {

    constructor (props) {
        super(props);
        this.state = {
            isModalVisible: false
        };
        this.showQuizQuestions = this.showQuizQuestions.bind(this);
        this.hideQuizQuestions = this.hideQuizQuestions.bind(this);
    }
    showQuizQuestions () {
        this.setState({
            isModalVisible: true
        });
    }

    hideQuizQuestions () {
        this.setState({
            isModalVisible: false
        });
    }

    getQuizName () {
        let quizzesArray = store.getState().module.quizzes;
        let quiz_id = this.props.params.quiz_id;
        console.log(quizzesArray, quiz_id);
        return quizzesArray.filter((quiz) => {
            return quiz_id == quiz.quiz_id;
        }).map((quiz) => {
            return quiz.name;
        });
    }

    render () {
        let { members, isFetchingQuizMembers, questions, params } = this.props;
        let quizName = this.getQuizName();
        console.log(quizName);



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
                        <Link to={ `${params.module_id}/${params.quiz_id}/${i}/edit-score` }>
                            <button className="button is-warning">Edit Score</button>
                        </Link>
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

                        <QuizMembersModal isVisible={ this.state.isModalVisible } questions={ questions } hide={ this.hideQuizQuestions }/>
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
    questions: PropTypes.array
};

export default QuizMembers;
