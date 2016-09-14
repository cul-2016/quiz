import React, { PropTypes } from 'react';


const StudentHistory = ({ history }) => {

    let mappedHistory = history.map((quiz, i) => {
        return (
            <div key={ i }>
                <div className="box average">
                    <span>{ quiz.name }</span>
                    <span>Score: { quiz.score }</span>
                    <span>out of: { quiz.num_questions }</span>
                </div>
            </div>
        );
    });

    return (
        <div>
            { mappedHistory }
        </div>
    );
};

StudentHistory.propTypes = {
    history: PropTypes.array
};

export default StudentHistory;
