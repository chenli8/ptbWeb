/**
 * Created by Kirk liu on 2017/7/24.
 */
import React from 'react';
import {HashRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'
import Header from '../../../common/Header';
import Footer from '../../../common/Footer';
import Step1 from './step1/Index';
import Step2 from './step2/Index';
import Close from './close/Index';
import SearchBtn from '../../../common/SearchBtn';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <div className="container">
                        <div className="demandDetail">
                            <SearchBtn />
                            <Route exact path="/" render={() => (
                                <Redirect to="/Step1"/>
                            )}/>
                            <Route exact path="/Step1/:id" component={Step1}/>
                            <Route path="/Step1/:id/:type" component={Step1}/>
                            <Route exact path="/Step1" component={Step1}/>
                            <Route path="/Step2/:id" component={Step2}/>
                            <Route path="/Close/:id" component={Close}/>

                        </div>
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}
export default Index;