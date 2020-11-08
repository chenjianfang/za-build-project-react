module.exports = {
    plugins: [
        require('postcss-import')({
            path: ['./src']
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





