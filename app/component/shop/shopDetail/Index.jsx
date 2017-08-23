import React from 'react'
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Main from "./Main";
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <Main/>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default Index;