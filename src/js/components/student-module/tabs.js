import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';


const Tabs = ({ location }) => {

    let feedbackClasses = classnames("tabs", {
        "is-active": location.pathname.indexOf("feedback") > -1
    });
    let historyClasses = classnames("tabs", {
        "is-active": location.pathname.indexOf("history") > -1
    });
    let currentURL = location.pathname.split('/');

    let feedbackURL = `/${currentURL[1]}/${currentURL[2]}/feedback`;
    let historyURL = `/${currentURL[1]}/${currentURL[2]}/history`;

    return (
        <div className="tabs is-boxed">
            <ul>
                <li className={ feedbackClasses }>
                    <Link to={ feedbackURL }>Feedback</Link>
                </li>
                <li className={ historyClasses }>
                    <Link to={ historyURL }>History</Link>
                </li>
            </ul>
        </div>
    );
};

Tabs.propTypes = {
    location: PropTypes.object.isRequired
};

export default Tabs;
