import React, { PropTypes } from 'react';


const StudentHistory = ({ history }) => {

    return (
        <div className="box">
            Here be the student history
        </div>
    );
};

StudentHistory.propTypes = {
    history: PropTypes.array
};

export default StudentHistory;
