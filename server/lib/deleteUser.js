import query from './query';
import uuid from 'uuid/v1'

const deleteUser = (client, user_id, callback) => {

    // hash email randomise
    // username hash

    const userQuery = 'UPDATE users SET email = $1, username = $2 WHERE user_id = $3;';
    const hashed_email = uuid();
    const hashed_username = `Anon:${Math.round((Math.random() * 100000))}`;
    query(client, userQuery, [hashed_email, hashed_username, user_id], (error, response) => {
        /* istanbul ignore if */
        if (error) callback(error);
        callback(null, response);
    });
};

module.exports = deleteUser;
