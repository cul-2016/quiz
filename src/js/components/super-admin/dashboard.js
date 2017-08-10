import React, { PropTypes } from 'react';


const SuperAdminDashboard = ({
    students,
    lecturers
}) => {
    return (
      <div>Wooooooo!</div>
    );
};

SuperAdminDashboard.propTypes = {
    students: PropTypes.array,
    lecturers: PropTypes.array
};

export default SuperAdminDashboard;
