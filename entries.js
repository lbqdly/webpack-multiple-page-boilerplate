module.exports = [
    {   //page name
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
    },
    {
        filename: 'about.html',
        entry: './routes/about',
        chunks: ['vendor', 'common'],
    },
];