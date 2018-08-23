module.exports = function (axios, cid, users, privileges, cb) {
  axios.delete(`${process.env.FORUM_URL}/api/v2/categories/${cid}/privileges`, {
    data: {
      privileges: privileges,
      groups: users
    }
  })
  .then((res) => {
    res.data.payload.cid = cid;
    if (cb) {
      return cb(null, res);
    }
    return res;
  })
  .catch(err => {
    return cb(err);
  });
};
