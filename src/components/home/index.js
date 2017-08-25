import React, {Component} from 'react';
import {render} from 'react-dom';
import Root from '../root/index';
import logo from '../../assets/logo.svg';
//load some less by cssModules
import {_icon} from './style.less';


class Page extends React.Component {
    render = () =>
        <div>
            <img className={_icon} src={logo}/>
            <br/>
            <a href="about.html">go to about</a>
        </div>

}

//append to root
render(<Root><Page/></Root>, document.getElementById('app'));