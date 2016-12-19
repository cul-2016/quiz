var verifyCode = require('../lib/verifyCode');
var client = require('../lib/dbClient');

module.exports =  {
    method: 'GET',
    path: '/verification',
    handler: (request, reply) => {

        var verification_code = request.query.code;

        verifyCode(client, verification_code, (error, isVerified) => {
            if (error) {
                console.error(error);
                return reply(error);
            }
            if (isVerified) {
                return reply.redirect('/#/verification/true');
            } else {
                return reply.redirect('/#/verification/false');
            }
        });

    }
};
