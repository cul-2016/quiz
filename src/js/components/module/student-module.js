import React, { PropTypes } from 'react';
import Nav from '../general/nav';
import { Link } from 'react-router'; // eslint-disable-line no-unused-vars
import Spinner from '../general/spinner';
import classnames from 'classnames';

const StudentModule = ({ location, isFetchingModule, username, isQuizOpen, quiz_id, question, response }) => { //eslint-disable-line

    let buttonClasses = classnames("button is-success is-medium", {
        "display-none": !isQuizOpen
    });

    return (
        <div>
        {
            isFetchingModule && <Spinner/>
        }
        {
            !isFetchingModule &&
            <div>
                <Nav username={ username } />
                <div className="section has-text-centered">
                <Link to={`${location.pathname}/live`}>
                    <button className={ buttonClasses }>
                        JOIN THE LIVE QUIZ!
                    </button>
                </Link>
                </div>
                <div className="section">
                    <h2 className="has-text-centered">Past Quizzes</h2>
                    <div className="box column is-8 is-offset-2 module-list-item">
                            <div>
                                Week 1 Quiz 80%
                            </div>
                    </div>
                </div>


            </div>
        }
        </div>
    );
};

StudentModule.propTypes = {
    location: PropTypes.object.isRequired,
    isFetchingModule: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    isQuizOpen: PropTypes.bool.isRequired,
    quiz_id: PropTypes.number,
    question: PropTypes.string,
    response: PropTypes.string
};

export default StudentModule;
