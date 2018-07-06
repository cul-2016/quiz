const jwt = require('jsonwebtoken');
const hashPassword = require('../../lib/authentication/hashPassword.js');
const uuid = require('uuid/v1');
const saveUser = require('../../lib/authentication/saveUser.js');
const studentWelcomeEmail = require('../../lib/email/student-welcome-email.js');
const getUserByEmail = require('../../lib/getUserByEmail.js');
const updateUser = require('../../lib/updateUser.js');
const getUserByMoodleID = require('../../lib/getUserByMoodleID');
const setSession = require('../../lib/authentication/setSession');


module.exports = function(request, reply, server, pool, redisCli) {
  const { email, password, is_lecturer, username = '', group_code = null, moduleId } = request.payload;
  jwt.verify(request.state.token, process.env.JWT_SECRET, (error, decoded) => {

    const verification_code = is_lecturer ? uuid() : null;
    const validEmailMessage = { message: 'Please enter a valid email address' };

    const saveUserFlow = (is_group_admin = false, group_admin_has_paid = null) => {
      return hashPassword(password, (error, hashedPassword) => {
        /* istanbul ignore if */
        if (error) {
          return reply(error);
        }
        if (decoded && decoded.user_details && decoded.user_details.moodle_id) {
          return updateUser(pool, decoded.user_details.user_id, {email, username}, function(err, res) {
            return getUserByMoodleID(pool, decoded.user_details.moodle_id, function(err, userDetails) {
              return setSession(server, userDetails[0], (err, token, options) => {
                return reply(userDetails[0])
                .header("Authorization", token)
                .state('token', token, options)
                .state('cul_is_cookie_accepted', 'true', options);
              });
            });
          })
        } else {
          return saveUser(pool, email, hashedPassword, is_lecturer, username, group_code, verification_code, is_group_admin, group_admin_has_paid, null, (error, result) => { // eslint-disable-line no-unused-vars
            /* istanbul ignore if */
            if (error) {
              return reply(error);
            }
            else {
              return getUserByEmail(pool, email, (error, userDetails) => {
                /* istanbul ignore if */
                if (error) {
                  return reply(error);
                }
                else {
                  delete userDetails[0].password;

                  const uid = uuid();

                  const twoWeeks = 60 * 60 * 24 * 14;
                  redisCli.setAsync(userDetails[0].user_id.toString(), uid, 'EX', twoWeeks)
                  .then(() => {
                    const userObject = { user_details: userDetails[0], uid: uid };
                    const token = jwt.sign(userObject, process.env.JWT_SECRET);
                    const options = { path: "/", isSecure: false, isHttpOnly: false };
                    reply(userDetails[0])
                    .header("Authorization", token)
                    .state('token', token, options)
                    .state('cul_is_cookie_accepted', 'true', options);
                  })
                  .catch((err) => reply(err));
                }
              });
            }
          });
        }
      });
    };

    getUserByEmail(pool, email, (error, userExists) => {
      /* istanbul ignore if */
      if (error) {
        return reply(error);
      }
      if (userExists.length === 1) {
        return reply({ message: 'user exists' });
      } else {
        return studentWelcomeEmail({
          username,
          email
        }, (err) => {
          /* istanbul ignore if */
          if (err) {
            return reply(validEmailMessage);
          } else {
            return saveUserFlow();
          }
        });
      }
    });
  })
}
