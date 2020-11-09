const cwd = process.cwd();

const projectCwd = cwd.split('node_modules')[0]; // 当前配置文件是构建的cwd，需要获取项目的绝对路径

module.exports = {
    plugins: [
        require('postcss-import')({
            root: projectCwd,
            path: ['./src/common']
        }),
        require('postcss-px2rem')({
            remUnit: 75
        }),
        require('cssnano'),
        require('precss'),
        require('postcss-for'),
        require('postcss-preset-env')({
            autoprefixer: true
        }),
        require('postcss-nested'),
        require('postcss-extend'),
        require('postcss-simple-vars'),
        require('postcss-mixins'),
    ]
};



