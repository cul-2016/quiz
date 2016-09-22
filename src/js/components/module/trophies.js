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
            <h4>Trophies</h4>
            <table className="table">
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
