import React, { PropTypes } from 'react';
import normaliseText from '../../lib/normaliseText';
import classnames from 'classnames';


const Trophies = ({ trophies, trophies_awarded }) => {

    trophies = trophies || [];

    let mappedTrophiesOdd = trophies.map((name, i) => {

        let trophyClasses = classnames("trophy", {
            "not-awarded": trophies_awarded[name] === false
        });

        if (i % 2 !== 0) {

            return (
                <div className="box has-text-centered" key={ i }>
                    <div className="label">{ normaliseText(name) }</div>
                    <div className={ trophyClasses } />
                </div>
            );
        }
    });

    let mappedTrophiesEven = trophies.map((name, i) => {

        let trophyClasses = classnames("trophy", {
            "not-awarded": trophies_awarded[name] === false
        });

        if (i % 2 === 0) {

            return (
                <div className="box has-text-centered" key={ i }>
                    <div className="label">{ normaliseText(name) }</div>
                    <div className={ trophyClasses } />
                </div>
            );
        }
    });

    return (
        <div className="section transparent-background">
            <h3>Your trophies</h3>
            <div className="is-mobile columns trophies">
                <div className="column">

                    { mappedTrophiesOdd }
                </div>
                <div className="column">

                    { mappedTrophiesEven }
                </div>
            </div>
        </div>
    );
};

Trophies.propTypes = {
    trophies: PropTypes.array,
    trophies_awarded: PropTypes.object
};

export default Trophies;
