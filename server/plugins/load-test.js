const saveStudentResponse = require('../lib/saveStudentResponse');

exports.register = (server, options, next) => {
    const pool = server.app.pool;

    server.route([
        {
            method: 'GET',
            path: '/load-test/{question_id}',
            config: {
              auth: false
            },
            handler: (request, reply) => {
              saveStudentResponse(pool, 24, 3, false, parseInt(request.params.question_id,10), 'c', (error, response) => {
                  /* istanbul ignore if */
                  if (error) {
                      console.error(error);
                  }
                  const verdict = error || response;

                  reply(verdict);
              });
            }
        }
    ]);

    next();
};

exports.register.attributes = { pkg: { name: 'load-test' } };
