import React, {Component}from 'react';
import {render} from 'react-dom';
import logo from '../../assets/react.svg';
import {_icon, _content} from './style.less';

class Page extends Component {
    render = () =>
        <div className={_content}>
            <h5>webpack multiple page boilerplate</h5>
            <div>
                page1 is a react app.
            </div>
            <img className={_icon} src={logo}/>
            <br/>
            <a href="page0.html">back to page0</a>
        </div>
}

render(<Page/>, document.getElementById('app'));