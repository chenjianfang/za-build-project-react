'use strict';
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const webpack = require('webpack');
const shell = require('shelljs');
const utils = require('./utils');
const core = require('./core');
const baseWebpackConfig = require('./webpack.base.conf');

const copyStatic = utils.getBuildConfig('copyStatic');

copyStatic.forEach(({ from, to }) => {
    if (from.trim()) {
        shell.cp('-Rf', core.cwdPath(from), core.cwdPath(to));
        console.log(`拷贝静态文件成功：${from} ---> ${to}`);
    }
});

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: "development",
    entry: utils.createEntries(),
    output: {
        path: utils.getConfigCwdPath('outputPath'),
        filename: '[name].js',
        publicPath: utils.getBuildConfig("dev").publicPath
    },
    devtool: utils.getBuildConfig('dev').devtool,
    devServer: {
        contentBase: [
            core.cwdPath('dist')
        ],
        clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: true,
        compress: true,
        host: process.env.HOST || utils.getBuildConfig('dev').host,
        port: process.env.PORT || utils.getBuildConfig('dev').port,
        publicPath: utils.getBuildConfig('publicPath'),
        proxy: utils.getBuildConfig('dev').proxyTable,
        quiet: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.NoEmitOnErrorsPlugin(),

        // HRM
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
});

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || utils.getBuildConfig('dev').port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port;
            // add port to devServer config
            devWebpackConfig.devServer.port = port;

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${utils.getBuildConfig('dev').host}:${port}`]
                },
                onErrors: utils.createNotifierCallback()
            }));

            resolve(devWebpackConfig);
        }
    });
});
