import React, { PropTypes, Component } from 'react';
import { hashHistory } from 'react-router';
import classnames from 'classnames';
import normaliseText from '../../lib/normaliseText';
import showNavbar from '../../lib/showNavbar';
import { elastic } from '../../lib/animate';


export default class Result extends Component {

    constructor (props) {
        super(props);
    }

    returnToDashboard (e, path) {

        e.preventDefault();
        showNavbar(e);
        hashHistory.push(path);
    }

    render () {

        elastic('.trophy-container');

        let { score, newTrophies, params } = this.props;

        let module_id = params.module_id;
        newTrophies = newTrophies || [];

        let trophiesToPresent = newTrophies.map((trophy, i) => {

            return (
                <div key={ i } className="column trophy-container">
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
                    <button onClick={ (e) => { this.returnToDashboard(e, `/${module_id}/student`); } } className="button is-large is-success is-fullwidth">
                        Finish
                    </button>
                </div>
            </div>
        );
    }
}

Result.propTypes = {
    params: PropTypes.object,
    score: PropTypes.number.isRequired,
    newTrophies: PropTypes.array
};
