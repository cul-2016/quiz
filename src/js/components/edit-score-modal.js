import React, { PropTypes } from 'react';
import classnames from 'classnames';


const EditScoreModal = ({ members, member_key, quiz_id, module_id, handleUpdateScore, handleEditScore, hide, isVisible, member }) => {
    let user_id, score, value;
    if (member_key !== undefined) {
        user_id = members[member_key].user_id;
        score = members[member_key].score;
        value = members[member_key].score;
    }

    let modalClasses = classnames({
        "display-none": !isVisible || member.user_id !== user_id
    });


    return (
        <div className={ modalClasses }>

            <div className="edit__user__score">
                <p className="f-small-body f-small-body--grey">  Edit Score </p>
                <p className="f-small-body f-small-body--grey"> Score </p>
                <input
                  className="form__input form__input--edit-score"
                  value={ value || '' }
                  onChange={ (e) => handleUpdateScore(e.target.value, member_key)}
                  type="number"
                  placeholder="0"
                  />
                <button className="button button__primary" onClick={ () => { handleEditScore(module_id, quiz_id, user_id, score); hide(); } }>
                    Edit Score
                  </button>
                  <button className="button button__tertiary" onClick={ () => { hide(); } }>
                    Cancel
                  </button>
            </div>
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
    isVisible: PropTypes.bool,
    member: PropTypes.object
};

export default EditScoreModal;
