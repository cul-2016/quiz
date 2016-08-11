import React, { PropTypes } from 'react';
import Medals from './medals';
import Trophies from './trophies';
import classnames from 'classnames';


const NewModule = ({ module_id_length, isValidatingModuleID, moduleIDExists,
                     medals, trophies, updateMedalVals, updateTrophyVals,
                     handleInputChange, handleCodeInputChange, submit }) => {


    function applyOffset (originalValue, offset) {

        return !isNaN(originalValue) ? originalValue + offset : '-';
    }

    const moduleIDClasses = classnames("input", {
        "is-danger": !isValidatingModuleID && module_id_length === 4 && moduleIDExists === true,
        "is-success": !isValidatingModuleID && module_id_length === 4 && moduleIDExists === false
    });

    const iconClasses = classnames("fa", {
        "fa-warning": !isValidatingModuleID && module_id_length === 4 && moduleIDExists === true,
        "fa-check": !isValidatingModuleID && module_id_length === 4 && moduleIDExists === false
    });

    const moduleIDHelpClasses = classnames("help is-white", {
        "is-danger": !isValidatingModuleID && module_id_length === 4 && moduleIDExists === true
    });

    return (
        <div className="container has-text-centered">
            <div className="columns">
                <div className="box column is-8 is-offset-2">
                    <h2>Add a new module</h2>
                    <p>Please choose a <strong>unique</strong> code for your module.</p>
                    <label className="label">Code</label>
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

                    <label className="label">Module name</label>
                    <input
                        className="input"
                        name="name"
                        type="text"
                        onChange={ (e) => handleInputChange('name', e.target.value) } />

                    <br />

                    <Medals medals={ medals }
                            updateMedalVals={ updateMedalVals }
                            applyOffset={ applyOffset }/>

                    <Trophies trophies={ trophies }
                              updateTrophyVals={ updateTrophyVals }
                              applyOffset={ applyOffset } />

                    <button onClick={ submit }>
                        Save module
                    </button>
                </div>
            </div>
        </div>
    );
};

NewModule.propTypes = {
    module_id_length: PropTypes.number.isRequired,
    isValidatingModuleID: PropTypes.bool.isRequired,
    moduleIDExists: PropTypes.bool,
    medals: PropTypes.array.isRequired,
    trophies: PropTypes.object.isRequired,
    updateMedalVals: PropTypes.func.isRequired,
    updateTrophyVals: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleCodeInputChange: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
};

export default NewModule;
