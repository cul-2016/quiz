import React, { PropTypes } from 'react';
import Trophies from './trophies';
import Medals from './medals';
import Quizzes from './quizzes';


const Module = ({ module, quizzes }) => { // eslint-disable-line no-unused-vars

    return (
        <div>
            <div>
                <h3>{ module.name }</h3>
                <h5>{ module.module_id }</h5>
                <p>{ `Users: ${module.numUsers}` }</p>
                <Trophies trophies={ module.trophies } />
                <Medals medals={ module.medals } />
            </div>
            <div>
                <Quizzes quizzes={ quizzes } />
            </div>
        </div>
    );
};

Module.propTypes = {
    module: PropTypes.object.isRequired,
    quizzes: PropTypes.array.isRequired
};

export default Module;
