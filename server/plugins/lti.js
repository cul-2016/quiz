const lti = require('ims-lti');
const getUserByMoodleID = require('../lib/getUserByMoodleID');
const setSession = require('../lib/authentication/setSession');
const saveUser = require('../lib/authentication/saveUser.js');
const joinModule = require('../lib/joinModule.js');
const getUserByEmail = require('../lib/getUserByEmail');
const updateUser = require('../lib/updateUser.js');

exports.register = (server, options, next) => {
  const { pool } = server.app;

  server.route([
    {
      method: 'POST',
      path: '/lti',
      config: {
          auth: false
      },
      handler: (request, reply) => {

        if (isLTIRequest(request.payload)) {
          if (request.headers && request.headers['x-forwarded-proto']) {
            request.raw.req.protocol = request.headers['x-forwarded-proto'];
          };

          var provider = new lti.Provider(
            request.payload.oauth_consumer_key, process.env.LTI_SECRET
          );

          return provider.valid_request(request, (err, isValid) => {
            if (isValid) {
              var moduleId = request.payload.custom_module;
              var userId = request.payload.user_id;
              var isLecturer = request.payload.roles.indexOf('Instructor') > -1;

              return getUserByMoodleID(pool, userId, function(err, userDetails) {
                if (userDetails[0]) { // User has Moodle ID
                  if (userDetails[0].merge_required) { // User requires merge
                    return goToRegister(server, request, reply, userDetails[0], true, isLecturer, moduleId);
                  } else if (userDetails[0].username || (isLecturer && userDetails[0].is_verified)) { // User does not require merge
                    if (isLecturer) {
                      return login(server, request, reply, userDetails[0], isLecturer, moduleId);
                    }
                    return joinModule(pool, moduleId.toUpperCase(), userDetails[0].user_id, (error, result) => {
                      return login(server, request, reply, userDetails[0], isLecturer, moduleId);
                    });
                  } else {
                    return goToRegister(server, request, reply, Object.assign({}, userDetails[0], {moodle_id: userId}), false, isLecturer, moduleId);
                  }
                } else { // User does not have Moodle ID
                  return getUserByEmail(pool, request.payload.lis_person_contact_email_primary, (error, userDetails) => {
                    if (userDetails[0]) { // User email exists in database
                      if (isLecturer) {
                        return updateUser(pool, userDetails[0].user_id, {merge_required: true, moodle_id: userId}, function(err, res) {
                          return goToRegister(server, request, reply, Object.assign({}, userDetails[0], {moodle_id: userId}) , true, isLecturer, moduleId);
                        });
                      }
                      return joinModule(pool, moduleId.toUpperCase(), userDetails[0].user_id, (error, result) => {
                        return updateUser(pool, userDetails[0].user_id, {merge_required: true, moodle_id: userId}, function(err, res) {
                          return goToRegister(server, request, reply, Object.assign({}, userDetails[0], {moodle_id: userId}) , true, isLecturer, moduleId);
                        });
                      });
                    } else { //User email does not exist in database
                      return saveUser(pool, request.payload.lis_person_contact_email_primary, null, isLecturer, null, null, null, false, false, userId, function(err, res) {
                        return getUserByEmail(pool, request.payload.lis_person_contact_email_primary, (error, userDetails) => {
                          if (isLecturer) {
                            return goToRegister(server, request, reply, userDetails[0], false, isLecturer, moduleId);
                          }
                          return joinModule(pool, moduleId.toUpperCase(), userDetails[0].user_id, (error, result) => {
                            return goToRegister(server, request, reply, userDetails[0], false, isLecturer, moduleId);
                          });
                        });
                      });
                    }
                  });
                }
              });
            }
            console.log(err);
            return reply().code(400);
          });
        }
        return reply().code(400);
      }
    }
  ])

  next();
}

function isLTIRequest(payload) {
  return payload
    && payload.lti_message_type == 'basic-lti-launch-request'
    && payload.lti_version == 'LTI-1p0'
    && payload.oauth_consumer_key
    && payload.resource_link_id
    && true
}

function goToRegister(server, request, reply, userDetails, merge, isLecturer, moduleId) {
  return setSessionAndRedirect(
    merge ? `/#/merge-users?module=${moduleId}` : `/#/register-moodle-${isLecturer ? 'lecturer' : 'student'}?module=${moduleId}`
  )(server, request, reply, userDetails);
}

function login(server, request, reply, userDetails, isLecturer, moduleId) {
  return setSessionAndRedirect(
    `/#/${moduleId}/${isLecturer ? 'lecturer' : 'student'}`
  )(server, request, reply, userDetails);
}

function setSessionAndRedirect(endpoint) {
  return function(server, request, reply, userDetails) {
    return setSession(server, Object.assign({}, userDetails, {lti_payload: request.payload}), (err, token, options) => {
      return reply()
        .header("Authorization", token)
        .state('token', token, options)
        .state('cul_is_cookie_accepted', 'true', options)
        .redirect(endpoint);
    });
  }
}

exports.register.attributes = { pkg: { name: 'lti' } };
