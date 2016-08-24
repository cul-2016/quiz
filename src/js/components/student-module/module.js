import React, { PropTypes } from 'react';
import { Link } from 'react-router'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import Nav from '../general/nav';
import Tabs from './tabs';
import Spinner from '../general/spinner';

const StudentModule = ({ location, children, username,
                        isFetchingModule, isQuizOpen,
                        quiz_id, question, response }) => { //eslint-disable-line no-unused-vars


    let buttonAreaClasses = classnames("section has-text-centered", {
        "animated-infinite pulse": isQuizOpen
    });

    let buttonClasses = classnames("button is-medium", {
        "is-warning": isQuizOpen,
        "is-disabled": !isQuizOpen
    });

    let url = location.pathname.split('/');
    let livePath = `/${url[1]}/${url[2]}/live`;

    return (
        <div>
        {
            isFetchingModule && <Spinner/>
        }
        {
            !isFetchingModule &&
            <div>
                <Nav username={ username } />
                <div className={ buttonAreaClasses }>
                    <Link to={ livePath }>
                        <button className={ buttonClasses }>
                            JOIN THE LIVE QUIZ!
                        </button>
                    </Link>
                </div>
                <Tabs location={ location } />

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
