import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const Result = ({ score, location }) => {

    let module_id = location.pathname.split('/')[1];

    return (
        <div className="result hero is-info is-bold is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <h2 className="subtitle">Your score is...</h2>
                    <h1 className="title score animated bounceInUp">
                        { score }
                    </h1>
                </div>
            </div>
            <div className="hero-foot">
                <Link to={ `/${module_id}/student` }>
                    <button className="button is-large is-success is-fullwidth">
                        Back to module
                    </button>
                </Link>
            </div>
        </div>
    );

};

Result.propTypes = {
    score: PropTypes.number.isRequired,
    location: PropTypes.object
};

export default Result;
