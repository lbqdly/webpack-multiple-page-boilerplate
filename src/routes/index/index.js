import React, {Component} from 'react';
import {render} from 'react-dom';
import Root from '../../components/root';
import logo from '../../assets/logo.svg';
//load some less by cssModules
import {icon, center} from './style.less';


class Page extends React.Component {
    render() {
        return (
            <div className={center}>
                <img className={icon} src={logo}/>
                <br/>
                <a href="about.html">go to about</a>
            </div>
        )
    }
}

//append to root
render(<Root><Page/></Root>, document.getElementById('app'));