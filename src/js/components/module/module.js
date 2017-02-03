import React, { PropTypes } from 'react';
import Details from './details.js';
import Quizzes from './quizzes.js';
const  Surveys = Quizzes;
import Spinner from '../general/spinner';

const Module = ({ location, module, quizzes, surveys, isFetchingModule, sendQuizInvite, handleSetIsSurvey }) => {

    return (
        <div>
        {
            isFetchingModule && <Spinner/>
        }
        {
            !isFetchingModule &&
            <div>
                <div className="container module content__body">

                    <Details name={ module.name }
                             module_id={ module.module_id }
                             num_enrolled={ module.num_enrolled }
                             trophies={ module.trophies }
                             medals={ module.medals }/>

                    <Quizzes quizzes={ quizzes }
                        location={ location }
                        sendQuizInvite={ sendQuizInvite }
                        module_id={ module.module_id }
                        handleSetIsSurvey={ handleSetIsSurvey }/>

                    <Surveys quizzes={ surveys }
                        isSurvey={ true }
                        location={ location }
                        sendQuizInvite={ sendQuizInvite }
                        module_id={ module.module_id }
                        handleSetIsSurvey={ handleSetIsSurvey }/>
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
    sendQuizInvite: PropTypes.func.isRequired,
    handleSetIsSurvey: PropTypes.func.isRequired
};

Module.defaultProps = {
    surveys: []
};

export default Module;
