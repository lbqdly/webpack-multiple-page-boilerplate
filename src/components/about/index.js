import React, {Component}from 'react';
import {render} from 'react-dom';
import Root from '../root/index';

class Page extends Component {
    render = () =>
        <div> about! <a href="home.html">back to index</a></div>
}

render(<Root><Page/></Root>, document.getElementById('app'));