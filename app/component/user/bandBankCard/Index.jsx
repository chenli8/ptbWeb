import React, {Component} from 'react';

import '../../../public/css/bandBankCardStep.css';

import Header from '../../common/Header';
import Footer from '../../common/Footer';
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
