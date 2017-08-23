/**
 * Created by Kirk liu on 2017/7/27.
 */
import React from 'react';
import {HashRouter as Router, Route, NavLink, Redirect} from 'react-router-dom';
import Header from '../../../common/Header';
import Footer from '../../../common/Footer';
import Main from './Main'
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
    }
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Route path="/" exact component={Main}/>
                    <Route path="/:serviceId" component={Main}/>
                    <Footer />
                </div>
            </Router>
        );
    }
}
export default Index;