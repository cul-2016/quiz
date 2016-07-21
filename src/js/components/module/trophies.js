import React, { PropTypes } from 'react';


const Trophies = ({ trophies }) => {

    const mappedTrophies = trophies.trophy_name.map((name, i) => {

        return (
            <div key={ i }>
                <div>{ name }</div>
                <div>{ trophies.condition[i] }</div>
            </div>
        );
    });

    return (
        <div>
            <h4>Trophies</h4>
            { mappedTrophies }
        </div>
    );
};

Trophies.propTypes = {
    trophies: PropTypes.object.isRequired
};

export default Trophies;
