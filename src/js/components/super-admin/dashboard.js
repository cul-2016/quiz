import React, { PropTypes } from 'react';
import UserTable from './user-table';

const SuperAdminDashboard = ({
    students,
    lecturers,
    handleDeleteUser
}) => {

    return (
      <div className="leaderboard">
        <UserTable users={ lecturers } title={ "lecturers" } handleDeleteUser={ handleDeleteUser } />
        <UserTable users={ students } title={ "students" } handleDeleteUser={ handleDeleteUser } />
      </div>
    );
};

SuperAdminDashboard.propTypes = {
    students: PropTypes.array,
    lecturers: PropTypes.array,
    handleDeleteUser: PropTypes.func
};

export default SuperAdminDashboard;
