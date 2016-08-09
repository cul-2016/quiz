import React, { PropTypes } from 'react';
import Nav from '../general/nav';
import { Link } from 'react-router'; // eslint-disable-line no-unused-vars
import Spinner from '../general/spinner';
import classnames from 'classnames';

const StudentModule = ({ isFetchingModule, username, isQuizOpen, quiz_id, question, response }) => { //eslint-disable-line

    let buttonClasses = classnames("button is-success", {
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
                THIS IS THE STUDENT VIEW

                <Link to='student/live'>
                    <button className={ buttonClasses }>
                        JOIN THE LIVE QUIZ!
                    </button>
                </Link>
            </div>
        }
        </div>
    );
};

StudentModule.propTypes = {
    isFetchingModule: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    isQuizOpen: PropTypes.bool.isRequired,
    quiz_id: PropTypes.number,
    question: PropTypes.string,
    response: PropTypes.string
};

export default StudentModule;
