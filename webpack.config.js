/**
 * Created by aaron on 2017/4/10.
 */
let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let BrowserSyncPlugin = require('browser-sync-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let entries = require('./entries');
//环境变量，开发环境或者生产环境，npm将通过这个值来区分打包。
let isDev = process.env.NODE_ENV === 'development';

module.exports = {
    context: path.join(__dirname, 'src'),
    //代码插入方式
    devtool: 'eval-source-map' : 'source-map',
    //监听文件改动
    watch: isDev,
    //入口js文件
    entry: Object.assign({
        //react等公共包
        'vendor': ['react', 'react-dom'],
        'init': ['./commons/init'],
        //...//您还可以在此添加其他公共包
    }, entrys()),
    output: {
        path: path.resolve(__dirname, 'dist/'),
        //文件命名
        filename: 'js/[name].js?hash=[chunkHash:7]',
        //切块的文件名
        chunkFilename: 'js/[name].js?hash=[chunkHash:7]',
    },
    plugins: [
        //静态文件包，直接copy到发布目录。
        new CopyWebpackPlugin([{from: './statics', to: './statics'}]),
        //公共代码，使其他公共包稳定,用于缓存使用。
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor','init','manifest'],
            minChunks: Infinity
        }),
        //提取css文件。
        new ExtractTextPlugin({filename: 'css/styles.css'}),
        //嵌入模块序列js到head。
        //new InlineManifestWebpackPlugin()
    ].concat(htmlPlugins()).concat(
        isDev
            ? [
            //开启自动刷新
            new BrowserSyncPlugin(
                {
                    server: {
                        baseDir: "dist",
                        index: "index.html"
                    }
                },
                {reload: true}
            )]
            : [
            //开启代码压缩
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                comments: false,
                compress: {warnings: true}
            })]
    ),
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.less/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    //less文件将使用cssmodules
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ]
            },

            //css文件引入全局受用。
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?importLoaders=1', 'postcss-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 2048,
                        name: '/assets/[name].[hash:7].[ext]'
                    }
                }]
            }
        ]
    },
    resolve: {
        "alias": {
            //https://github.com/developit/preact/
            //'react': 'preact-compat',
            //'react-dom': 'preact-compat'
        }
    }
};


/**
 * 返回一个webpack.entry对象
 * @returns {{}}
 */
function entrys() {
    let obj = {};
    entries.map(function (item) {
        obj[item.filename] = item.entry;
    });
    return obj;
}
/**
 * 返回HtmlWebpackPlugin插件数组
 * @returns {Array}
 */
function htmlPlugins() {
    let htmls = [];
    entries.map(function (item) {
        item.chunks = ['manifest'].concat(item.chunks).concat([item.filename]);
        item.template = item.template || './commons/template.ejs';//默认使用这个指定的ejs
        item.minify = {minifyJS: true, minifyCSS: true};
        item.chunksSortMode = function (...age) {
            let order = item.chunks.concat([]);
            let order1 = order.indexOf(age[0].names[0]);
            let order2 = order.indexOf(age[1].names[0]);
            return order1 - order2;
        };
        htmls.push(new HtmlWebpackPlugin(item))
    });

    return htmls;
}
