import React, { PropTypes } from 'react';
import UserTable from './user-table';

const SuperAdminDashboard = ({
    students,
    lecturers,
    handleDeleteUser,
    handleDownloadData,
    superAdminId
}) => {

    const buttonContainerStyle = {
        textAlign: 'center',
        padding: '1rem'
    };

    return (
      <div>
          <div style={buttonContainerStyle}>
              <button
                  className="button module__button button__primary"
                  onClick={ () => { handleDownloadData(`/super-admin/full-question-set`); } }
                  >
                  Download All Question Data
              </button>
              <button
                  className="button module__button button__primary"
                  onClick={ () => { handleDownloadData(`/super-admin/full-answer-set`); } }
                  >
                  Download All Answer Data
              </button>
          </div>
          <div className="leaderboard">
              <UserTable users={ lecturers } superAdminId={ superAdminId } title={ "lecturers" } handleDeleteUser={ handleDeleteUser } />
              <UserTable users={ students } title={ "students" } handleDeleteUser={ handleDeleteUser } />
          </div>
      </div>
    );
};

SuperAdminDashboard.propTypes = {
    students: PropTypes.array,
    lecturers: PropTypes.array,
    handleDeleteUser: PropTypes.func,
    handleDownloadData: PropTypes.func,
    superAdminId: PropTypes.number
};

export default SuperAdminDashboard;
