module.exports = {
    method: 'GET',
    path: '/{all*}',
    config: {
        description: 'serves up all the files',
        handler: {
            directory: {
                path: "public"
            }
        }
    }
};
