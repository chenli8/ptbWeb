/**
 * Created by Kirk liu on 2017/7/24.
 */
import React from 'react';
import {HashRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'
import Header from '../../../common/Header';
import Footer from '../../../common/Footer';
import SearchBtn from '../../../common/SearchBtn';
import Main from './Main';
import '../../../../public/css/demandDetail.css';
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
                            <Route path="/:id" component={Main} />
                        </div>
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}
export default Index;