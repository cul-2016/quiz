import React, { PropTypes } from 'react';


const SuperAdminDashboard = ({
    students,
    lecturers,
    handleDeleteUser
}) => {

    const studentsTable = students.map((student, i) => {
        return (
            <tr className={`leaderboard__row--${i % 2 === 0 || i === 0 ? 'even' : 'odd'}` }>
                <td className="f-body"> { student.email } </td>
                <td className="f-body"> { student.username } </td>
                <td><button className="button module__button button__tertiary" onClick={() => { handleDeleteUser(student.user_id); }}>Delete</button></td>
            </tr>
        );
    });
    const lecturersTable = lecturers.map((lecturer, i) => {
        return (
            <tr className={`leaderboard__row--${i % 2 === 0 || i === 0 ? 'even' : 'odd'}` }>
                <td className="f-body"> { lecturer.email } </td>
                <td className="f-body"> { lecturer.username } </td>
                <td><button className="button module__button button__tertiary" onClick={() => { handleDeleteUser(lecturer.user_id); }}>Delete</button></td>
            </tr>
        );
    });


    return (
      <div className="leaderboard">
      <div className="content__body">
          <h1 className="f-headline">Lecturers</h1>
          <table>
              <thead>
                  <tr>
                      <th className="f-body f-body--white">Email</th>
                      <th className="f-body f-body--white">Username</th>
                      <th className="f-body f-body--white"></th>
                  </tr>
              </thead>
              <tbody>
                { lecturersTable }
              </tbody>
            </table>
        </div>
        <div className="content__body">
            <h1 className="f-headline">Students</h1>
            <table>
                <thead>
                    <tr>
                        <th className="f-body f-body--white">Email</th>
                        <th className="f-body f-body--white">Username</th>
                        <th className="f-body f-body--white"></th>
                    </tr>
                </thead>
                <tbody>
                  { studentsTable }
                </tbody>
              </table>
          </div>
      </div>
    );
};

SuperAdminDashboard.propTypes = {
    students: PropTypes.array,
    lecturers: PropTypes.array,
    handleDeleteUser: PropTypes.func
};

export default SuperAdminDashboard;
