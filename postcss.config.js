/**
 * Created by b5156 on 2017/3/9.
 */

module.exports = {
    plugins: [
        //require('postcss-px2rem')({'remUnit': 75}),
        require('autoprefixer')({browsers: ['iOS 7', 'Android >= 4.0', '> 1%']})
    ]
};