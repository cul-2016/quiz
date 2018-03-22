import React, { PropTypes } from 'react';
import GroupLecturerTable from '../group-admin/group-lecturer-table';

const GroupAdminDashboard = ({ lecturers, user_count, user_limit, updateUserIsActive, groupAdminId }) => {
    return (
        <div>
            <div className="leaderboard">
                <GroupLecturerTable
                users={lecturers}
                groupAdminId={groupAdminId}
                user_limit={user_limit}
                user_count={user_count}
                updateUserIsActive={updateUserIsActive} />
            </div>
        </div>
    );
};

GroupAdminDashboard.propTypes = {
    lecturers: PropTypes.array,
    user_count: PropTypes.number,
    groupAdminId: PropTypes.number,
    user_limit: PropTypes.number,
    updateUserIsActive: PropTypes.func
};

export default GroupAdminDashboard;
