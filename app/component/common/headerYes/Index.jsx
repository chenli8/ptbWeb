/**
 * Created by Kirk liu on 2017/7/19.
 */
import React from 'react';
import cookie from 'react-cookie';
import {Provider, connect} from 'react-redux'
import Demand from './Demand';
import Supplier from './Supplier';
import Msg from './Msg';
import Apply from './Apply';
import urlManager from './../../../public/js/urlManager';

import store from './../chat/store'
class HeaderYes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userImage: cookie.load('userImage'),
            nickName: cookie.load('nickName'),
            data:this.props.data,
            nav: [
                {
                    name: '消息',
                    ico: 'ico-info',
                }, {
                    name: '我是服务商',
                    ico: 'ico-supply',
                    url:urlManager.pSellerCenter
                }, {
                    name: '我是需求方',
                    ico: 'ico-demand',
                    url:urlManager.pBuyerCenter
                },
            ],
            navIndex: -1,
        };
    }


    componentDidMount() {

    }

    render() {
        let state = this.state;
        let shopId = state.data.shopId;
        return (
            <div className="loginList fr">
                {
                    state.nav.map((data, index) => {
                        let msg = false;
                        if (data.name == '消息') {
                            msg = true;
                        }
                        return (
                            <li key={data.name}
                                onMouseEnter={() => {
                                    this.setState({navIndex: index})
                                }}
                                onMouseLeave={() => {
                                    this.setState({navIndex: -1})
                                }}
                            >
                                <a href={shopId != 0 ? data.url : null}><i className={data.ico}/>{data.name}<b className=""/></a>
                                {
                                    msg ?
                                        this.props.storeState.isChatMsgRead>0 || this.props.storeState.isChatSysRead>0 || this.props.storeState.isChatPayRead>0 ?
                                            <i className="ico_infoTipsRed"/> : null
                                        :
                                        null
                                }
                                {
                                    state.navIndex == index ?
                                        state.navIndex == 2 ?
                                            <Demand {...state} handleIsLoginOut={this.handleIsLoginOut}/>
                                            :
                                            state.navIndex == 1 ?
                                                shopId == 0 ?
                                                    <Apply />
                                                    :
                                                    <Supplier {...state} handleIsLoginOut={this.handleIsLoginOut}/>
                                                :
                                                state.navIndex == 0 ?
                                                    <Msg {...state} storeState={this.props.storeState}/>
                                                    :
                                                    null
                                        :
                                        null
                                }
                            </li>
                        )
                    })
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        storeState: state
    }
};
const Index = connect(
    mapStateToProps
)(HeaderYes);
const App = (props) => (
    <Provider store={store}>
        <Index data={props.data}/>
    </Provider>
);

export default App;