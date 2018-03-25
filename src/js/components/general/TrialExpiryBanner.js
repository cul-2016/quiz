import React, { PropTypes } from 'react';
import classnames from 'classnames';


const TrialExpiryBanner = ({ location, trial_expiry_time, paid }) => {
    const hideTrialExpiryBanner = (path) => {
        return path === "/" || path.match(/live|holding-page|result|review|register-student|please-verify|verification|reset-password|performance|history|revise|add-new-module|leaderboard|new-quiz|edit-quiz|edit-survey|members|register-lecturer|privacy/);
    };

    let trialExpiryBannerClasses = classnames("", {
        "display-none": hideTrialExpiryBanner(location.pathname)
    });

    var parsedTrialExpiryTime = parseInt(trial_expiry_time); // convert trial_expiry_time from string to number
    var trialExpiryTimeDateObj = new Date(parsedTrialExpiryTime); // pass new number to Date constructor to create object
    var currentTimeDateObj = new Date();
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    var trialDaysRemaining = Math.round(Math.abs((currentTimeDateObj.getTime() - trialExpiryTimeDateObj.getTime()) / (oneDay)));

    return (
        <div className={ trialExpiryBannerClasses }>
            { (trialDaysRemaining <= 30 && !paid ) &&
                <div className="trial-expiry-banner">
                    <p>This free trial will expire in { trialDaysRemaining } { trialDaysRemaining == 1 ? 'day' : 'days' }. Please make sure you upgrade or finish running all your quizzes before then. </p>
                </div>
            }
        </div>
    );
};

TrialExpiryBanner.propTypes = {
    trial_expiry_time: PropTypes.string,
    location: PropTypes.object,
    paid: PropTypes.bool
};

export default TrialExpiryBanner;
