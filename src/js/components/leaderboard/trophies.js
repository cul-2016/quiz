import React, { PropTypes } from 'react';
import classnames from 'classnames';


const Trophies = ({ data }) => {

    const trophyNames = ["first_quiz", "high_score", "overall_average", "participation"];

    let trophiesAwarded = trophyNames.map((name, i) => {
        let trophyClasses = classnames("fa fa-trophy", {
            "awarded": data[name]
        });
        return (
            <i key={ i } className={ trophyClasses } />
        );
    });

    return (
        <div className="trophies">
            { trophiesAwarded }
        </div>
    );
};

Trophies.propTypes = {
    data: PropTypes.object.isRequired
};

export default Trophies;
