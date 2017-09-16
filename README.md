# webpack multiple page boilerplate
This is a webpack+react+multiple page boilerplate,we don't need react-router.

这是一个webpack+react多页面样版，避免了使用react-router。

## usage
Just add the options to `entries.js` config as follows ( base on [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)) :

只需要向 `entries.js` 文件添加配置即可，如下所示（配置文件是基于 [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) 的拓展）：

```javascript
{   
  //page name
  filename: 'index.html',
  //entry js
  entry: './routes/index',
  //commons chunks
  chunks: ['vendor'],
  //title: 'my website',
  //template:'',
  //inject:'head||body',
  //favicon:'',
  //...
  //https://github.com/jantimon/html-webpack-plugin
}
```

`npm run dev` ：开始编码

`npm run build` ：构建用于发布的代码到dist目录