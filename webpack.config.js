/**
 * Created by 5156 on 2017/4/10.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const entries = require('./entries');
//环境变量，开发环境或者生产环境，npm将通过这个值来区分打包。
const isDev = process.env.NODE_ENV === 'development';

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: (loader) => [
            autoprefixer({browsers: ['iOS 7', 'Android >= 4.0', '> 1%']}),
            cssnano()
        ]
    }
};

module.exports = {
    context: path.join(__dirname, 'src'),
    //代码插入方式
    devtool: isDev ? 'eval-source-map' : 'source-map',
    //监听文件改动
    watch: isDev,
    output: {
        path: path.resolve(__dirname, 'dist/'),
        //文件命名
        filename: 'js/[name].js?hash=[chunkHash:7]',
        //切块的文件名
        chunkFilename: 'js/[name].js?hash=[chunkHash:7]',
    },
    //入口js文件
    entry: Object.assign({
        //提取公共包
        'vendor0': ['vue'],
        'vendor1': ['react', 'react-dom'],
        //...'vendor2': ['...'],
        //您还可以在此添加其他公共包,但请记得也在CommonsChunkPlugin配置中添加。
    }, entrys()),
    plugins: [
        //公共代码包
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor0', 'vendor1', /*'vendor2'*/ 'manifest'],
            minChunks: Infinity
        }),
        //静态文件包，直接copy到发布目录。
        new CopyWebpackPlugin([{from: './statics', to: './statics'}])]

        .concat(htmlPlugins()).concat(
            isDev
                ? [
                //开启自动刷新
                new BrowserSyncPlugin({
                        server: {
                            baseDir: "dist",
                            index: "page0.html"
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

            //less文件将使用cssmodules
            {
                test: /\.less/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                            importLoaders: 1
                        }
                    },
                    postcssLoader,
                    'less-loader'
                ]
            },

            //css文件引入全局受用。
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', postcssLoader]
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
            //'react-dom': 'preact-compat',
            'vue$': 'vue/dist/vue.js'
        }
    }
};


/**
 * 返回一个webpack.entry对象
 * @returns {{}}
 */
function entrys() {
    let obj = {};
    entries.forEach(function (item) {
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
    entries.forEach(function (item) {
        item.chunks = ['manifest'].concat(item.chunks).concat([item.filename]);
        item.template = item.template || './template.ejs';//默认使用这个指定的ejs
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
