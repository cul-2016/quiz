import React, { PropTypes } from 'react';
import Nav from '../general/nav';
import Details from './details';
import Quizzes from './quizzes';
import { Link } from 'react-router';
import Spinner from '../general/spinner';


const Module = ({ location, module, quizzes, isFetchingModule, username, sendQuizInvite }) => { // eslint-disable-line no-unused-vars

    return (
        <div>
        {
            isFetchingModule && <Spinner/>
        }
        {
            !isFetchingModule &&
            <div>
                <Nav username={ username } />
                <div className="container module">

                    <Link to={ `${module.module_id}/leaderboard` }>
                        <button className="button">
                            Leaderboard
                        </button>
                    </Link>

                    <Link to={ `${module.module_id}/new-quiz` } >

                        <button className="button">
                            Add a new quiz
                        </button>
                    </Link>


                    <Details name={ module.name }
                             module_id={ module.module_id }
                             num_enrolled={ module.num_enrolled }
                             trophies={ module.trophies }
                             medals={ module.medals }/>

                    <Quizzes quizzes={ quizzes }
                        location={ location }
                        sendQuizInvite={ sendQuizInvite }
                        module_id={ module.module_id }/>
                </div>
            </div>
        }
        </div>
    );
};

Module.propTypes = {
    location: PropTypes.object.isRequired,
    module: PropTypes.object,
    quizzes: PropTypes.array,
    isFetchingModule: PropTypes.bool.isRequired,
    username: PropTypes.string,
    sendQuizInvite: PropTypes.func.isRequired
};

export default Module;
