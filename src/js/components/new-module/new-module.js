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

    let validationClasses = classnames("button button__primary f-subheader", {
        "button__disabled": validateForm(name, module_id, moduleIDExists, medals, trophies)
    });


    return (
              <div className="new-module">
                  <ul className="navbar navbar--invisible">
                    <li className="navbar__item">
                      <Link to={ `/dashboard` } className="navbar__link navbar__link--left navbar__link--back">
                        Back
                      </Link>
                    </li>
                  </ul>
                  <div className="content__body">
                    <h2 className="f-headline f-headline--primary"> New Module </h2>
                    <div className="columns">
                      <Details module_id={ module_id }
                        moduleIDExists={ moduleIDExists }
                        isValidatingModuleID={ isValidatingModuleID }
                        module_id_length={ module_id.length }
                        handleCodeInputChange={ handleCodeInputChange }
                        handleInputChange={ handleInputChange } />
                      <p className="line line--primary"></p>
                      <h2 className="f-subheader f-subheader--light"> Medals and Trophies </h2>
                      <Medals medals={ medals }
                        updateMedalVals={ updateMedalVals }
                        applyOffset={ applyOffset }/>

                      <Trophies trophies={ trophies }
                        updateTrophyVals={ updateTrophyVals }
                        applyOffset={ applyOffset } />
                      <p className="line line--primary"></p>
                    </div>
                      <button className={ validationClasses } onClick={ submit }>
                        Save Module
                      </button>

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
