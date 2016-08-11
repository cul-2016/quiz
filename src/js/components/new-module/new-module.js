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
        <div className="">
            <div className="">
                <div className="">
                    <h2>Add a new module</h2>

                    <div className="notification is-info has-text-centered">

                        <p>Please choose a <strong>unique</strong> code for your module.</p>
                        <p>Students will use this code to register for your module.</p>
                        <p>It must be <strong>4 characters</strong> in length.</p>
                    </div>
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

                          <button className="button is-success is-large" onClick={ submit }>
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
