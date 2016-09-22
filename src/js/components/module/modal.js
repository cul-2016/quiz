import React, { PropTypes } from 'react';
import classnames from 'classnames';
import StudentHistory from '../student-module/history';
import Spinner from '../general/spinner';


const Modal = ({ isVisible, history, medalConditions, hide, username }) => {

    let modalClasses = classnames("modal", {
        "is-active": isVisible
    });

    return (
        <div className={ modalClasses }>
            <div className="modal-background" />
            { !history && <Spinner /> }
            {
                history &&
                <div className="modal-container">
                    <div className="modal-content box">
                        <h3>{ `${username}'s quiz history` }</h3>
                        <StudentHistory history={ history } medalConditions={ medalConditions } />
                    </div>
                </div>
            }
            <button className="modal-close" onClick={ () => hide() } />
        </div>
    );
};

Modal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    history: PropTypes.array,
    medalConditions: PropTypes.array,
    hide: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
};

export default Modal;
