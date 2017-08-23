import React from 'react';
import cookie from 'react-cookie'
import '../../../public/css/sellerCenter.css';
import layer from '../../../public/js/layer';
import serviceApi from '../../../public/js/serviceApi';
import urlManager from "../../../public/js/urlManager";
import utils from "../../../public/js/utils";

class SellerCenter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userImage: cookie.load('userImage'),
            nickName: cookie.load('nickName'),
            isLoaded:true,
            userInfo:{},
            authStatusList:[],
            isAllAuthComplete:false,
            shopInfo:{}
        };
    }

    componentDidMount() {
        this.getUserInfo();
        this.getAuthStatus();
        this.getShopInfo();
    }

    getUserInfo() {
        layer.loading.open();
        this.postApi = serviceApi('account', {
        }, (data) => {
            layer.loading.close();
            this.setState({
                userInfo: data,
                isLoaded:true
            });
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    getAuthStatus(){
        this.postApi = serviceApi('aShopProgressquery', {},
            (data) => {
                layer.loading.close();
                var dataObj = eval("(" + data.status + ")");
                this.formatData(dataObj);
            }, (data) => {
                layer.loading.close();
                layer.msg(data.message)
            });
    }

    getShopInfo() {
        this.postApi = serviceApi('aGetshopinfo', {
            userid: cookie.load('uid')
        }, (data) => {
            this.setState({
                shopInfo:data
            });
        }, (data) => {
        });
    }

    formatData(dataObj){
        if(dataObj == null){
            return;
        }
        let isComplete = false;
        if(dataObj.shopBasicInfo == 3 && dataObj.personState == 3 && dataObj.enterpriseState == 3 && dataObj.shopService == 1){
            isComplete = true;
        }

        var dataList = [];
        dataList.push({type:0, title:"店铺基本信息", subTitle:"包含：您的店铺头像、店铺名称、店铺经营范围等等基本信息。好的店铺名称能让雇主更好的记住您。", status: dataObj.shopBasicInfo, btnText:"完善信息"});
        dataList.push({type:1, title:"实名认证", subTitle:"完成实名认证，提升店铺的安全度，增加买家的信任度，促进买家下单。", status:dataObj.personState, btnText:"去认证"});
        dataList.push({type:2, title:"企业认证", subTitle:"完成企业资质认证，确保对公打款无障碍。钱款快速到账。", status:dataObj.enterpriseState, btnText:"去认证"});
        dataList.push({type:3, title:"发布服务", subTitle:"将您的服务具体化，详细展示服务的价格和详情等信息，吸引买家下单。", status:dataObj.shopService, btnText:"去发布"});
        this.setState({
            authStatusList:dataList,
            isAllAuthComplete:isComplete
        });
    }

    onReleaseServiceClick(item){
        if(this.state.authStatusList && this.state.authStatusList.length > 0){
            if(this.state.authStatusList[0].status === 1 || this.state.authStatusList[0].status === 3){
                window.location.href = urlManager.pServiceCreate;
            } else{
                layer.msg("店铺审核通过才能发布服务");
            }
        }
    }

    onAuthClick(item){
        if(item.status === 1){
            layer.msg("正在审核中，请耐心等待审核结果");
            return;
        }
        if(item.status === 0 || item.status === 2){
            window.location.href = urlManager.pCreateShop + '#/' + item.type;
        }
    }

    onSetting(){
        window.location.href = urlManager.pAccount;
    }

    onDealRecord(){
        this.props.history.push({ pathname: '/TransRecord'});
    }

    onWithdraw(){
        this.props.history.push({ pathname: '/WithdrawHistory/WithdrawApplyMain'});
    }

    onShopStatusClick(){
        // 改为不营业不需要限制
        if(this.state.shopInfo.status == 1){
            this.updateShopInfo(0);
            return;
        }

        // 必须全部验证通过且发布过服务才能改为营业状态
        if(this.state.isAllAuthComplete){
            this.updateShopInfo(1);
        }
    }

    updateShopInfo(newStatus){
        var params = {
            shopId:this.state.shopInfo.id,
            status:newStatus
        }

        layer.loading.open();
        this.postApi = serviceApi('aUpdateShopInfo', params, (data) => {
            layer.loading.close();
            this.updateShopInfoSuccess(newStatus);
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    updateShopInfoSuccess(newStatus){
        let tempShop = this.state.shopInfo;
        tempShop.status = newStatus;
        this.setState({
            shopInfo:tempShop
        });
    }

    onOrder(type){
        this.props.history.push({ pathname: '/SellerOrderList', state:type});
    }

    render() {
        var state=this.state;
        var userInfo=state.userInfo;
        return (
           <div>
               {
                   state.isLoaded ?
                       <div className="fr userCon">
                           <div className="userCon-top">
                               <div className="info fl">
                                   <div className="userImg fl">
                                       {
                                           (state.shopInfo.image === null || state.shopInfo.image === undefined || state.shopInfo.image === '') ?
                                               <i/>
                                               :
                                               <i style={{background:"url("+state.shopInfo.image+")"}}/>
                                       }
                                   </div>
                                   <div className="UserName fl">
                                       <div className="title">
                                           {state.shopInfo.shopName}
                                       </div>
                                       <div className="Orders">
                                           <ul>
                                               <li>
                                                   <span>成功订单</span>
                                                   <b>{userInfo.sellerDealNum || 0}笔</b>
                                               </li>
                                               <li>
                                                   <span>收入金额</span>
                                                   <b><i className="sub">¥</i>{utils.toDecimal2(userInfo.sellerIncomeAmount / 100)}</b>
                                               </li>
                                           </ul>
                                       </div>
                                   </div>
                               </div>
                               <div className="userSet fr">
                                   <div className="account fl">
                                       <div className="setting" onClick={()=>this.onSetting()}>
                                           <i className="ico-setting"> </i>
                                           <a href="javascript:;">账号设置</a>
                                       </div>
                                       <div className="shopOpenCon" onClick={()=>this.onShopStatusClick()}>
                                            <i className={this.state.shopInfo.status === 1 ? "open" : "close"}/>
                                       </div>
                                   </div>
                                   <div className="accInfo fr">
                                       <span>账户余额</span>
                                       <b><i className="sub">¥</i>{utils.toDecimal2(userInfo.masterAccountMoney / 100)}</b>
                                       <a href="javascript:;" className="withdrawBtn fl" onClick={()=>this.onWithdraw()}>提现</a>
                                       <a href="javascript:;" className="accHistory fr" onClick={()=>this.onDealRecord()}>交易记录</a>
                                   </div>
                               </div>
                           </div>
                           {
                               state.isAllAuthComplete ?
                                   <div className="userCon-btm">
                                       <ul>
                                           <li onClick={()=>this.onOrder(0)}>
                                               <i className="ico-waitsure"> </i>
                                               <a href="javascript:;">待确认订单</a>
                                               <i className="rgtip"> </i>
                                           </li>
                                           <li onClick={()=>this.onOrder(1)}>
                                               <i className="ico-waitmoney"> </i>
                                               <a href="javascript:;">执行中订单</a>
                                               <i className="rgtip"> </i>
                                           </li>
                                           <li onClick={()=>this.onOrder(2)}>
                                               <i className="ico-waitgods"> </i>
                                               <a href="javascript:;">已完成订单</a>
                                               <i className="rgtip"> </i>
                                           </li>
                                           {/*<li onClick={()=>this.onOrder(2)}>*/}
                                           {/*<i className="ico-waitcommon"> </i>*/}
                                           {/*<a href="javascript:;">待评价订单</a>*/}
                                           {/*</li>*/}
                                       </ul>
                                   </div>
                                   :
                                   <div>
                                       <div className="openShopGuide">
                                           <div className="fl line"></div>
                                           <div className="guideTitle fl">完成下列任务，立即开店</div>
                                           <div className="fr line"></div>
                                       </div>
                                       <ul className="taskList">
                                           {
                                               state.authStatusList ?
                                                   state.authStatusList.map((item) => {
                                                       return (
                                                           <li key={item.type}>
                                                               <div className="taskItem">
                                                                   <div className="taskTitle">{item.title}</div>
                                                                   <div className={item.type === 3 ? item.status === 1 ? "taskLine" : "taskLine-s" : item.status === 3 ? "taskLine" : "taskLine-s"}></div>
                                                                   <div className="taskDesc">
                                                                       {item.subTitle}
                                                                   </div>
                                                                   <div className="taskAuth">
                                                                       {
                                                                           item.type === 3 ?
                                                                               item.status === 1 ?
                                                                                   <i className="hasReleaseService"/>
                                                                                   :
                                                                                   <a href="javascript:;" className="theme-button-bg" onClick={this.onReleaseServiceClick.bind(this, item)}>{item.btnText}</a>
                                                                               :
                                                                               item.status === 3 ?
                                                                                   <i className={item.type === 0 ? "" : "auth"}/>
                                                                                   :
                                                                                   <a href="javascript:;" className={item.status === 1 ? "disable" : "theme-button-bg"} onClick={this.onAuthClick.bind(this, item)}>
                                                                                       {item.status === 1 ? "审核中" : item.btnText}
                                                                                   </a>
                                                                       }
                                                                   </div>
                                                               </div>
                                                           </li>
                                                       )
                                                   })
                                                   :
                                                   null
                                           }
                                       </ul>
                                   </div>
                           }
                       </div>
                       :
                       null
               }
           </div>
        );
    }
}
export default SellerCenter;