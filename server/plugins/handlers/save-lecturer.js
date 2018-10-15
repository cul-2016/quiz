const jwt = require('jsonwebtoken');
const hashPassword = require('../../lib/authentication/hashPassword.js');
const uuid = require('uuid/v1');
const saveUser = require('../../lib/authentication/saveUser.js');
const verifyLecturerEmail = require('../../lib/email/lecturer-verification-email.js');
const getUserByEmail = require('../../lib/getUserByEmail.js');
const updateUser = require('../../lib/updateUser.js');
const validateGroupLecturerByCode = require('../../lib/validateGroupLecturerByCode');
const getUserByMoodleID = require('../../lib/getUserByMoodleID');


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
          return getUserByMoodleID(pool, decoded.user_details.moodle_id, function(err, userDetails) {
            if (userDetails[0]) {
              updateUser(pool, userDetails[0].user_id, {email, username, password: hashedPassword, group_code, verification_code, is_group_admin, group_admin_has_paid}, function(err, res) {
                if (err) {
                  return reply(err);
                }
              });
            } else {
              saveUser(pool, email, hashedPassword, is_lecturer, username, group_code, verification_code, is_group_admin, group_admin_has_paid, null, (error, result) => { // eslint-disable-line no-unused-vars
                /* istanbul ignore if */
                if (error) {
                  return reply(error);
                }
              });
            }
          });
        } else {
          saveUser(pool, email, hashedPassword, is_lecturer, username, group_code, verification_code, is_group_admin, group_admin_has_paid, null, (error, result) => { // eslint-disable-line no-unused-vars
            /* istanbul ignore if */
            if (error) {
              return reply(error);
            }
          });
        }
      });
    };

    return getUserByEmail(pool, email, (error, userExists) => {
      /* istanbul ignore if */
      if (error) {
        return reply(error);
      }
      if (userExists.length === 1 && userExists[0].is_verified) {
        return reply({ message: 'user exists' });
      } else {
        if (is_lecturer) {

          return validateGroupLecturerByCode(pool, group_code, (error, groupAccountInfo) => {
            /* istanbul ignore if */
            if (error) {
              return reply(error);
            }
            else if (group_code && groupAccountInfo.accountDetails.length === 0) {
              return reply({ message: 'The code you have entered is invalid' });
            }
            else if (group_code && groupAccountInfo.actualUserCountWithCode.count === groupAccountInfo.accountDetails[0].user_limit) {
              return reply({ message: 'Your institution has reached the maximum number of accounts. Please contact your adminstrator' });
            }
            else {
              return verifyLecturerEmail({
                email,
                verificationLink: `${process.env.SERVER_ROUTE}/verification?code=${verification_code}`
              }, (err) => {
                /* istanbul ignore if */
                if (err) {
                  // no tests as we do not want to get the bounce on Amazon SES
                  return reply(validEmailMessage);
                } else {
                  const is_group_admin = groupAccountInfo.accountDetails[0] && groupAccountInfo.accountDetails[0].email === email ? true : false;
                  const paid = groupAccountInfo.accountDetails[0] && groupAccountInfo.accountDetails[0].paid;
                  saveUserFlow(is_group_admin, paid);
                  return reply({ emailSent: true });
                }
              });
            }
          });
        }
      }
    });
  })
}
