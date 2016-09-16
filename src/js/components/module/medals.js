import React, { PropTypes } from 'react';
import applyOffset from '../../lib/applyOffset';
import normaliseText from '../../lib/normaliseText';


const Medals = ({ medals }) => {

    return (
            <div className="section column">
                <h4>Medals</h4>
                <div className="columns has-text-centered">

                    <div className="box column">
                        <span className="label">{ normaliseText(medals.medal_name[0]) }</span>
                        <span> 0 - { applyOffset( medals.condition[0], -1) } </span>
                    </div>

                    <div className="box column">
                        <span className="label">{ normaliseText(medals.medal_name[1]) }</span>
                        <span> { medals.condition[0] }  - { medals.condition[1] } </span>
                    </div>

                    <div className="box column">
                        <span className="label">{ normaliseText(medals.medal_name[2]) }</span>
                        <span> { applyOffset(medals.condition[1], 1) } - 100 </span>
                    </div>
                </div>
            </div>
    );
};

Medals.propTypes = {
    medals: PropTypes.object.isRequired
};

export default Medals;
