import React, { PropTypes } from 'react';
import applyOffset from '../../lib/applyOffset';

const Medals = ({ medals }) => {

    return (
            <div>
                <h4>Medals</h4>
                <div> { medals.medal_name[0] } <span> 0 - { applyOffset( medals.condition[0], -1) } </span></div>
                <div> { medals.medal_name[1] } <span> { medals.condition[0] }  - { medals.condition[1] } </span></div>
                <div> { medals.medal_name[2] } <span> { applyOffset(medals.condition[1], 1) } - 100 </span></div>
            </div>
    );
};

Medals.propTypes = {
    medals: PropTypes.object.isRequired
};

export default Medals;
