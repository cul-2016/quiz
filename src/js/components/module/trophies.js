import React, { PropTypes } from 'react';
import normaliseText from '../../lib/normaliseText';


const Trophies = ({ trophies }) => {

    const mappedTrophies = trophies.trophy_name.map((name, i) => {

        return (
            <tr className="has-text-centered" key={ i }>
                <td>{ normaliseText(name) }</td>
                <td>{ trophies.condition[i] }</td>
            </tr>
        );
    });

    return (
        <div className="section column">
            <h3>Trophies</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Trophy for</th>
                        <th>Condition</th>
                    </tr>
                </thead>
                <tbody>
                    { mappedTrophies }
                </tbody>
            </table>
        </div>
    );
};

Trophies.propTypes = {
    trophies: PropTypes.object.isRequired
};

export default Trophies;
