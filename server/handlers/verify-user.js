var verifyCode = require('../lib/verifyCode');
var client = require('../lib/dbClient');

module.exports =  {
    method: 'GET',
    path: '/verification',
    handler: (request, reply) => {

        var verification_code = request.query.code;
        // first fetch the code from db.
        verifyCode(client, verification_code, (error, isVerified) => {
            if (error) {
                console.error(error);
                return reply(error);
            }

            if (isVerified) {
                return reply.redirect('/#/verified-lecturer');
            } else {
                return reply.redirect('/#/verification-error');
            }
            // compare the codes
            // if OK, then redirect user to thank you verification page

            // set is_verify to true and delete the code from db


        });

    }
};
