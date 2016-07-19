import React, { PropTypes } from 'react';
import ValidationIcon from './validation-icon';


class NewModule extends React.Component {

    constructor (props) {

        super(props);

        this.handleCodeInput = this.handleCodeInput.bind(this);

        if (this.refs.module_id) {
            this.state = {
                codeLength: this.refs.module_id.value.length
            };
        }
    }

    doMaths (originalValue, offset) {

        return !isNaN(originalValue) ? originalValue + offset : '-';
    }

    getTrophyComponent (trophies) {

        return trophies.trophy_name.map((name, i) => {

            return (
                <div key={ i }>
                    <span>{ name }</span>
                    <input type="number" min="1" max="100" defaultValue={ trophies.condition[i] } onChange={ (e) => this.props.updateTrophyVals(name, e.target.value) } />
                </div>
            );
        });
    }

    handleCodeInput (value) {

        this.props.validateID(value);
        this.setState({
            codeLength: value.length
        });
    }

    render () {
        console.log("rerendering??");
        const { medals, trophies, updateMedalVals, moduleIDExists } = this.props;

        return (
            <div>
                <h1>Add a new module</h1>
                <div>
                    <label>Code</label>
                    <input ref="module_id" name="module_id" type="text" maxLength="4" onChange={ (e) => this.handleCodeInput(e.target.value) } />
                    <ValidationIcon codeLength={ undefined } moduleIDExists={ moduleIDExists } />
                    <label>Module name</label>
                    <input name="name" type="text" />
                </div>
                <br />
                <div>
                    <h3>Medals</h3>
                    <p>Bronze</p>
                    <span>0 to </span>
                    <input name="bronze" type="number" min="1" max="96" defaultValue={ this.doMaths(medals[0], -1) } onChange={ (e) => updateMedalVals('bronze', e.target.value) } />
                    <p>Silver</p>
                    <span className="silver lower-bound">{ medals[0] }</span> to <span className="silver upper-bound">{ medals[1] }</span>
                    <p>Gold</p>
                    <input name="gold" type="number" min="4" max="99" defaultValue={ this.doMaths(medals[1], 1) } onChange={ (e) => updateMedalVals('gold', e.target.value) } />
                    <span> to 100</span>
                </div>
                <div>
                    <h3>Trophies</h3>
                    { this.getTrophyComponent(trophies) }
                </div>
                <button onClick={ this.props.validateFormEntries }>
                    Create module
                </button>
            </div>
        );
    }
}

NewModule.propTypes = {
    medals: PropTypes.array.isRequired,
    trophies: PropTypes.object.isRequired,
    updateMedalVals: PropTypes.func.isRequired,
    updateTrophyVals: PropTypes.func.isRequired,
    validateID: PropTypes.func.isRequired,
    moduleIDExists: PropTypes.bool,
    validateFormEntries: PropTypes.func.isRequired
};

export default NewModule;
