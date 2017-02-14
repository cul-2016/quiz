import React, { PropTypes } from 'react';
import Details from './details';
import Medals from './medals';
import Trophies from './trophies';


const NewModule = ({ module_id_length, isValidatingModuleID, moduleIDExists,
                     medals, trophies, updateMedalVals, updateTrophyVals,
                     handleInputChange, handleCodeInputChange, submit }) => {


    function applyOffset (originalValue, offset) {

        return !isNaN(originalValue) ? originalValue + offset : '-';
    }


    return (
            <div className="new-module container">
                <h1 className="f-title is-2">Add a new module</h1>

                <Details moduleIDExists={ moduleIDExists }
                         isValidatingModuleID={ isValidatingModuleID }
                         module_id_length={ module_id_length }
                         handleCodeInputChange={ handleCodeInputChange }
                         handleInputChange={ handleInputChange } />

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
    );
};

NewModule.propTypes = {
    moduleIDExists: PropTypes.bool,
    isValidatingModuleID: PropTypes.bool.isRequired,
    module_id_length: PropTypes.number.isRequired,
    medals: PropTypes.array.isRequired,
    trophies: PropTypes.object.isRequired,
    updateMedalVals: PropTypes.func.isRequired,
    updateTrophyVals: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleCodeInputChange: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
};

export default NewModule;
