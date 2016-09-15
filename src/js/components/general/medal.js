import React, { PropTypes } from 'react';
import classnames from 'classnames';


const Medal = ({ percentageScore, medalConditions }) => {

    let medalClass = classnames("medal", {
        "gold": percentageScore >= medalConditions[1],
        "silver": percentageScore >= medalConditions[0] && percentageScore < medalConditions[1],
        "bronze": percentageScore < medalConditions[0]
    });


    return (
        <div className="medal-container">
            <div className={ medalClass } />
        </div>
    );
};

Medal.propTypes = {
    percentageScore: PropTypes.number.isRequired,
    medalConditions: PropTypes.array.isRequired
};

export default Medal;


/*

<div className="star-cluster">
    <div className="icon--twinkle star-a" />
    <div className="icon--twinkle delay-twinkle star-b" />
    <div className="icon--twinkle star-c" />
    <div className="icon--twinkle star-d" />
    <div className="icon--twinkle delay-twinkle star-e" />
</div>
*/
