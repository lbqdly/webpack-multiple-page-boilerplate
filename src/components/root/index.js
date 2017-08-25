/**
 * Created by b5156 on 2017/5/24.
 */
import React, {Component} from 'react';
import Header from '../header';

class Root extends Component {
    render = () =>
        <div>
            <Header/>
            {this.props.children}
        </div>;

    componentWillMount = () => {
        //...
    }
}
export default Root;