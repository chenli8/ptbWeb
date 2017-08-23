import React from 'react'
import {HashRouter as Router, Route, Redirect} from 'react-router-dom'

import utils from '../../../public/js/utils'

import '../../../public/css/order.css';
import OrderShow from "./OrderShow";
import OrderSubmit from "./OrderSubmit";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //订单id
        this.orderId = utils.urlParam('orderId', window.location.href);
    }

    render() {
        return (
            <div className="main">
                <div className="detail clear">
                    <div className="order fl">
                        <Router>
                            <div>
                                <Route exact path="/"
                                       render={() => (<Redirect to={this.orderId ? "/OrderShow" : "/OrderSubmit"}/>)}/>
                                <Route path="/OrderSubmit" component={OrderSubmit}/>
                                <Route path="/OrderShow" component={OrderShow}/>
                            </div>
                        </Router>
                    </div>


                </div>
            </div>
        );
    }
}
export default Main;