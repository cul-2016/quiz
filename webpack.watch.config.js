const path = require('path');


module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js",
        publicPath: "/"
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "react-hot-loader!babel-loader"
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                loader: "style-loader!css-loader!sass-loader"
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: "json-loader"
            }
        ]
    },
    node: {
      net: 'empty',
      dns: 'empty'
    }
};
