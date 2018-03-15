import React, { PropTypes } from 'react';
import UserTable from './user-table';
import { Link } from 'react-router';

const SuperAdminDashboard = ({
    students,
    lecturers,
    clients,
    handleDeleteUser,
    handleEditClient,
    handleDownloadData,
    superAdminId,
    handleClearClientForm
}) => {

    const buttonContainerStyle = {
        textAlign: 'center',
        padding: '1rem'
    };

    return (
      <div>
          <div style={buttonContainerStyle}>
                <Link to="/super-admin/client">
                    <button
                        onClick={() => handleClearClientForm() }
                        className="button module__button"
                        >
                        Add a Client
                    </button>
                </Link>
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
              <UserTable users={ clients } title={ "clients" } handleEditClient={ handleEditClient }/>
              <UserTable users={ lecturers } superAdminId={ superAdminId } title={ "lecturers" } handleDeleteUser={ handleDeleteUser } />
              <UserTable users={ students } title={ "students" } handleDeleteUser={ handleDeleteUser } />
          </div>
      </div>
    );
};

SuperAdminDashboard.propTypes = {
    students: PropTypes.array,
    lecturers: PropTypes.array,
    clients: PropTypes.array,
    handleDeleteUser: PropTypes.func,
    handleEditClient: PropTypes.func,
    handleDownloadData: PropTypes.func,
    handleClearClientForm: PropTypes.func,
    superAdminId: PropTypes.number
};

export default SuperAdminDashboard;
