/**
 * Created by Kirk liu on 2017/7/19.
 */
import React from 'react';
import Header from './../common/Header';
import Footer from './../common/Footer';
import Main from './Main';

import '../../public/css/index.css';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Header />
                <div className="yellowBack"> </div>
                <Main />
                <Footer />
            </div>
        );
    }
}
export default Index;