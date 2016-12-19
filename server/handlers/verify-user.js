var verifyCode = require('../lib/verifyCode');
var client = require('../lib/dbClient');

module.exports =  {
    method: 'GET',
    path: '/verification',
    handler: (request, reply) => {
        var verification_code = request.query.code;
        // first fetch the code from db.
        verifyCode(client, verification_code, (error, isVerified) => {
            /* istanbul ignore if */
            if (error) {
                console.error(error);
                return reply(error);
            }
            else if (isVerified) {
                return reply.redirect('/#/verified-lecturer');
            } else {
                return reply.redirect('/#/verification-error');
            }
        });

    }
};
