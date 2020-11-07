#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
var shell = require('shelljs');

const resolve = (dir = '') => path.join(__dirname, dir);

const cwd = process.cwd();
console.log('cwd: ', cwd);

const projectFolder = path.join(cwd);
shell.cp('-Rf', resolve('../build'), `${projectFolder}/`);
shell.cp('-Rf', resolve('../config'), `${projectFolder}/`);
shell.cp('-Rf', resolve('../shell'), `${projectFolder}/`);


const packageFile = path.join(cwd, 'package.json');

let packageConfig = fs.readFileSync(packageFile, 'utf8');
packageConfig = JSON.parse(packageConfig);
packageConfig.zaEject = true;

fs.writeFile(packageFile, JSON.stringify(packageConfig,null,4), 'utf8', function (err) {
    if (err) console.error(err);
});
