const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const core = require('./core');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');

exports.assetsPath = function (_path) {
    const assetsSubDirectory = '';
    return path.posix.join(assetsSubDirectory, _path);
};

exports.createNotifierCallback = function () {
    const notifier = require('node-notifier');

    return (severity, errors) => {
        if (severity !== 'error') {
            return;
        }
        const error = errors[0];

        const filename = error.file && error.file.split('!').pop();
        notifier.notify({
            title: '',
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        });
    };
};

/*
* 需要编译的页面，通过 --page判断，如果--page无则默认为'src/pages'
* */
let cachePageEntry = {};
function getPages() {
    if (Object.keys(cachePageEntry).length) return cachePageEntry;
    let pageEntryAll = {};
    let pageEntry = {};
    const pageName = core.filterArg('page');
    const pagesPath = core.cwdPath('src/pages');
    let dirs = fs.readdirSync(pagesPath);
    let pages = dirs.filter(item => item !== '.DS_Store');

    pages.forEach((page) => {
        let deepPagesList = [];
        const deepPagesPath = core.cwdPath(`src/pages/${page}/_pages/`);
        const deepPagesStatus = core.checkFileExistsSync(deepPagesPath);
        if (deepPagesStatus) {
            deepPagesList = fs.readdirSync(deepPagesPath);
            deepPagesList = deepPagesList.filter(item => item !== '.DS_Store');
            deepPagesList.forEach((dp) => {
                pageEntryAll[`${page}/${dp}`] = path.join(deepPagesPath, dp);
            });
        } else {
            pageEntryAll[page] = path.join(pagesPath, page);
        }
    });

    if (pageName && pageName !== 'all') {
        const pageKeys = Object.keys(pageEntryAll);
        pageName.split(',').forEach((item) => {
            if (pageKeys.includes(item)) {
                pageEntry[item] = pageEntryAll[item];
            }
        });
    }

    if (!Object.keys(pageEntry).length) {
        pageEntry = pageEntryAll;
    }
    cachePageEntry = pageEntry;
    return pageEntry;
}
exports.getPages = getPages;

/**
 * 初始化入口文件
 */
exports.createEntries = function () {
    var pageEntryDir = getPages();
    let entryObject = {};
    Object.entries(pageEntryDir).forEach(([key, value]) => {
        const entryFile = path.join(value, exports.getBuildConfig('entryPage'));
        if (fs.existsSync(entryFile)) {
            entryObject[key] = entryFile;
        } else {
            console.log(chalk.red(`警告：入口文件${entryFile}不存在 `));
        }
    });
    console.log(entryObject);
    return entryObject;
};

exports.createHtmlPackPlugins = function () {
    var pageEntryDir = getPages();
    let htmlPluginArray = [];

    Object.entries(pageEntryDir).forEach(([key, value]) => {
        const templateFile = path.join(value, 'index.ejs');
        const targetPath = `${exports.getConfigCwdPath('outputPath')}/${key}/index.html`;
        if (fs.existsSync(templateFile)) {
            htmlPluginArray.push(new HtmlWebpackPlugin({
                chunks: [key, 'vendors'],
                filename: targetPath,
                template: templateFile,
                inject: true,
                minify: {
                    removeComments: process.env.NODE_ENV === 'production',
                    collapseWhitespace: process.env.NODE_ENV === 'production',
                    removeAttributeQuotes: false,
                },
                env: process.env.NODE_ENV
            }));
        } else {
            console.log(chalk.red(`警告：模板文件${templateFile}不存在 \n `));
        }
    });
    return htmlPluginArray;
};

exports.createManifest = function(buildPage) {
    return new ManifestPlugin({
        fileName: `../${buildPage}_manifest.json`,
        publicPath: `${buildPage}/`,
        filter({ name }) {
            return name.includes('.js');
        }
    })
}

// 获取build-config配置
let buildConfig;
exports.getBuildConfig = function (key) {
    if (buildConfig) return buildConfig[key];
    buildConfig = fs.readFileSync(core.cwdPath('./build.config.json'), 'utf8');
    buildConfig = JSON.parse(buildConfig);
    return buildConfig[key];
};

// 获取 build-config 的路径值的cwd路径
exports.getConfigCwdPath = function (key) {
    const buildDir = exports.getBuildConfig(key);
    if (typeof buildDir !== 'string') {
        throw Error('必须是字符串');
    }
    return core.cwdPath(buildDir);
};

// 获取 build-config 对象形式的路径，如alias
exports.getObjectCwdPath = function (key) {
    const obj = {};
    Object.entries(exports.getBuildConfig(key)).forEach(([key, value]) => {
        obj[key] = core.cwdPath(value);
    });
    return obj;
};
