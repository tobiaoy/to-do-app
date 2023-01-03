import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';


export const mode = 'development';
export const optimization = {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
};
export const entry = resolve(__dirname, 'src/index.js');
export const output = {
    path: resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
    assetModuleFilename: '[name][ext]'
};
export const plugins = [
    new HtmlWebpackPlugin({
        title: 'To-Do List',
        filename: 'index.html',
        template: 'src/template.html'
    })
];
export const devtool = 'source-map';
export const devServer = {
    static: {
        directory: resolve(__dirname, 'dist')
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true
};
export const module = {
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
};