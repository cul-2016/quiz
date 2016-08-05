import React, { PropTypes } from 'react';
import Trophies from './trophies';
import Medals from './medals';
import Quizzes from './quizzes';
import { Link } from 'react-router';
import Spinner from '../general/spinner';

const Module = ({ module, quizzes, isFetchingModule }) => { // eslint-disable-line no-unused-vars

    return (
        <div>
        {
            isFetchingModule && <Spinner/>
        }
        {
            !isFetchingModule &&
            <div>
                <div>
                    <Link to={module.module_id + '/new-quiz'} >
                        <button>
                            Add a new Quiz
                        </button>
                    </Link>
                    <h3>{ module.name }</h3>
                    <h5>{ module.module_id }</h5>
                    <p>{ `Users: ${module.num_enrolled}` }</p>
                    <Trophies trophies={ module.trophies } />
                    <Medals medals={ module.medals } />
                </div>
                <div>
                    <Quizzes quizzes={ quizzes } />
                </div>
            </div>
        }
        </div>
    );
};

Module.propTypes = {
    module: PropTypes.object.isRequired,
    quizzes: PropTypes.array.isRequired,
    isFetchingModule: PropTypes.func.isRequired
};

export default Module;
