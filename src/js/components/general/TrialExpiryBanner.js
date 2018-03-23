import React, { PropTypes } from 'react';

const TrialExpiryBanner = ({ trial_expiry_time }) => {
    var dateObj = Date(trial_expiry_time);
    var dateStr = dateObj.toString();

    return (
        <div className="trial-expiry-banner">
            { (trial_expiry_time >= Date.now()) &&
                <div><p>You are using the trial version of Qoudl. This free trial will expire on { dateStr }. </p>
                <p>Please make sure you upgrade or finish running all your quizzes before then. </p></div>
            }
        </div>
    );
};

TrialExpiryBanner.propTypes = {
    trial_expiry_time: PropTypes.string
};

export default TrialExpiryBanner;
