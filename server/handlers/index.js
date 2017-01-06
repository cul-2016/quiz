module.exports = {
    method: 'GET',
    path: '/{all*}',
    handler: { directory: { path: "public" } }
};
