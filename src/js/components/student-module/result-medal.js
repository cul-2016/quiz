import React, { PropTypes } from 'react';
import classnames from 'classnames';

const ResultMedal = ({ score, percentageScore, medalConditions, trophiesToPresent }) => {

    let scoreClasses = classnames("title score animated bounceInUp", {
        "large": trophiesToPresent.length === 0,
        "small": trophiesToPresent.length > 0
    });
    let medalClass = classnames({
        "medal gold": percentageScore >= medalConditions[1],
        "medal silver": percentageScore >= medalConditions[0] && percentageScore < medalConditions[1],
        "medal bronze": percentageScore < medalConditions[0] && percentageScore > 0
    });
    let ribbonClass = classnames({
        "ribbon": score !== 0
    });

    return (
        <div className="result-medal animated bounceInUp">
            <div className={ ribbonClass }></div>
            <div className={ medalClass }>
                <h1 className={ scoreClasses }>
                { score }
                </h1>
            </div>
        </div>
    );
};

ResultMedal.propTypes = {
    score: PropTypes.number.isRequired,
    percentageScore: PropTypes.number.isRequired,
    medalConditions: PropTypes.array.isRequired,
    trophiesToPresent: PropTypes.array.isRequired
};
export default ResultMedal;
