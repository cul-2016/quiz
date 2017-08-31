import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Details from './details.js';
import Quizzes from './quizzes.js';
const  Surveys = Quizzes;
import applyOffset from '../../lib/applyOffset';

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
        <div className="container">

            <div className="module">
                <div className="content__body content__body--quiz">
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
                </div>
                <div className="content__body--info">

                    <div className="card">
                        <img className="icon__svg" src="/assets/leaderboard/leader_board_icon.svg"></img>
                        <Link className="module__button__link" to={ `${module.module_id}/leaderboard` } >
                            <button className="button">
                                <span>View Leaderboard</span>
                            </button>
                        </Link>
                    </div>

                    <div className="card">
                        <img className="icon__svg" src="/assets/view_students_icon.svg"></img>
                        <Link className="module__button__link" to={ `${module.module_id}/members` } >
                            <button className="button">
                                <span>View Students</span>
                            </button>
                        </Link>
                    </div>

                    <div className="card card__medals">

                        <h3 className="f-title">Medal Threshold</h3>
                        <div className="content__body--medals">
                            <img className="icon__svg--medals" src="/assets/medals/bronze_medal.svg"></img>
                            <h3 className="f-small-label"> Bronze </h3>
                            <h3 className="f-small-label"> 0 - { applyOffset(module.medals.condition[0], -1) }% </h3>
                        </div>

                        <div className="content__body--medals">
                            <img className="icon__svg--medals" src="/assets/medals/silver_medal.svg"></img>
                            <h3 className="f-small-label">Silver </h3>
                            <h3 className="f-small-label">{ module.medals.condition[0] }  - { module.medals.condition[1] }% </h3>
                        </div>

                        <div className="content__body--medals">
                            <img className="icon__svg--medals" src="/assets/medals/gold_medal.svg"></img>
                            <h3 className="f-small-label"> Gold </h3>
                            <h3 className="f-small-label"> { applyOffset(module.medals.condition[1], 1) } - 100% </h3>
                        </div>

                    </div>





                </div>
            </div>






            <div>
                <div className="module content__body">


                <Details name={ module.name }
                    module_id={ module.module_id }
                    num_enrolled={ module.num_enrolled }
                    trophies={ module.trophies }
                    medals={ module.medals }/>


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
                            <p className="module__err-message">No quiz or survey found with this code</p>
                        }
                    </div>
                </div>
            </div>
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
