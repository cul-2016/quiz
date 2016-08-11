import React, { PropTypes } from 'react';
import ValidationIcon from './general/validation-icon';


class NewModule extends React.Component {

    constructor (props) {

        super(props);

        if (this.refs.module_id) {
            this.state = {
                codeLength: this.refs.module_id.value.length
            };
        }
    }

    applyOffset (originalValue, offset) {

        return !isNaN(originalValue) ? originalValue + offset : '-';
    }

    getTrophyComponent (trophies) {

        return trophies.trophy_name.map((name, i) => {

            return (
                <div key={ i }>
                    <label className="label">{ name }</label>
                    <input className="input" type="number" min="1" max="100" defaultValue={ trophies.condition[i] } onChange={ (e) => this.props.updateTrophyVals(name, e.target.value) } />
                </div>
            );
        });
    }

    render () {

        const { medals, trophies, updateMedalVals, moduleIDExists } = this.props;

        return (
            <section className="hero is-primary is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="columns">
                            <div className="box column is-8 is-offset-2">
                                <h2>
                                 Add a new module
                                </h2>
                                <label className="label">Code</label>
                                <input
                                    className="input"
                                    ref="module_id"
                                    name="module_id"
                                    type="text"
                                    maxLength="4"
                                    onChange={ (e) => this.props.handleInputChange('module_id', e.target.value) } />
                                <ValidationIcon
                                    codeLength={ undefined } moduleIDExists={ moduleIDExists } />
                                <label className="label">Module name</label>
                                <input
                                    className="input"
                                    name="name"
                                    type="text"
                                    onChange={ (e) => this.props.handleInputChange('name', e.target.value) } />

                <br />
                <div>
                    <h3>Medals</h3>

                    <label className="label">Bronze</label>
                    <span className="label">0 to </span>
                    <input className="input" name="bronze" type="number" min="1" max="96" defaultValue={ this.applyOffset(medals[0], -1) } onChange={ (e) => updateMedalVals('bronze', e.target.value) } />
                    <label className="label">Silver</label>
                    <span className=" label silver lower-bound">{ medals[0] } </span><span className="label"> to </span><span className=" label silver upper-bound">{ medals[1] }</span>
                    <label className="label">Gold</label>
                    <input className="input" name="gold" type="number" min="4" max="99" defaultValue={ this.applyOffset(medals[1], 1) } onChange={ (e) => updateMedalVals('gold', e.target.value) } />
                    <span className="label"> to 100</span>
                </div>
                <div>
                    <h3>Trophies</h3>
                    { this.getTrophyComponent(trophies) }
                </div>
                <button onClick={ this.props.submit }>
                    Save module
                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

NewModule.propTypes = {
    medals: PropTypes.array.isRequired,
    trophies: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    updateMedalVals: PropTypes.func.isRequired,
    updateTrophyVals: PropTypes.func.isRequired,
    validateID: PropTypes.func,
    moduleIDExists: PropTypes.bool,
    submit: PropTypes.func.isRequired
};

export default NewModule;
