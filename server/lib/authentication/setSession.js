const uuid = require('uuid/v1');
const jwt = require('jsonwebtoken');

function setSession(server, user, cb) {
  const uid = uuid();
  const client = server.app.redisCli;

  const twoWeeks = 60 * 60 * 24 * 14;
  client.setAsync(user.user_id.toString(), uid, 'EX', twoWeeks)
      .then(() => {
          const userObject = { user_details: user, uid: uid, scope: [user.is_super_admin ? "super-admin" : "", user.is_group_admin ? "group-admin" : ""] };
          const token = jwt.sign(userObject, process.env.JWT_SECRET);
          const options = { path: "/", isSecure: false, isHttpOnly: false };
          return cb(null, token, options);
      })
      .catch(cb);
}

module.exports = setSession;
