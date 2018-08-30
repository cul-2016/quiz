import React, { PropTypes } from 'react';
import GroupLecturerTable from '../group-admin/group-lecturer-table';

const GroupAdminDashboard = ({ lecturers, user_count, user_limit, updateUserIsActive, groupAdmin, groupAdminId, handleDownloadData }) => {
    const buttonContainerStyle = {
        textAlign: 'center',
        padding: '1rem'
    };

    return (
        <div>
            <div style={buttonContainerStyle}>
                <button
                    className="button module__button button__primary"
                    onClick={ () => { handleDownloadData(`/group-admin/full-group-data`); } }
                    >
                    Download Group Data
                </button>
            </div>
            <div className="leaderboard">
                <GroupLecturerTable
                users={lecturers}
                groupAdminId={groupAdminId}
                groupAdmin={groupAdmin}
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
    groupAdmin: PropTypes.object,
    user_limit: PropTypes.number,
    updateUserIsActive: PropTypes.func,
    handleDownloadData: PropTypes.func
};

export default GroupAdminDashboard;
