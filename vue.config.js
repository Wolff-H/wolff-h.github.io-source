var path = require('path')

module.exports =
{
    publicPath: './',

    outputDir: '../wolff-h.github.io/',
    assetsDir: '../wolff-h.github.io/assets/',

    devServer:
    {

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
