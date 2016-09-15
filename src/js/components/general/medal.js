import React, { PropTypes } from 'react';


const Medal = ({ colour }) => {

    return (
        <div className="medal-container">
            <div className={ `medal ${colour}` } />
        </div>
    );
};

Medal.propTypes = {
    colour: PropTypes.string.isRequired
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
