import React, { PropTypes } from 'react';
import applyOffset from '../../lib/applyOffset';
import normaliseText from '../../lib/normaliseText';
import Medal from '../general/medal';


const Medals = ({ medals }) => {

    return (
            <div className="module__medals">
                <h3>Medals</h3>
                <table className="module__table module__medal-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Medal</th>
                            <th>Threshold</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Medal percentageScore={ medals.condition[0] - 1 } medalConditions={ medals.condition } />
                            </td>
                            <td>{ normaliseText(medals.medal_name[0]) }</td>
                            <td> 0 - { applyOffset( medals.condition[0], -1) } </td>
                        </tr>

                        <tr>
                            <td>
                                <Medal percentageScore={ medals.condition[0] } medalConditions={ medals.condition } />
                            </td>
                            <td>{ normaliseText(medals.medal_name[1]) }</td>
                            <td> { medals.condition[0] }  - { medals.condition[1] } </td>
                        </tr>

                        <tr>
                            <td>
                                <Medal percentageScore={ medals.condition[1] + 1 } medalConditions={ medals.condition } />
                            </td>
                            <td>{ normaliseText(medals.medal_name[2]) }</td>
                            <td> { applyOffset(medals.condition[1], 1) } - 100 </td>
                        </tr>
                    </tbody>
                </table>
            </div>
    );
};

Medals.propTypes = {
    medals: PropTypes.object.isRequired
};

export default Medals;
