import React, { PropTypes } from 'react';
import Nav from '../general/nav';
import Trophies from './trophies';
import Medals from './medals';
import Quizzes from './quizzes';
import { Link } from 'react-router';
import Spinner from '../general/spinner';

const Module = ({ module, quizzes, isFetchingModule, username }) => { // eslint-disable-line no-unused-vars

    return (
        <div>
        {
            isFetchingModule && <Spinner/>
        }
        {
            !isFetchingModule &&
            <div>
                <Nav username={ username } />

                <div className="column">

                    <Link to={ `${module.module_id}/leaderboard` }>
                        <button className="button">
                            Leaderboard
                        </button>
                    </Link>
                    
                    <Link to={ `${module.module_id}/new-quiz` } >

                        <button className="button">
                            Add a new Quiz
                        </button>
                    </Link>
                </div>

                <div className="box column is-8 is-offset-2">
                    <h3>{ module.name }</h3>
                    <h5>{ module.module_id }</h5>
                    <p>{ `Users: ${module.num_enrolled}` }</p>
                    <Trophies trophies={ module.trophies } />
                    <Medals medals={ module.medals } />
                </div>

                <Quizzes quizzes={ quizzes } />
            </div>
        }
        </div>
    );
};

Module.propTypes = {
    module: PropTypes.object,
    quizzes: PropTypes.array,
    isFetchingModule: PropTypes.bool.isRequired,
    username: PropTypes.string
};

export default Module;
