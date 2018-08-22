const axios = require('axios');
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.FORUM_TOKEN}`;

module.exports = function (name, cb) {

  axios.post(`${process.env.FORUM_URL}/api/v2/categories`, {
    name: name
  })
  .then((res) => {
    return cb(null, res);
  })
  .catch(err => {
    return cb(err);
  });
};
