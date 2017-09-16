# webpack multiple page boilerplate
This is a webpack multiple page boilerplate,we don't need router.

这是一个使用webpack构建多页面样版，避免了使用router。

## usage
Just add the options to `entries.js` config as follows ( base on [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)) :

只需要向 `entries.js` 文件添加配置即可，如下所示（配置文件是基于 [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) 的拓展）：

```javascript
{   
  //page html name
  filename: 'page0.html',
  //page entry js
  entry: './pages/page0',
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

开始编码

`npm run dev` 



构建可用于发布的代码

`npm run build` 
