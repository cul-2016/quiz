const addPrivileges = require('./addPrivileges.js');

module.exports = function (axios, name, id, cb) {
  axios.post(`${process.env.FORUM_URL}/api/v2/categories`, {
    name: name
  })
  .then((res) => {
    return addPrivileges(axios, res.data.payload.cid, [id], ['moderate'], cb);
  })
  .catch(err => {
    return cb(err);
  });
};
