import React, { PropTypes } from 'react';
import { Link } from 'react-router'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import Nav from '../general/nav';
import Tabs from './tabs';
import Spinner from '../general/spinner';

const StudentModule = ({ location, children, username,
                        isFetchingModule, isQuizOpen,
                        quiz_id, question, response }) => { //eslint-disable-line no-unused-vars

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
                <Tabs location={ location } />
                <div className="section has-text-centered">
                    <Link to={`${location.pathname}/live`}>
                        <button className={ buttonClasses }>
                            JOIN THE LIVE QUIZ!
                        </button>
                    </Link>
                </div>
                <div className="section">
                    { children }
                </div>
            </div>
        }
        </div>
    );
};

StudentModule.propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.object,
    isFetchingModule: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    isQuizOpen: PropTypes.bool.isRequired,
    quiz_id: PropTypes.number,
    question: PropTypes.string,
    response: PropTypes.string
};

export default StudentModule;
