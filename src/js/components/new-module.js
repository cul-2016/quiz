import React, { PropTypes } from 'react';
import ValidationIcon from './validation-icon';


class NewModule extends React.Component {

    constructor (props) {

        super(props);

        this.handleCodeInput = this.handleCodeInput.bind(this);
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

    showCodeValidationIcon () {

        let node = this.refs.module_id;

        if (node) {
            if (node.value.length >= 4) {

                return this.props.moduleIDExists ? <i className="fa fa-times" /> : <i className="fa fa-check" />;
            } else {
                console.log("got nothing");
                return <i />;
            }
        }
    }

    handleCodeInput (value) {

        this.props.validateID(value);
        this.showCodeValidationIcon();
    }

    render () {

        const { medals, trophies, updateMedalVals, moduleIDExists } = this.props;

        return (
            <div>
                <h1>Add a new module</h1>
                <div>
                    <label>Code</label>
                    <input ref="module_id" name="module_id" type="text" maxLength="4" onChange={ (e) => this.handleCodeInput(e.target.value) } />
                    <ValidationIcon node={ this.refs.module_id } moduleIDExists={ moduleIDExists } />
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
    moduleIDExists: PropTypes.bool
};

export default NewModule;
