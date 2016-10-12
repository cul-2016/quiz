import React, { PropTypes } from 'react';
import classnames from 'classnames';


const Trophies = ({ data }) => {

    const trophyNames = ["first_quiz", "high_score", "overall_average", "participation"];

    let trophiesAwarded = trophyNames.map((name, i) => {
        console.log(">>>>>", data[name]);
        let trophyClasses = classnames("fa fa-trophy", {
            "awarded": data[name]
        });
        console.log(trophyClasses);
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
