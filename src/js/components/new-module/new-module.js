import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import Details from './details';
import Medals from './medals';
import Trophies from './trophies';
import validateForm from '../../lib/validateForm';
import text from '../../lib/newModuleRollovers.json';


const NewModule = ({ isValidatingModuleID, moduleIDExists,
                     medals, trophies, updateMedalVals, updateTrophyVals,
                     handleInputChange, handleCodeInputChange, submit,
                     module_id, name }) => {


    function applyOffset (originalValue, offset) {

        return !isNaN(originalValue) ? originalValue + offset : '-';
    }

    let validationClasses = classnames("button is-success has-text-centered", {
        "is-disabled": validateForm(name, module_id, moduleIDExists, medals, trophies)
    });


    return (
            <div>
                <div className="new-module container">
                    <h2 className="has-text-centered"> Add a new module </h2>
                    <div className="column">
                        <Link to={ `/dashboard` }>
                            <button className="button is-3 is-light is-inverted">
                                <span className="icon">
                                    <i className="fa fa-chevron-left"></i>
                                </span>
                                <span>Back to Dashboard</span>
                            </button>
                        </Link>
                    </div>
                    <div className="notification container average is-info has-text-centered">
                        <p> { text.newModule } </p>
                    </div>
                    <div className="columns">
                        <Details module_id={ module_id }
                                 moduleIDExists={ moduleIDExists }
                                 isValidatingModuleID={ isValidatingModuleID }
                                 module_id_length={ module_id.length }
                                 handleCodeInputChange={ handleCodeInputChange }
                                 handleInputChange={ handleInputChange } />
                        <Medals medals={ medals }
                                updateMedalVals={ updateMedalVals }
                                applyOffset={ applyOffset }/>

                        <Trophies trophies={ trophies }
                                  updateTrophyVals={ updateTrophyVals }
                                  applyOffset={ applyOffset } />
                    </div>
                    <div className="has-text-centered">
                        <button className={ validationClasses } onClick={ submit }>
                            Save module
                        </button>
                    </div>
                </div>
            </div>
    );
};

NewModule.propTypes = {
    moduleIDExists: PropTypes.bool,
    isValidatingModuleID: PropTypes.bool.isRequired,
    medals: PropTypes.array.isRequired,
    trophies: PropTypes.object.isRequired,
    updateMedalVals: PropTypes.func.isRequired,
    updateTrophyVals: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleCodeInputChange: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    module_id: PropTypes.string,
    name: PropTypes.string.isRequired
};

export default NewModule;
