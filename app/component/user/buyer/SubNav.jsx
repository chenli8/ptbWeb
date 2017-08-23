/**
 * Created by Kirk liu on 2017/7/22.
 */
import React from 'react';

class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="subNav">
                <ul>
                    <li>首页<i className="ico-right"> </i></li>
                    <li>需求大厅<i className="ico-right"> </i></li>
                    <li>需求详情<i className="ico-right"> </i></li>
                </ul>
            </div>
        );
    }
}
export default Authentication;