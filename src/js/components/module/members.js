import React, { PropTypes } from 'react'; //eslint-disable-line no-unused-vars
import Spinner from '../general/spinner';
import Nav from '../general/nav';

const Members = ({ members, isFetchingMembers, isRemovingMember, username, handleRemovingMember, location }) => {

    let module_id = location.pathname.split('/')[1];
    let mappedUsers = members.map((member, i) => {
        return (
            <div key={ i } className="box narrow">
                <span>{ member.user_id }</span>
                <h4>{ member.email }</h4>
                <label className='label'>username</label>{ member.username }
                <button className="button is-danger" onClick={ () => handleRemovingMember(module_id, member.user_id) }>
                <span className="icon">
                <i className="fa fa-times"></i>
                </span>
                <span>Remove User</span>
                </button>
            </div>
        );
    });

    return (
        <div>
        {
            isFetchingMembers || isRemovingMember && <Spinner />
        }
        {
            !isFetchingMembers && members &&
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
    members: PropTypes.array,
    isFetchingMembers: PropTypes.bool.isRequired,
    isRemovingMember: PropTypes.bool.isRequired,
    username: PropTypes.string,
    handleRemovingMember: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
};

export default Members;
