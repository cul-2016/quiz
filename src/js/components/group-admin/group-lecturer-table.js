import React, { PropTypes } from 'react';
import classnames from 'classnames';

const GroupLecturerTable = ({ users, user_limit, user_count, updateUserIsActive }) => {
    const table = users.map((user, i) => {
        return (
            <tr key={ i } className={`leaderboard__row--${i % 2 === 0 || i === 0 ? 'even' : 'odd'}` }>
                <td className="f-body"> { user.email } </td>
                <td>
                    <RadioButton
                        is_user_active={user.is_user_active}
                        user_limit={user_limit}
                        user_count={user_count}
                        updateUserIsActive={updateUserIsActive}
                        user_id={user.user_id}/>
                </td>
            </tr>
        );
    });
    return (
        <div className="content__body">
            <h1 className="f-headline">Group Lecturers</h1>
            <div>
                {
                    user_count &&
                    <p className="f-subheader"> You have used <span className="f-subheader--tertiary">{user_count} / {user_limit}</span> seats for this account </p>
                }
                {
                    user_count && user_count === user_limit &&
                    <p> You have used all your seats, please contact Quodl to upgrade the account or deactivate some users to free up spaces </p>
                }
            </div>
            <div className="line" />
            <table>
                <thead>
                    <tr>
                        <th className="f-body f-body--heavy">Email</th>
                        <th className="f-body f-body--heavy">User Active</th>
                    </tr>
                </thead>
                <tbody>
                  { table }
                </tbody>
              </table>
          </div>
    );
};

const RadioButton = ({ is_user_active, user_limit, user_count, updateUserIsActive, user_id }) => {

    const sliderClass = classnames({
        "form__radio--off": !is_user_active,
        "form__radio--on": is_user_active
    });
    const sliderCircleClass = classnames({
        "form__radio--off--circle": !is_user_active,
        "form__radio--on--circle": is_user_active
    });
    const sliderCylinderClass = classnames({
        "form__radio--off--cylinder": !is_user_active,
        "form__radio--on--cylinder": is_user_active
    });

    const handleClick = () => {

        if (user_count < user_limit || is_user_active) {
            updateUserIsActive(user_id);
        }
    };

    return (
            <div className={ sliderClass }>
                <div onClick={ () => { handleClick(); }}>
                      <div className={ sliderCylinderClass }></div>
                      <div className= { sliderCircleClass }></div>
                </div>
            </div>
    );
};


RadioButton.propTypes = {
    is_user_active: PropTypes.bool,
    user_limit: PropTypes.number,
    user_count: PropTypes.number,
    updateUserIsActive: PropTypes.func,
    user_id: PropTypes.number
};

GroupLecturerTable.propTypes = {
    users: PropTypes.array,
    user_limit: PropTypes.number,
    user_count: PropTypes.number,
    updateUserIsActive: PropTypes.func
};

export default GroupLecturerTable;
