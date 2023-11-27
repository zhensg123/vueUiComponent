//webpack.config.js
const htmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
    mode: 'none',
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, "/dist"),
        // filename: 'xoneui.js',
        // libraryTarget: 'umd',  //用到的模块定义规范
        // library: 'xoneui',   //库的名字
        // libraryExport: 'default'
    },
    // externals: {
    //     vue: {
    //         root: "Vue",   //通过 script 标签引入，此时全局变量中可以访问的是 Vue
    //         commonjs: "vue",  //可以将vue作为一个 CommonJS 模块访问
    //         commonjs2: "vue",  //和上面的类似，但导出的是 module.exports.default
    //         amd: "vue"   //类似于 commonjs，但使用 AMD 模块系统
    //     }
    // },
    devServer: {
        host: 'localhost',
        port: "8888",
        open: true,
        hot: true
      },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|eot|woff|ttf|svg|webp|PNG)(\?\S*)?$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            template: './index.html',
            filename: './index.html',
            inject: true
          })
    ]
}