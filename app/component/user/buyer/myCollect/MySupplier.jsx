import React from 'react';
import {HashRouter as Router,Route,NavLink,Redirect} from 'react-router-dom';
import Cooperat from './Cooperat.jsx';
import "../../../../public/css/buyerCollection.css"
import CollectShop from "./CollectShop";

class MySupplier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
    }

    render() {
        var match = this.props.match;
        return (
            <div className="collectionCon">
                <Router>
                    <div>
                        <div className="serverNav">
                            <NavLink to={`${match.url}/CollectShop/Collect`} strict  activeClassName="on">我收藏的</NavLink>
                            <NavLink to={`${match.url}/Cooperat`} strict activeClassName="on"> 我合作过的</NavLink>
                        </div>
                        <div>
                            <Route exact path={`${match.url}/MySupplier`}
                                   render={() => (<Redirect to="/CollectShop"/>)} />
                            <Route path={`${match.url}/CollectShop`} component={CollectShop}/>
                            <Route path={`${match.url}/Cooperat`} component={Cooperat}/>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}
export default MySupplier;
