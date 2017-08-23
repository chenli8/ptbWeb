/**
 * Created by Yhyu on 2017/7/22.
 */
import React from 'react'
import serviceApi from "../../../public/js/serviceApi";
import utils from "../../../public/js/utils";
class SalerAuthInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shopInfo:{}
        };
        this.shopId = props.shopId;
    }

    componentDidMount() {
        this.getShopDetail();
    }

    getShopDetail() {
        var THIS = this;
        this.postApi = serviceApi('aShopDetail', {shopId: this.shopId}, (data) => {
            THIS.setState({
                shopInfo: data
            },function () {
                THIS.getAuthInfo();
            })
        }, (data) => {
        });
    }

    getAuthInfo() {
        serviceApi('aAuthStateInfo', {
            userId:this.state.shopInfo.uid
        }, (data) => {
            this.setState({
                isLoad: true,
                enterprise: data.enterprise,
                personal: data.personal,
                position: data.position
            })
        }, () => {
        });
    }

    render() {
        let state = this.state;
        return (
            <div className="certification">
                {
                    state.isLoad ?
                        <div>
                            <div className="cerCon">
                                <div className="contents fl">
                                    <span>企业认证：</span>
                                    <span className="fr">
                                        {state.enterprise ? state.enterprise.enterpriseName : ""}
                                    </span>
                                </div>
                                <i className={state.enterprise.idenState === 0 ? "ico-auth-not-no" : state.enterprise.idenState === 1 ? "ico-auth-not-md" : state.enterprise.idenState === 2 ? "ico-auth-not-fail" : "ico-auth-ok" }> </i>
                            </div>
                            <div className="cerCon">
                                <div className="contents fl">
                                    <span>实名认证：</span>
                                    <span className="fr">
                                        {state.personal.fullName ? state.personal.fullName.substring(0, 1) + utils.asterisk(state.personal.fullName.length - 1) : ""}
                                    </span>
                                </div>
                                <i className={state.personal.idenState === 0 ? "ico-auth-not-no" : state.personal.idenState === 1 ? "ico-auth-not-md" : state.personal.idenState === 2 ? "ico-auth-not-fail" : "ico-auth-ok" }> </i>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}
export default SalerAuthInfo;