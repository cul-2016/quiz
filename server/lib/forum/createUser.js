module.exports = function (axios, email, cb) {
  axios.post(`${process.env.FORUM_URL}/api/v2/users/`, {
    username: generateUsername(email)
  })
  .then((res) => {
    if (cb) {
      return cb(null, res);
    }
    return res;
  })
  .catch(err => {
    return cb(err);
  });
};

function generateUsername(email) {
  return email.split('@')[0].replace(/[^a-zA-Z0-9_-]/g, '');
}
