/**
 * Created by aaron on 2017/5/24.
 */
import React, {Component} from 'react';
import Header from '../header';

class Root extends Component {
    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        )
    }

    componentWillMount() {
        //do something in root
    }
}
export default Root;