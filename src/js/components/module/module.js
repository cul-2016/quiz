import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Details from './details.js';
import Quizzes from './quizzes.js';
const  Surveys = Quizzes;
import Spinner from '../general/spinner';

const Module = ({
    location,
    module,
    quizzes,
    surveys,
    isFetchingModule,
    sendQuizInvite,
    handleSetIsSurvey,
    handleGenerateShareId,
    handleImportCode,
    handleSubmitImportCode }) => {

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
                        handleSetIsSurvey={ handleSetIsSurvey }
                        handleGenerateShareId={ handleGenerateShareId }/>

                    <Surveys quizzes={ surveys }
                        isSurvey={ true }
                        location={ location }
                        sendQuizInvite={ sendQuizInvite }
                        module_id={ module.module_id }
                        handleSetIsSurvey={ handleSetIsSurvey }
                        handleGenerateShareId={ handleGenerateShareId }/>

                    <Link className="module__button__link" to={ `${module.module_id}/new-quiz` } >
                        <button className="button button__secondary quizzes__button">
                            <span className="icon">
                                <i className="fa fa-plus" />
                            </span>
                            <span>Add a new Survey/Quiz</span>
                        </button>
                    </Link>
                    <div className="or-container">
                      <div className="horizontal-spacer"></div>
                      <div className="or">OR</div>
                      <div className="horizontal-spacer"></div>
                    </div>
                    <div className="import-container">
                        <input
                            className="form__input form__input--import"
                            placeholder="CODE"
                            name="share_id"
                            type="text"
                            onChange={ (e) => handleImportCode(e.target.value) } />

                        <button
                            className="button button__secondary quizzes__button"
                            onClick={ () => {
                                handleSubmitImportCode(module.importCode, module.module_id);
                            }} >Import Survey/Quiz</button>
                        { module.error &&
                            <p className="module__err-message">No quiz found with this code</p>
                        }
                    </div>
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
    handleSetIsSurvey: PropTypes.func.isRequired,
    handleGenerateShareId: PropTypes.func.isRequired,
    handleImportCode: PropTypes.func.isRequired,
    handleSubmitImportCode: PropTypes.func.isRequired,
    importCode: PropTypes.string,
    error: PropTypes.string
};

Module.defaultProps = {
    surveys: []
};

export default Module;
