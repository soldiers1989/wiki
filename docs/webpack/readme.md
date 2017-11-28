# WebPack构建

## 开发环境

### 文件名  dev.config.js

* 通过 webpack-merge 方法 合并 main.config 的公共配置

* dev 模式下 不加文件hash

```javascript

webpackMerge(mainConfig, {

    output: {
        path: path.join(__dirname, '../dist/'), //构建目录
        filename: '[name].js'
    },

    module: {
        rules: []
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoErrorsPlugin(),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),

        //根据模板插入css/js等生成最终HTML
        new HtmlWebpackPlugin({
            favicon: config.srcPath + '/favicon.ico',
            filename: 'index.html', 
            template: config.srcPath + '/index.html', 
            inject:true,

            minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:true    //删除空白符与换行符
            }
        })
    ]

});

```

## 生产环境

### 文件名  prod.config.js

* 通过 webpack-merge 方法 合并 main.config 的公共配置

* prod 模式下 所有被打包的内容加 8位的 chunkhash

* prod 模式下 代码会被压缩(包括html)


```javascript

webpackMerge(mainConfig, {

    output: {
        path: path.join(__dirname,'../dist/'), //构建目录
        filename: '[name].[chunkhash:8].js'
    },

    module: {  
        rules: []
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin(),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),

        //根据模板插入css/js等生成最终HTML
        new HtmlWebpackPlugin({
            favicon:config.srcPath + '/favicon.ico',
            filename:'index.html',
            template:config.srcPath + '/index.html',
            inject:true,

            minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:true    //删除空白符与换行符
            }
        })
    ]
    
});

```

### 公共文件 main.config.js

* 主要是2种环境可以共用的配置

```javascript

{
    entry: {
        "app" : [config.srcPath+'app.js'], //入口文件
        "common":['vue', 'vue-router'],  //vue模块
        "polyfill": ['babel-polyfill'], //补全es6原生对象
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    { 
                        loader: 'url-loader',
                        options: {
                            limit: 6000,
                            name: '[name].[ext]?[hash]'
                        }
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { 
                        loader: 'style-loader'
                    },
                    { 
                        loader: 'css-loader'
                    },
                    { 
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader'
                    }
                ]
            }
        ]
    },

    resolve: {

        //配置别名，在项目中可缩减引用路径
        alias: {
          util: __dirname + '/../src/utils/index.js',
        }
    },
    plugins: [

        //提供全局的变量，在模块中使用无需用require引入
        //new webpack.ProvidePlugin({}),

        //将公共代码抽离出来合并为一个文件
        new webpack.optimize.CommonsChunkPlugin({name:['common'],minChunks:Infinity})
    ]
};

```

## 热重载

* 基于 webpack-dev-middleware 和 webpack-hot-middleware 2个 webpack 的 中间件

* 基于 express 作为服务器并且使用中间件

* 基于 dev.config 的开发环境配置

* 基于 http-proxy-middleware 中间件做反向代理

* 基于 opn 模块 自动打开浏览器

```javascript

const config = require('./config');

const opn = require('opn');

const path = require('path');

const express = require('express');

const webpack = require('webpack');

//将http请求代理到其他服务器
var proxyMiddleware = require('http-proxy-middleware');

// 根据 Node 环境来引入相应的 webpack 配置
var webpackConfig = require('./dev.config');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

// dev-server 监听的端口，默认为config.dev.port设置的端口，即8080
var port = config.port;

// 创建1个 express 实例
var app = express()

// 根据webpack配置文件创建Compiler对象
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

//反向代理
config.proxy.forEach(function (item) {
  app.use( 
    proxyMiddleware(
      item[0], { 
        target: item[1], 
        changeOrigin: true, 
        pathRewrite: { [item[0]]: item[2] } 
      }
    )
  )
})

// 重定向不存在的URL，常用于SPA
app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)

app.use(hotMiddleware)

var uri = `http://${config.hostName}:${config.port}`;

// webpack开发中间件合法（valid）之后输出提示语到控制台，表明服务器已启动
devMiddleware.waitUntilValid(function () {
  console.log(`> Listening at ${uri} \n`)
})

// 启动express服务器并监听相应的端口
module.exports = app.listen(config.port, config.hostName, function (err) {
  if (err) {
    console.log(err)
    return
  }

 //打开浏览器
  opn(uri)
})


```

* 通过加载 dev-client 的 配置 observer reload 的 action 触发 热更新

* dev-client 配置如下

```javascript

require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})

``` 

* 需要在dev.config 中 改写 entry 的入口 加上 dev-client 的 相对路径

```javascript
/*dev.config 中 加上 dev-client 前缀*/
Object.keys(mainConfig.entry).forEach(function (name) {
  mainConfig.entry[name] = [__dirname + '/dev.client'].concat(mainConfig.entry[name])
})
```  

