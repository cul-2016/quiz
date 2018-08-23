const addPrivileges = require('./addPrivileges.js');
const deletePrivileges = require('./deletePrivileges.js');

module.exports = function (axios, name, id, cb) {
  let cid;
  axios.post(`${process.env.FORUM_URL}/api/v2/categories`, {
    name: name
  })
  .then((res) => {
    cid = res.data.payload.cid;
    return addPrivileges(axios, cid, [id], ['moderate']);
  })
  .then((res) => {
    return deletePrivileges(axios, cid, [
      'registered-users',
      'guests',
      'spiders'
    ], [
      'groups:find',
      'groups:read',
      'groups:topics:read',
      'groups:topics:create',
      'groups:topics:reply',
      'groups:topics:tag',
      'groups:posts:edit',
      'groups:posts:history',
      'groups:posts:delete',
      'groups:posts:upvote',
      'groups:posts:downvote',
      'groups:topics:delete',
      'groups:posts:view_deleted',
      'groups:purge',
      'groups:moderate'
    ], cb);
  })
  .catch(err => {
    return cb(err);
  });
};
