const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
    mode: 'development',
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'To-Do List',
            filename: 'index.html',
            template: 'src/template.html'
        })
    ],

    devtool: 'source-map',

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },

   module: { 
    rules: [
        {
            test: /\.scss$/i,
            use: [
                'style-loader',
                'css-loader',
                'resolve-url-loader',
                'sass-loader'
            ]
        },

        {
            test: /\.js$/i,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },

        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
          },

        {
            test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
            use: {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
        },
        
    ]
},
}