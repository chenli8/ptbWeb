import React, {Component} from 'react';
import {HashRouter as Router, Route, Redirect} from 'react-router-dom'


import BandBankCardStep1  from  './BandBankCardStep1';
import BandBankCardStep2  from  './BandBankCardStep2';
import BandBankCardStep3  from  './BandBankCardStep3';
import TimeStep from "../../shop/common/TimeStep";

class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            timeStepList:[
                {title:"填写银行卡信息", subTitle:"", status:1},
                {title:"提交银行卡信息", subTitle:"", status:0},
                {title:"完成", subTitle:"", status:0}
            ]
        };
    }

    render() {
        return (
            <div className="bandBankCardOutCon">
                <div className="bandBankCardCon">
                    <div className="bandBankCardStepCon clear">
                        <TimeStep timeData={this.state.timeStepList}/>
                    </div>
                    <Router>
                        <div className="bandBankCardContent">
                            <Route exact path="/"
                                   render={() => (<Redirect to="/BandBankCardStep1"/>)}/>
                            <Route path="/BandBankCardStep1" component={BandBankCardStep1}/>
                            <Route path="/BandBankCardStep2" component={BandBankCardStep2}/>
                            <Route path="/BandBankCardStep3" component={BandBankCardStep3}/>
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

export default Main;
