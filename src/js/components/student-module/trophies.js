import React, { PropTypes } from 'react';
import normaliseText from '../../lib/normaliseText';
import classnames from 'classnames';


const Trophies = ({ trophies, trophies_awarded }) => {

    trophies = trophies || [];

    let mappedTrophies = trophies.map((name, i) => {

        let trophyClasses = classnames("fa fa-trophy", {
            "awarded": trophies_awarded[name]
        });

        return (
            <div className="box column has-text-centered" key={ i }>
                <div className="label">{ normaliseText(name) }</div>
                <i className={ trophyClasses } />
            </div>
        );
    });

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
