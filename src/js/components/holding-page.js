import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const HoldingPage = ({ is_lecturer, params }) => {

    return (
      <div className="content content--pattern-background content--join-quiz">

          <ul className="navbar navbar--invisible">
              <li className="navbar__item">
                  <Link to={ `${params.module_id}/${is_lecturer ? 'lecturer' : 'student'}` } className="f-body navbar__link navbar__link--left navbar__link--quit">
                    Quit
                  </Link>
              </li>
          </ul>

          <div className="content__body">
              <div className="quiz__titles">
                  <span className="quiz__status-indicator quiz__status-indicator--off f-subheader f-subheader--tertiary">Live Now</span>
                  <img className="quiz__titles-icon" src="/assets/logo/Login_signup_icon.svg" alt="Letter Q Icon"/>
                  <h1 className="quiz__name f-display"> When you are ready, click the button below to review the quiz with your students.</h1>
              </div>
              <Link to={ `${params.module_id}/${params.quiz_id}/review` }>
                  <button className="button button--large button__primary start-quiz-button">
                      Review the quiz
                  </button>
              </Link>
          </div>
        </div>
    );
};

HoldingPage.propTypes = {
    is_lecturer: PropTypes.bool,
    params: PropTypes.object.isRequired
};

export default HoldingPage;
