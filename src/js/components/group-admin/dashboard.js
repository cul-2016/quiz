import React, { PropTypes } from 'react';
import UserTable from '../super-admin/user-table';

const GroupAdminDashboard = ({ lecturers, groupAdminId, deleteLecturer }) => {

    return (
        <div>
            <div className="leaderboard">
                <UserTable users={lecturers} superAdminId={groupAdminId} title={"lecturers"} handleDeleteUser={deleteLecturer} />
            </div>
        </div>
    );
};

GroupAdminDashboard.propTypes = {
    lecturers: PropTypes.array,
    groupAdminId: PropTypes.number,
    deleteLecturer: PropTypes.func
};

export default GroupAdminDashboard;
