import React, { PropTypes } from 'react';
import normaliseText from '../../lib/normaliseText';


const Trophies = ({ trophies }) => {

    const mappedTrophies = trophies.trophy_name.map((name, i) => {

        return (
            <tr className="module__table-row" key={ i }>
                <td>{ normaliseText(name) }</td>
                <td>{ trophies.condition[i] }</td>
            </tr>
        );
    });

    return (
        <div className="module__trophies">
            <h3>Trophies</h3>
            <table className="module__table module__trophie-table">
                <thead>
                    <tr>
                        <th>Trophy for</th>
                        <th>Threshold</th>
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
