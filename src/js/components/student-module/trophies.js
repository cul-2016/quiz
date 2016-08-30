import React, { PropTypes } from 'react';
import normaliseLabel from '../../lib/normaliseLabel';


const Trophies = ({ trophies, trophies_awarded }) => { //eslint-disable-line

    let mappedTrophies = [];

    if (trophies) {

        mappedTrophies = trophies.map((name, i) => {
            return (
                <div className="box column has-text-centered" key={ i }>
                    <div className="label">{ normaliseLabel(name) }</div>
                    <img src="https://cloud.githubusercontent.com/assets/8915092/18100873/7ccfd0e8-6ee4-11e6-846b-627d2b828956.png" />
                </div>
            );
        });
    }

    return (
        <div className="section">
            <h4>Trophies</h4>
            <div className="columns">
                { mappedTrophies }
            </div>
        </div>
    );
};

Trophies.propTypes = {
    trophies: PropTypes.array,
    trophies_awarded: PropTypes.object
};

export default Trophies;
