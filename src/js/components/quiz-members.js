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
      console.log('you clicked hide');
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


        let { members, isFetchingQuizMembers, questions, params, handleUpdateScore, handleEditScore, isSurvey } = this.props;
        let quizName = this.getQuizName();

        let mappedMembers = members.map((member, i) => {
            return (
                <div key={ i } className="quiz-member">
                    <div className="member__details">
                      <p className="f-label f-label--dark">{ member.username }</p>
                      <p className="f-small-body f-small-body--slim">{ member.email }</p>
                    </div>
                    {
                      !isSurvey &&
                      <div className="member__score-details">
                          <div className="member__score">
                            <p>{ member.score } / {questions.length}</p>
                          </div>
                          <div className="member__score-percentage">
                            <p>{ (member.score  / questions.length) * 100 }%</p>
                          </div>
                          <div className="member__edit-score" onClick={ () => this.showEditScore(i) }>
                            <p className="f-body f-body--primary">Edit Score</p>
                          </div>
                      </div>
                    }

                    <EditScoreModal
                      member={ member }
                      isVisible={ this.state.isEditScoreVisible }
                      hide={ this.hideEditScore }
                      member_key={ this.state.member_key }
                      members={ store.getState().quizMembers.members }
                      quiz_id={ params.quiz_id }
                      module_id={ params.module_id }
                      handleEditScore={ handleEditScore }
                      handleUpdateScore={ handleUpdateScore }/>

                </div>
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

                      <ul className="navbar navbar--invisible">
                          <li className="navbar__item">
                              <Link to={ `${this.props.params.module_id}/lecturer` } className="f-body navbar__link navbar__link--left navbar__link--quit">
                                Back
                              </Link>
                          </li>
                      </ul>

                      <div className="content__body">
                          <p className="f-headline">Students&#39; Individual Scores</p>
                          <p className="f-title">In {quizName}</p>
                        <section>
                            { mappedMembers }
                        </section>
                      </div>

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

                        <div className="has-text-centered">
                            <button className="button is-info show-quiz-questions-button" onClick={ () => this.showQuizQuestions() }>
                                Show quiz questions
                            </button>
                        </div>

                        <div className="section is-hidden-mobile">
                            <h3>Quiz Members</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>
                                            <label className="f-label">Email</label>
                                        </th>
                                        <th>
                                            <label className="f-label">Nickname</label>
                                        </th>
                                        {
                                            !isSurvey &&
                                            <th colSpan="2">
                                                <label className="f-label">Score</label>
                                            </th>
                                        }
                                    </tr>
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
    handleUpdateScore: PropTypes.func,
    isSurvey: PropTypes.bool
};

export default QuizMembers;
