import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const EditQuiz = ({ members, params, handleUpdateScore, handleEditScore }) => {

    let member_key = params.member_key;
    let quiz_id = params.quiz_id;
    let module_id = params.module_id;
    let user_id = members[member_key].user_id;
    let score = members[member_key].score;
    return (
        <section className="edit-score hero is-primary is-fullheight">
            <div className="hero-body">
            <div className="container">
                    <div className="columns">
                        <div className="box column is-one-third is-offset-one-third">
                            <div className="column">
                                <Link to={ `/${params.module_id}/${params.quiz_id}/members` }>
                                    <button className="button is-3 is-light is-inverted">
                                        <span className="icon">
                                            <i className="fa fa-chevron-left"></i>
                                        </span>
                                        <span>Back to Quiz History</span>
                                    </button>
                                </Link>
                            </div>
                            <div className="has-text-centered">
                                <h2 className="login-title">
                                  Edit Score
                                </h2>
                                <label className="label">Score</label>
                                <input
                                    className="input"
                                    value={ members[member_key].score || '' }
                                    onChange={ (e) => handleUpdateScore(e.target.value, member_key)}
                                    type="number"
                                    placeholder="Module Name"
                                    />
                                <div>
                                    <button className="button is-warning" onClick={ () => handleEditScore(module_id, quiz_id, user_id, score) }>
                                        Edit Score
                                    </button>
                                </div>
                            </div>
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
    handleUpdateScore: PropTypes.func,
    handleEditScore: PropTypes.func
};

export default EditQuiz;
