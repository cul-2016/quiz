import React, { PropTypes } from 'react';
import classnames from 'classnames';


const RemoveStudentModal = ({ module_id, handleRemovingMember, user_id, isVisible, hide, username, member }) => {

    let modalClasses = classnames("modal", {
        "display-none": !isVisible || username !== member.username
    });


    return (
        <div className={ modalClasses }>
                <div className="remove__student">
                  <p className="f-body">  Are you sure you would like to delete { username }? </p>
                  <button className="button button__primary" onClick={ () => { handleRemovingMember(user_id, module_id); hide(); } }>
                      Remove User
                    </button>
                    <button className="button button__tertiary" onClick={ () => { hide(); } }>
                      Cancel
                    </button>
                </div>
        </div>
    );
};

RemoveStudentModal.propTypes = {
    module_id: PropTypes.string.isRequired,
    handleRemovingMember: PropTypes.func.isRequired,
    user_id: PropTypes.number.isRequired,
    isVisible: PropTypes.bool.isRequired,
    history: PropTypes.array,
    hide: PropTypes.func.isRequired,
    username: PropTypes.string,
    member: PropTypes.object
};

export default RemoveStudentModal;
