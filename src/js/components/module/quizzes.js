import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';

const Quizzes = ({
    location,
    quizzes,
    sendQuizInvite,
    module_id,
    isSurvey,
    handleSetIsSurvey,
    handleGenerateShareId }) => {

    const surveyOrQuiz = isSurvey ? 'survey' : 'quiz';
    const surveyIdOrQuizId = isSurvey ? 'survey_id' : 'quiz_id';
    const surveyOrQuizCapitalized = isSurvey ? 'Survey' : 'Quiz';
    const surveyOrQuizPluralCapitalized = isSurvey ? 'Surveys' : 'Quizzes';

    const desktopView = quizzes.slice().reverse().map((quiz, index) => {
        return (
            <div
                className="quizzes__container"
                key={ index } >
                <div className="quizzes__container--id">
                    <img className="quizzes__container--id-icon" src="/assets/dashboard_tile_logo.svg"></img>
                    <h3 className="f-label quizzes__container--id-index">{ index + 1 }</h3>
                </div>
                <div className="quizzes__container--details">
                    <div className="f-body module-quiz__name">{ quiz.name }</div>
                    <div className="f-body--primary module-quiz__questions">{ `${ +quiz.num_questions } Question${ +quiz.num_questions === 1 ? '' : 's'}` }</div>
                    {
                        quiz.share_id === null
                        ?
                        <div
                        className="f-body--link f-body--dark module-quiz__name"
                        onClick={ () => {
                            handleGenerateShareId(quiz.quiz_id, quiz.survey_id, module_id);
                        }}>
                            Share
                        </div>
                        :
                        <div
                        className="f-body f-body--dark module-quiz__name">
                            Share Code: {quiz.share_id}
                        </div>
                    }
                </div>

                <div className="quizzes__container--actions">

                    {
                      !quiz.is_presented
                      ?
                      <span>
                          <div
                          className="quizzes__container--actions-icons"
                          onClick={ () => {
                              if (quiz.is_presented) {
                                  handleSetIsSurvey(quiz.quiz_id, quiz.survey_id);
                              }
                              const url = `${module_id}/${quiz[surveyIdOrQuizId]}/${
                                  quiz.is_presented ? 'members' : 'edit-' + surveyOrQuiz
                              }`;
                              hashHistory.push(url);
                          } }>
                              <img src="/assets/pencil_btn.svg"></img>
                              <h3 className="f-small-label"> Edit </h3>

                          </div>

                          <div
                          className="quizzes__container--actions-icons"
                          onClick={ (e) => {
                              e.stopPropagation();
                              hashHistory.push(`${location.pathname}/live`);
                              sendQuizInvite(quiz.quiz_id, quiz.survey_id, quiz.name, true);
                          } }>
                              <img src="/assets/eye_btn.svg"></img>
                              <h3
                              className="f-small-label"> Preview </h3>
                          </div>
                      </span>
                      :
                      <div
                      className="quizzes__container--actions-icons"
                      onClick={ () => {
                          if (quiz.is_presented) {
                              handleSetIsSurvey(quiz.quiz_id, quiz.survey_id);
                          }
                          const url = `${module_id}/${quiz[surveyIdOrQuizId]}/${
                              quiz.is_presented ? 'members' : 'edit-' + surveyOrQuiz
                          }`;
                          hashHistory.push(url);
                      } }>
                          <img src="/assets/details_btn.svg"></img>
                          <h3 className="f-small-label"> Details </h3>
                      </div>
                    }

                    {
                      quiz.is_presented
                      ? <div className="f-body f-body--dark quizzes__container--actions-icons">{ +quiz.num_entries } <br/> entries </div>
                      : <div
                            className="quizzes__container--actions-icons"
                            onClick={ (e) => {
                                e.stopPropagation();
                                hashHistory.push(`${location.pathname}/live`);
                                sendQuizInvite(quiz.quiz_id, quiz.survey_id, quiz.name);
                            } }>
                            <img src="/assets/button-circle-play.svg"></img>
                            <h3 className="f-small-label"> Run </h3>
                        </div>
                    }
                </div>
          </div>
        );
    });

    return (
        <div className="quizzes">
            <h3 className="headline module__headline">
               { surveyOrQuizPluralCapitalized }
            </h3>
            <div className="table">
                { desktopView }
            </div>
        </div>
    );
};

Quizzes.propTypes = {
    location: PropTypes.object.isRequired,
    quizzes: PropTypes.array.isRequired,
    sendQuizInvite: PropTypes.func.isRequired,
    module_id: PropTypes.string.isRequired,
    isSurvey: PropTypes.bool,
    handleSetIsSurvey: PropTypes.func.isRequired,
    handleGenerateShareId: PropTypes.func.isRequired,
};

export default Quizzes;
