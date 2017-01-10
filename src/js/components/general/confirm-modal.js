import React, { PropTypes } from 'react';
import classnames from 'classnames';


const ConfirmModal = ({ isVisible, hide, removeMember, username, email, user_id, module_id }) => {

    let modalClasses = classnames("modal", {
        "is-active": isVisible
    });

    const removeMembersAndHideModal = (user_id, module_id) => {
        removeMember(module_id);
        hide();
    };

    return (
        <div className={ modalClasses }>
            <div className="modal-background" />
                <div className="modal-container">
                    <div className="modal-content box has-text-centered">
                        <h3>{ `Are you sure you want to delete this student?` }</h3>
                        <p>{ `${email} (${username})` }</p>
                        <button className="button is-danger" onClick={ () => removeMembersAndHideModal(user_id, module_id) }>
                            Delete student from module
                        </button>
                    </div>
                </div>
            <button className="modal-close" onClick={ () => hide() } />
        </div>
    );
};

ConfirmModal.propTypes =  {
    isVisible: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
    removeMember: PropTypes.func.isRequired,
    username: PropTypes.string,
    email: PropTypes.string,
    user_id: PropTypes.number,
    module_id: PropTypes.string
};

export default ConfirmModal;
