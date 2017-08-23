import React, {Component} from 'react';
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import About from "./About";

class Index extends Component {

    constructor(props) {
        super(props)
        this.state = {};
    }

    render() {
        return (
            <div>
                <Header/>
                <About/>
                <Footer />
            </div>
        );
    }
}

export default Index;
