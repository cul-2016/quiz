module.exports = function (axios, cid, title, content, cb) {
  axios.post(`${process.env.FORUM_URL}/api/v2/topics/`, {
    cid: cid,
    title: title,
    content: content
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
