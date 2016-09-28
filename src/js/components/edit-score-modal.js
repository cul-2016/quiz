import React, { PropTypes } from 'react';
import classnames from 'classnames';

const EditScoreModal = ({ members, member_key, quiz_id, module_id, handleUpdateScore, handleEditScore, hide, isVisible }) => {

    let user_id, score, value;
    if (member_key !== undefined) {
        user_id = members[member_key].user_id;
        score = members[member_key].score;
        value = members[member_key].score;
    }

    let modalClasses = classnames("modal", {
        "is-active": isVisible
    });

    return (
        <div className={ modalClasses }>
            <div className="modal-background" />

            <div className="modal-content section container edit-score-modal">
                <div className="has-text-centered">
                    <h2>
                      Edit Score
                    </h2>
                    <label className="label">Score</label>
                    <input
                        className="input"
                        value={ value || '' }
                        onChange={ (e) => handleUpdateScore(e.target.value, member_key)}
                        type="number"
                        placeholder="Module Name"
                        />
                    <div>
                        <button className="button is-warning" onClick={ () => { handleEditScore(module_id, quiz_id, user_id, score); hide(); } }>
                            Edit Score
                        </button>
                    </div>
                </div>
            </div>
            <button className="modal-close" onClick={ () => hide() } />
        </div>
    );
};

EditScoreModal.propTypes = {
    members: PropTypes.array,
    module_id: PropTypes.string,
    quiz_id: PropTypes.string,
    member_key: PropTypes.number,
    handleUpdateScore: PropTypes.func,
    handleEditScore: PropTypes.func,
    hide: PropTypes.func,
    isVisible: PropTypes.bool
};

export default EditScoreModal;
