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

        const moduleIDHelpClasses = classnames("help is-white", {
            "is-danger": moduleIDExists === true && !isValidatingModuleID && module_id_length === REQUIRED_ID_LENGTH
        });

        const toggleClassnamesName = classnames("notification container average is-info has-text-centered ", {
            "display-none": !this.state.name
        });

        const toggleClassnamesCode = classnames("notification container average is-info has-text-centered ", {
            "display-none": !this.state.code
        });

        return (
            <div className="section column">
                <h3>
                    <i className="fa fa-pencil" /> Module name and code
                </h3>


                <label className="f-label module-section-headers">Module name</label>
                <i onClick={ () => { this.toggleRollover("name");} } className="fa fa-question-circle help-icon" />
                <div className={ toggleClassnamesName }>
                <p>{ text.name }</p>
                </div>
                <input
                    className="input"
                    name="name"
                    type="text"
                    onChange={ (e) => handleInputChange('name', e.target.value) } />

                <label className="f-label module-section-headers">Code (4 characters long)</label>
                <i onClick={ () => { this.toggleRollover("code");} } className="fa fa-question-circle help-icon" />
                <div className={ toggleClassnamesCode }>
                <p> { text.code }</p>
                </div>
                <p className="control has-icon has-icon-right">
                    <input
                        className={ moduleIDClasses }
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
