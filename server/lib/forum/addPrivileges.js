module.exports = function (axios, cid, users, privileges, cb) {
  axios.put(`${process.env.FORUM_URL}/api/v2/categories/${cid}/privileges`, {
    privileges: privileges,
    groups: users
  })
  .then((res) => {
    return cb(null, res);
  })
  .catch(err => {
    return cb(err);
  });
};
