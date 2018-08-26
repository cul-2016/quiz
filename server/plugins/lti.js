const lti = require('ims-lti');
const getUserByMoodleID = require('../lib/getUserByMoodleID');
const setSession = require('../lib/authentication/setSession');
const saveUser = require('../lib/authentication/saveUser.js');
const joinModule = require('../lib/joinModule.js');

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
          var provider = new lti.Provider(
            request.payload.oauth_consumer_key, process.env.LTI_SECRET
          );

          return provider.valid_request(request, (err, isValid) => {
            if (isValid) {
              var moduleId = request.payload.lis_course_section_sourcedid;
              var userId = request.payload.user_id;
              var isLecturer = request.payload.roles.indexOf('Instructor') > -1;

              return getUserByMoodleID(pool, userId, function(err, userDetails) {
                if (err) return reply(err);

                if (userDetails.length) {
                  return setSession(server, Object.assign({}, userDetails[0], {lti_payload: request.payload}), (err, token, options) => {
                    return reply()
                      .header("Authorization", token)
                      .state('token', token, options)
                      .state('cul_is_cookie_accepted', 'true', options)
                      .redirect(`/#/${moduleId}/${isLecturer ? 'lecturer' : 'student'}`);
                  });
                }

                // TODO: modify create account screen for moodle users instead of just save user
                return saveUser(pool, "test2@test.com", "null", isLecturer, null, null, null, false, false, userId, function(err, res) {
                  if (err) return reply(err);
                  return getUserByMoodleID(pool, userId, function(err, userDetails) {
                    if (!isLecturer) {
                      return joinModule(pool, moduleId.toUpperCase(), userDetails[0].user_id, (error, result) => {
                        return setSession(server, Object.assign({}, userDetails[0], {lti_payload: request.payload}), (err, token, options) => {
                          return reply()
                          .header("Authorization", token)
                          .state('token', token, options)
                          .state('cul_is_cookie_accepted', 'true', options)
                          .redirect(`/#/register-moodle-student?module=${moduleId}`);
                        });
                      });
                    }
                    return setSession(server, Object.assign({}, userDetails[0], {lti_payload: request.payload}), (err, token, options) => {
                      return reply()
                      .header("Authorization", token)
                      .state('token', token, options)
                      .state('cul_is_cookie_accepted', 'true', options)
                      .redirect(`/#/register-moodle-${isLecturer ? 'lecturer' : 'student'}?module=${moduleId}`);
                    });
                  });
                });
              });
            }
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

exports.register.attributes = { pkg: { name: 'lti' } };
