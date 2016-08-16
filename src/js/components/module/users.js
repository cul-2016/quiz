import React, { PropTypes } from 'react'; //eslint-disable-line no-unused-vars
import Spinner from '../general/spinner';
import Nav from '../general/nav';

const Users = ({ users, isFetchingModuleUsers, isRemovingMember, username, handleRemovingUser, location }) => {

    let module_id = location.pathname.split('/')[1];
    let mappedUsers;
    if (users) {
        mappedUsers = users.map((user, i) => {
            return (
                <div key={ i } className="box narrow">
                    <span>{ user.user_id }</span>
                    <h4>{ user.email }</h4>
                    <label className='label'>username</label>{ user.username }
                    <button className="button is-danger" onClick={ () => handleRemovingUser(module_id, user.user_id) }>
                    <span className="icon">
                    <i className="fa fa-times"></i>
                    </span>
                    <span>Remove User</span>
                    </button>
                </div>
            );
        });
    }

    return (
        <div>
        {
            isFetchingModuleUsers || isRemovingMember && <Spinner />
        }
        {
            !isFetchingModuleUsers && users &&
            <div>
                <Nav username={ username } />
                <div>
                    <h2 className="has-text-centered"> Users </h2>
                    { mappedUsers }
                </div>
            </div>

        }
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array,
    isFetchingModuleUsers: PropTypes.bool.isRequired,
    isRemovingMember: PropTypes.bool.isRequired,
    username: PropTypes.string,
    handleRemovingUser: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
};

export default Users;
