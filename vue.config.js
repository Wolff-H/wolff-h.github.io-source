var path = require('path')

module.exports =
{
    publicPath: './',

    // outputDir: '../wolff-h.github.io/',
    // assetsDir: '../wolff-h.github.io/assets/',

    devServer:
    {
        // proxy: 'https://github.com/Wolff-H/wolff-h.github.io/',
        proxy: 'http://www.ga3hu.com',
    },

    css:
    {
        loaderOptions:
        {
            stylus:
            {
                define:
                {
                    _colorset: path.resolve('src/assets/stylesheets/colorset/index.styl'),
                    _stereotypes: path.resolve('src/assets/stylesheets/stereotypes/index.styl'),
                }
            }
        }
    }

}
