'use strict';
const webpack = require('webpack');
const BabelEnginePlugin = require('babel-engine-plugin');


module.exports = {
    entry: ["babel-polyfill", "./src/js/index.js"],
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?name=[name].[hash].[ext]" //http://survivejs.com/webpack/loading-assets/loading-images/
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
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
                STUDY_PLANNER_URL: JSON.stringify(process.env.STUDY_PLANNER_URL)
            }
        }),
        new BabelEnginePlugin({
            presets: ["react", "es2015", "stage-0", "env"]
        })
    ],
    node: {
      net: 'empty',
      dns: 'empty'
    }
};
