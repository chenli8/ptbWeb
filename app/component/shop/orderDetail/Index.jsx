import React from 'react'
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Main from './Main';

const Index = () => (
    <div>
        <Header/>
        <div className="container">
            <Main/>
        </div>
       {/* <Footer/>*/}
    </div>
)

export default Index;
