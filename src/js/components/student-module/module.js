import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import Nav from '../general/nav';
import Tabs from './tabs';
import Spinner from '../general/spinner';
import Trophies from './trophies';

const StudentModule = ({ location, children,
                        username, trophies, trophies_awarded,
                        isFetchingModule, isQuizOpen,
                        quiz_id, question, response, //eslint-disable-line no-unused-vars
                        handleJoiningQuiz, params }) => {


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
                    <Link to={ livePath } onClick={ () => { handleJoiningQuiz(params.module_id); }}>
                        <button className={ buttonClasses }>
                            JOIN THE LIVE QUIZ!
                        </button>
                    </Link>
                </div>
                <Tabs location={ location } />

                <Trophies trophies={ trophies } trophies_awarded={ trophies_awarded } />

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
    username: PropTypes.string.isRequired,
    trophies: PropTypes.array,
    trophies_awarded: PropTypes.object,
    isFetchingModule: PropTypes.bool.isRequired,
    isQuizOpen: PropTypes.bool.isRequired,
    quiz_id: PropTypes.number,
    question: PropTypes.string,
    response: PropTypes.string,
    handleJoiningQuiz: PropTypes.func,
    params: PropTypes.object
};

export default StudentModule;
