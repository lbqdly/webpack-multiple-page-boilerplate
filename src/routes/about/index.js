import React, {Component}from 'react';
import {render} from 'react-dom';
import Root from '../../components/root';

class Page extends Component {
    render() {
        return <div> about! <a href="index.html">back to index</a></div>

    }
}

render(<Root><Page/></Root>, document.getElementById('app'));