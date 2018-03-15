import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const UserTable = ({ users, handleDeleteUser, handleEditClient, title, superAdminId }) => {
    const table = users.map((user, i) => {
        return (
            <tr key={ i } className={`leaderboard__row--${i % 2 === 0 || i === 0 ? 'even' : 'odd'}` }>
                <td className="f-body"> { user.email } </td>
                <td className="f-body"> { user.username } </td>
                <td>
                { users && user.account_management_id ?
                    <Link to='/super-admin/client'>
                        <button
                        className="button module__button button__primary"
                        onClick={ () => { handleEditClient(user); }}>
                            Edit
                        </button>
                    </Link>
                    :
                    <button
                    className={`button module__button button__primary ${(!user.email.includes('@') && user.username.includes('Anon:')) || (superAdminId === user.user_id) ? 'button__disabled' : ''}` }
                    onClick={() => { handleDeleteUser(user.user_id); }}>
                    Delete
                    </button>
                }
                </td>
            </tr>
        );
    });
    return (
        <div className="content__body">
            <h1 className="f-headline">{ title }</h1>
            <table>
                <thead>
                    <tr>
                        <th className="f-body f-body--white">Email</th>
                        <th className="f-body f-body--white">Username</th>
                        <th className="f-body f-body--white"></th>
                    </tr>
                </thead>
                <tbody>
                  { table }
                </tbody>
              </table>
          </div>
    );
};

UserTable.propTypes = {
    users: PropTypes.array,
    handleDeleteUser: PropTypes.func,
    handleEditClient: PropTypes.func,
    title: PropTypes.string,
    superAdminId: PropTypes.number
};

export default UserTable;
