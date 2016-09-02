import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const Result = ({ location, score, newTrophies }) => {

    let module_id = location.pathname.split('/')[1];

    console.log("NEW TROPHIES", newTrophies);

    newTrophies = newTrophies || [];

    let trophiesToPresent = newTrophies.map((trophy, i) => {

        return (
            <div>
                <i className="fa fa-trophy awarded" />
                <span key={ i }>{ trophy }</span>
            </div>
        );
    });

    return (
        <div className="result hero is-info is-bold is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <h2 className="subtitle">Your score is...</h2>
                    <h1 className="title score animated bounceInUp">
                        { score }
                    </h1>

                    <div>
                        { trophiesToPresent }
                    </div>
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
    location: PropTypes.object,
    score: PropTypes.number.isRequired,
    newTrophies: PropTypes.array
};

export default Result;
