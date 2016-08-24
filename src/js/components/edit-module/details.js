import React, { PropTypes } from 'react';
import classnames from 'classnames';

const REQUIRED_LENGTH = 4;

const Details = ({ moduleIDExists, isValidatingModuleID, module_id_length, handleCodeInputChange, handleInputChange }) => {

    const moduleIDClasses = classnames("input", {
        "is-danger": moduleIDExists === true && !isValidatingModuleID && module_id_length === REQUIRED_LENGTH,
        "is-success": moduleIDExists === false && !isValidatingModuleID && module_id_length === REQUIRED_LENGTH
    });

    const iconClasses = classnames("fa", {
        "fa-warning": moduleIDExists === true && !isValidatingModuleID && module_id_length === REQUIRED_LENGTH,
        "fa-check": moduleIDExists === false && !isValidatingModuleID && module_id_length === REQUIRED_LENGTH
    });

    const moduleIDHelpClasses = classnames("help is-white", {
        "is-danger": moduleIDExists === true && !isValidatingModuleID && module_id_length === REQUIRED_LENGTH
    });

    return (
        <div className="section average">
            <h3>
                <i className="fa fa-pencil" /> Module name and code</h3>

            <div className="notification is-info has-text-centered">

                <p>Please choose a <strong>unique</strong> code for your module, <strong>4 characters in length</strong>.</p>
                <p>Students will use this code to join the module and access quizzes.</p>
            </div>

            <label className="label">Module name</label>
            <input
                className="input"
                name="name"
                type="text"
                onChange={ (e) => handleInputChange('name', e.target.value) } />

            <label className="label">Code (4 characters long)</label>
            <p className="control has-icon has-icon-right">

                <input
                    className={ moduleIDClasses }
                    name="module_id"
                    type="text"
                    maxLength="4"
                    onChange={ (e) => handleCodeInputChange('module_id', e.target.value) } />
                <i className={ iconClasses } />
                <span className={ moduleIDHelpClasses }> This code already exists.  Please choose another.</span>
            </p>
        </div>
    );
};

Details.propTypes = {
    moduleIDExists: PropTypes.bool,
    isValidatingModuleID: PropTypes.bool.isRequired,
    module_id_length: PropTypes.number.isRequired,
    handleCodeInputChange: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired
};

export default Details;
