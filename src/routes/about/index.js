import React, {Component}from 'react';
import {render} from 'react-dom';
import Root from '../../components/root';

class Page extends Component {
    render() {
        return (
            <div> about! </div>
        )
    }
}

render(<Root><Page/></Root>, document.getElementById('app'));