/**
 * Created by Kirk liu on 2017/7/21.
 */
import React from 'react';
import Login from './login/Index';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="loginReg">
                <div className="cont">
                    <Login />
                </div>
            </div>
        );
    }
}
export default Main;