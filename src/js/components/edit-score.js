import React, { PropTypes } from 'react';

const EditQuiz = ({ members, params, handleScoreChange, handleEditScore }) => {

    let member_key = params.member_key;
    let quiz_id = params.quiz_id;
    let module_id = params.module_id;
    let user_id = members[member_key].user_id;
    let score = members[member_key].score;

    return (
        <section className="hero is-primary is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="columns">
                        <div className="box column is-one-third is-offset-one-third">
                            <h2 className="login-title">
                              Edit Score
                            </h2>
                            <label className="label">Score</label>
                            <input
                                className="input"
                                value={ members[member_key].score || '' }
                                onChange={ (e) => handleScoreChange(e.target.value, member_key)}
                                type="number"
                                placeholder="Module Name"
                                />
                            <button className="button is-warning" onClick={ () => handleEditScore(module_id, quiz_id, user_id, score) }>
                                Edit Score
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

EditQuiz.propTypes = {
    members: PropTypes.array,
    params: PropTypes.object,
    handleScoreChange: PropTypes.func,
    handleEditScore: PropTypes.func
};

export default EditQuiz;
