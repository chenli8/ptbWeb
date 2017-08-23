import React, {Component} from 'react';

import Header from '../../common/Header';
import Footer from '../../common/Footer';

import '../../../public/css/buyer.css';
import Main from "./Main";

class Index extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Main/>
                <Footer/>
            </div>
        );
    }
}

export default Index;
