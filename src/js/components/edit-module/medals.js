import React, { PropTypes } from 'react';

const Medals = ({ applyOffset, updateMedalVals, medals }) => {
    return (
        <div className="new-module-medals section">

            <h3>
                <i className="fa fa-shield" /> Medals
            </h3>

            <div className="columns">

                <div className="column box has-text-centered">

                    <label className="f-label">Bronze</label>
                    <span className="label-inline">0 to </span>
                    <input
                        name="bronze"
                        type="number"
                        min="1" max="96"
                        defaultValue={ applyOffset(medals[0], -1) }
                        onChange={ (e) => updateMedalVals('bronze', e.target.value) } />
                    <span className="label-inline">%</span>
                </div>

                <div className="column box has-text-centered">

                    <label className="f-label">Silver</label>
                    <span className="inline">{ `${medals[0]} to ${medals[1]} %` }</span>
                </div>

                <div className="column box has-text-centered">

                    <label className="f-label">Gold</label>
                    <input
                        name="gold"
                        type="number"
                        min="4" max="99"
                        defaultValue={ applyOffset(medals[1], 1) }
                        onChange={ (e) => updateMedalVals('gold', e.target.value) } />
                    <span className="label-inline"> to 100%</span>
                </div>
            </div>

        </div>
    );
};

Medals.propTypes = {
    applyOffset: PropTypes.func.isRequired,
    updateMedalVals: PropTypes.func.isRequired,
    medals: PropTypes.array.isRequired
};

export default Medals;
