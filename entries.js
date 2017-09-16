module.exports = [
    //{
    //html page name
    //filename: 'page0.html',
    //html entry js
    //entry: './components/page0',
    //...
    //commons chunks
    //chunks: ['vendor'],
    //title: 'my website',
    //template:'',
    //inject:'head||body',
    //favicon:'',
    //...
    //https://github.com/jantimon/html-webpack-plugin
    //},
    {
        filename: 'page0.html',
        entry: './pages/page0',
        template: './pages/page0/tpl.html',
        chunks: ['vendor0'],
    },
    {
        filename: 'page1.html',
        entry: './pages/page1',
        //template: './template',
        chunks: ['vendor1'],
    },
    {
        filename: 'page2.html',
        entry: './pages/page2',
        template: './pages/page2/tpl.html'
    },
];