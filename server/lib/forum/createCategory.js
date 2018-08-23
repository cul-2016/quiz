const addPrivileges = require('./addPrivileges.js');
const deletePrivileges = require('./deletePrivileges.js');

const defaultPrivileges = require('./defaultPrivileges.js');

module.exports = function (axios, name, id, cb) {
  let cid;
  axios.post(`${process.env.FORUM_URL}/api/v2/categories`, {
    name: name
  })
  .then((res) => {
    cid = res.data.payload.cid;
    return addPrivileges(axios, cid, [id], defaultPrivileges.user.concat(['moderate']));
  })
  .then((res) => {
    return deletePrivileges(axios, cid, [
      'registered-users',
      'guests',
      'spiders'
    ], defaultPrivileges.group, cb);
  })
  .catch(err => {
    return cb(err);
  });
};
