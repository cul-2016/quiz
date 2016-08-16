import React, { PropTypes } from 'react'; //eslint-disable-line no-unused-vars
import Spinner from '../general/spinner';
import Nav from '../general/nav';

const Members = ({ users, isFetchingMembers, isRemovingMember, username, handleRemovingMember, location }) => {

    let module_id = location.pathname.split('/')[1];
    let mappedUsers;
    if (users) {
        mappedUsers = users.map((user, i) => {
            return (
                <div key={ i } className="box narrow">
                    <span>{ user.user_id }</span>
                    <h4>{ user.email }</h4>
                    <label className='label'>username</label>{ user.username }
                    <button className="button is-danger" onClick={ () => handleRemovingMember(module_id, user.user_id) }>
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
            isFetchingMembers || isRemovingMember && <Spinner />
        }
        {
            !isFetchingMembers && users &&
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

Members.propTypes = {
    users: PropTypes.array,
    isFetchingMembers: PropTypes.bool.isRequired,
    isRemovingMember: PropTypes.bool.isRequired,
    username: PropTypes.string,
    handleRemovingMember: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
};

export default Members;
