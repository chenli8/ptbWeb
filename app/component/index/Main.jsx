/**
 * Created by Kirk liu on 2017/7/19.
 */
import React from 'react';
import Search from './Search';
import ServerType from './ServerType';
import NewFeature from './NewFeature';
import Advantage from './Advantage';
import Raiders from './Raiders';
import '../../public/css/index.css';

class Mian extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="index">
                <Search/>
                <ServerType/>
                <Raiders/>
                <NewFeature/>
                <Advantage/>
            </div>
        );
    }
}
export default Mian;