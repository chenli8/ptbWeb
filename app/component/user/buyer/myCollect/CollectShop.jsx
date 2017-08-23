import React from 'react';
import Collect from './Collect.jsx';
import Server from './Server.jsx';
import "../../../../public/css/buyerCollection.css"

class CollectShop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab:0
        };
    }

    componentDidMount() {
    }

    changeTab(tab){
        if(this.state.tab === tab){
            return;
        }
        this.setState({
            tab:tab
        });
    }

    render() {
        return (
            <div className="collectionCon">
                <div>
                    <div className="collectionTopCon"/>
                    <div className="subServerNav">
                        <a href="javascript:" className={this.state.tab === 0 ? "on" : ""} onClick={this.changeTab.bind(this, 0)}>收藏的店铺</a>
                        <a href="javascript:" className={this.state.tab === 1 ? "on" : ""} onClick={this.changeTab.bind(this, 1)}>收藏的服务</a>
                    </div>
                    <div className="collectionSubTopCon"/>
                    {
                        this.state.tab === 0?
                            <Collect/>
                            :
                            <Server/>
                    }
                </div>
            </div>
        );
    }
}
export default CollectShop;
