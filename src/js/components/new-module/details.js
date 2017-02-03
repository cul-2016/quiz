import React, { PropTypes } from 'react';
import classnames from 'classnames';
import text from '../../lib/newModuleRollovers.json';

const REQUIRED_ID_LENGTH = 4;

class Details extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: false,
            code: false
        };
    }

    toggleRollover (text) {
        this.setState({
            [text]: !this.state[text]
        });
    }

    render () {

        let { module_id, moduleIDExists, isValidatingModuleID, module_id_length, handleCodeInputChange, handleInputChange } = this.props;

        const moduleIDClasses = classnames("input", {
            "is-danger": moduleIDExists === true && !isValidatingModuleID && module_id_length === REQUIRED_ID_LENGTH,
            "is-success": moduleIDExists === false && !isValidatingModuleID && module_id_length === REQUIRED_ID_LENGTH
        });

        const iconClasses = classnames("fa", {
            "fa-warning": moduleIDExists === true && !isValidatingModuleID && module_id_length === REQUIRED_ID_LENGTH,
            "fa-check": moduleIDExists === false && !isValidatingModuleID && module_id_length === REQUIRED_ID_LENGTH
        });
        console.log(moduleIDExists, module_id_length, REQUIRED_ID_LENGTH, isValidatingModuleID);
        const moduleIDHelpClasses = classnames("f-small-body", {
            "f-small-body--light": moduleIDExists === true && !isValidatingModuleID && module_id_length === REQUIRED_ID_LENGTH,
        });
        console.log(moduleIDHelpClasses);
        const toggleClassnamesName = classnames("notification container average is-info has-text-centered ", {
            "display-none": !this.state.name
        });

        const toggleClassnamesCode = classnames("notification container average is-info has-text-centered ", {
            "display-none": !this.state.code
        });

        return (
            <div className="section column">

                <label className="f-label form__label">Name</label>
                <input
                    className="form__input form__input--new-module"
                    placeholder="e.g. Analytics"
                    name="name"
                    type="text"
                    onChange={ (e) => handleInputChange('name', e.target.value) } />

                <label className="f-label form__label">Module Code (4 Letters)</label>

                <p className="control has-icon has-icon-right">
                    <input
                        className="form__input form__input--new-module form__input--new-module--code"
                        placeholder="CODE"
                        value={ module_id }
                        name="module_id"
                        type="text"
                        maxLength="4"
                        onChange={ (e) => handleCodeInputChange('module_id', e.target.value) } />
                    <i className={ iconClasses } />
                    <span className={ moduleIDHelpClasses }> This code already exists.  Please choose another.</span>
                </p>

            </div>
        );

    }
}

Details.propTypes = {
    module_id: PropTypes.string,
    moduleIDExists: PropTypes.bool,
    isValidatingModuleID: PropTypes.bool.isRequired,
    module_id_length: PropTypes.number.isRequired,
    handleCodeInputChange: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired
};

export default Details;
