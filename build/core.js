const fs = require('fs');
const path = require('path');

// cmd命令行的参数 形式为: --page=index,auth
const argsMap = {};
const filterArg = (name = '') => {
    if (Object.keys(argsMap).length === 0) {
        let argv;
        if (process.env.npm_config_argv) {
            argv = JSON.parse(process.env.npm_config_argv).original.slice(2);
        } else {
            argv = process.argv.slice(2)[0].split(/\s+/);
        }

        argv.forEach((item) => {
            if (/^--/.test(item)) {
                const argItem = item.slice(2);
                if (argItem.includes('=')) {
                    const argArr = argItem.split('=');
                    argsMap[argArr[0]] = argArr[1];
                }
            }
        });
        console.log('命令行参数：', argsMap);
    }
    return argsMap[name];
};

exports.filterArg = filterArg;

const cwd = filterArg('cwd') || process.cwd();

exports.cwdPath = function cwdPath(dir="") {
    return path.join(cwd, dir)
};


exports.checkFileExistsSync = function checkFileExistsSync(filepath){
    let flag = true;
    try{
        fs.accessSync(filepath, fs.constants.F_OK);
    }catch(e){
        flag = false;
    }
    return flag;
};

exports.stepRunner = function stepRunner(list, fn) {
    const taskList = JSON.parse(JSON.stringify(list));
    async function runner() {
        if (!taskList || !taskList.length) return;
        const item = taskList.shift();
        await fn(item);
        runner();
    }
    runner();
};
