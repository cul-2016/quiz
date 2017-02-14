import React, { PropTypes } from 'react';
import classnames from 'classnames';


const Medal = ({ percentageScore, medalConditions }) => {

    const medalClass = classnames("medal-small", {
        "medal-small--gold": percentageScore >= medalConditions[1],
        "medal-small--silver": percentageScore >= medalConditions[0] && percentageScore < medalConditions[1],
        "medal-small--bronze": percentageScore < medalConditions[0] && percentageScore >= 0
    });

    return (
        <div className="medal-container">
            <div className="ribbon" />
            <div className={ medalClass } />
        </div>
    );
};

Medal.propTypes = {
    percentageScore: PropTypes.number.isRequired,
    medalConditions: PropTypes.array.isRequired
};

export default Medal;
