import React, { PropTypes } from 'react';
import Details from './details';
import Quizzes from './quizzes';
const  Surveys = Quizzes;
import Spinner from '../general/spinner';

const Module = ({ location, module, quizzes, surveys, isFetchingModule, sendQuizInvite }) => {

    return (
        <div>
        {
            isFetchingModule && <Spinner/>
        }
        {
            !isFetchingModule &&
            <div>
                <div className="container module">

                    <Details name={ module.name }
                             module_id={ module.module_id }
                             num_enrolled={ module.num_enrolled }
                             trophies={ module.trophies }
                             medals={ module.medals }/>

                    <Quizzes quizzes={ quizzes }
                        location={ location }
                        sendQuizInvite={ sendQuizInvite }
                        module_id={ module.module_id }/>

                    <Surveys quizzes={ surveys }
                        isSurvey={ true }
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
    surveys: PropTypes.array,
    isFetchingModule: PropTypes.bool.isRequired,
    sendQuizInvite: PropTypes.func.isRequired
};

Module.defaultProps = {
    surveys: []
};

export default Module;
