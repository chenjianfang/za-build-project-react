#!/usr/bin/env node
const fs = require('fs');
const shell = require('shelljs');
const path = require('path');

const cwd = process.cwd();

function resolve(dir = '') {
    return path.join(__dirname, dir);
}
const buildPath = resolve('../');

let entryPath = buildPath;
try {
    const packageFile = path.join(cwd, 'package.json');
    let packageConfig = fs.readFileSync(packageFile, 'utf8');
    packageConfig = JSON.parse(packageConfig);
    if (packageConfig.zaEject === true) {
        entryPath = cwd;
    }
} catch (e) {
    //
}

shell.cd(entryPath);

console.log("entryPath: ", entryPath);
shell.exec(`npm run dev ${process.argv.slice(2).join(' ')} --cwd=${cwd}`);
