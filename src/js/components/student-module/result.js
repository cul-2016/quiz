import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import normaliseText from '../../lib/normaliseText';
import showNavbar from '../../lib/showNavbar';


const Result = ({ location, score, newTrophies }) => {

    let module_id = location.pathname.split('/')[1];
    newTrophies = newTrophies || [];

    let trophiesToPresent = newTrophies.map((trophy, i) => {

        return (
            <div key={ i } className="column animated bounceInUp">
                <div className="trophy" />
                <p>{ normaliseText(trophy) }</p>
            </div>
        );
    });

    let scoreClasses = classnames("title score animated bounceInUp", {
        "large": trophiesToPresent.length === 0,
        "small": trophiesToPresent.length > 0
    });

    return (
        <div className="result hero is-info is-bold is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <h2 className="subtitle">Your score is...</h2>
                    <div className="columns is-mobile">
                        { trophiesToPresent }
                    </div>
                    <h1 className={ scoreClasses }>
                        { score }
                    </h1>
                </div>
            </div>
            <div className="hero-foot">
                <Link to={ `/${module_id}/student` }>
                    <button onClick={ (e) => { showNavbar(e); } } className="button is-large is-success is-fullwidth">
                        Finish
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
