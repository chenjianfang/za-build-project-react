const postcssPresetEnv = require('postcss-preset-env'); // 使您可以将现代CSS转换为大多数浏览器可以理解的内容，包含autoprefixer
const precss = require('precss'); // scss功能嵌套、混合
const px2rem = require('postcss-px2rem'); // scss功能嵌套、混合

module.exports = {
    plugins: [
        postcssPresetEnv({
            autoprefixer: true
        }),
        precss,
        px2rem({
            remUnit: 75
        }),
    ]
};




