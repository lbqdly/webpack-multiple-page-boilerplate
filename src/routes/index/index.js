import React, {Component} from 'react';
import {render} from 'react-dom';
import Root from '../../components/root';
import logo from '../../assets/logo.svg';
//load some less by css modules
import {icon, c_1ebf1e} from './style.less';


class Page extends React.Component {
    render() {
        return (
            <div>
                <img className={icon} src={logo}/>
                <p className={c_1ebf1e}>webpack/react/multiple page</p>
            </div>
        )
    }
}

//append to root
render(<Root><Page/></Root>, document.getElementById('app'));