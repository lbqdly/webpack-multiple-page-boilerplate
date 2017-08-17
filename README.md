# webpack multiple page boilerplate
This is a webpack+react+multiple page boilerplate,we don't need react-router.

## usage
Just add the options to `entries.js` config as follows ( base on [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)) :

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

