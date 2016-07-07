const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../../webpack.development.config.js');

const compiler = webpack(config);

const options = {
    contentBase: 'public/',
    hot: true,
    filename: 'bundle.js',
    stats: {
        colors: true
    },
    proxy: {
        "*": "http://localhost:9000"
    }
};

const server = new WebpackDevServer(compiler, options);

server.listen(8080, 'localhost', function () {
    console.info('webpack-dev-server is running on 8080');
});
