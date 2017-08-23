/**
 * Created by Kirk liu on 2017/7/22.
 */
import React from 'react';
import Info from './Info';
import Auth from './Auth';
import Security from './Security';
import serviceApi from '../../../../public/js/serviceApi'
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo:''
        };
    }
    getUserInfo() {
        serviceApi('aUserInfo', {}, (data) => {
            this.setState({userInfo:data.userInfo})
        }, () => {
        })
    }
    componentDidMount() {
        this.getUserInfo();
    }

    render() {
        let state = this.state;
        let userInfo = state.userInfo;
        return (
            <div className="account">
                {
                    state.userInfo ?
                        <div className="cont">
                            <div className="top">
                                <div className="title">个人账号设置</div>
                            </div>
                            <Info />
                            <Auth userInfo={userInfo}/>
                            <Security userInfo={userInfo}/>
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}
export default Index;