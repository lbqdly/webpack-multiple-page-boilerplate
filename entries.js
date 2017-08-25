module.exports = [
    {   //page name
        filename: 'home.html',
        //entry js
        entry: './components/home',
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
        entry: './components/about',
        chunks: ['vendor', 'init'],
    },
];