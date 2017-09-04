import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const HoldingPage = ({ is_lecturer, params }) => {

    return (
      <div className="content content--pattern-background content--join-quiz">

          <ul className="navbar navbar--invisible">
            <div className="navbar__inner">
              <li className="navbar__item navbar__item--onlyone">
                  <Link to={ `${params.module_id}/${is_lecturer ? 'lecturer' : 'student'}` } className="f-body navbar__link button">
                    Quit
                  </Link>
              </li>
            </div>
          </ul>

          <div className="content__body">
              <div className="quiz__titles">
                  <div>
                      <img className="holding-logo" src="/assets/dashboard_tile_logo.svg" alt="Letter Q Icon"/>
                  </div>
                  <h1 className="quiz__name f-headline"> When you are ready, click the button below to review the quiz with your students.</h1>
              </div>
              <div className="quiz__titles-holding-button">
                  <Link to={ `${params.module_id}/${params.quiz_id}/review` }>
                      <button className="button button--large button__primary start-quiz-button">
                          Review the quiz
                      </button>
                  </Link>
              </div>
          </div>
        </div>
    );
};

HoldingPage.propTypes = {
    is_lecturer: PropTypes.bool,
    params: PropTypes.object.isRequired
};

export default HoldingPage;
