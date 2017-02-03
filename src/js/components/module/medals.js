import React, { PropTypes } from 'react';
import applyOffset from '../../lib/applyOffset';
import Medal from '../general/medal.js';

const Medals = ({ medals }) => {

    return (
      <div className="module__medals">
          <h4>Medal Thresholds</h4>
          
          <div className="module__medal-grouping">
              <Medal percentageScore={ medals.condition[1] + 1 } medalConditions={ medals.condition } />
              <div className="module__medal-percent"> { applyOffset(medals.condition[1], 1) } - 100% </div>
          </div>

          <div className="module__medal-grouping">
              <Medal percentageScore={ medals.condition[0] } medalConditions={ medals.condition } />
              <div className="module__medal-percent">{ medals.condition[0] }  - { medals.condition[1] }% </div>
          </div>

          <div className="module__medal-grouping">
              <Medal percentageScore={ medals.condition[0] - 1 } medalConditions={ medals.condition } />
              <div className="module__medal-percent"> 0 - { applyOffset( medals.condition[0], -1) }% </div>
          </div>

      </div>
    );
};

Medals.propTypes = {
    medals: PropTypes.object.isRequired
};

export default Medals;
