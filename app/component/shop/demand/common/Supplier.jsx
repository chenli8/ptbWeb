/**
 * Created by Kirk liu on 2017/7/25.
 */
import React from 'react';
import $ from 'jquery';
import cookie from 'react-cookie';
import PriceFormat from './../../../common/PriceFormat';
import Answer from './Answer';
import serviceApi from '../../../../public/js/serviceApi';
import chatUtils from '../../../common/chat/chatUtils';
import utils from '../../../../public/js/utils';
import layer from '../../../../public/js/layer';
import urlManager from '../../../../public/js/urlManager';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            look: false
        };
    }

    handelIsChatInfo(e) {
        e.stopPropagation() || e.nativeEvent.stopImmediatePropagation() || e.preventDefault();
        let {uid, shopName, image} = this.props.data.shopInfo;
        if (cookie.load('chatUid') == uid) {
            layer.msg('亲，不可以跟自己说话哦');
            return
        }
        let chatInfo = [];
        let localStorageChatInfo = JSON.parse(localStorage.getItem('chatInfo'));
        if (!localStorageChatInfo) {
            utils.loginReturnUrl();
            return
        }

        if (uid != cookie.load('chatUid')) {
            let toUser = {
                from: uid,
                toUserName: shopName,
                toUserImage: image,
            };
            chatUtils.chatLocalSaveDefault(toUser); //主动唤起 默认模拟 卖家 发送一个空消息 默认欢迎语
            chatUtils.chatMsgShow(uid);
            /* 唤起聊天窗口 给redux 转递 卖家 userId */
        }
    }

    render() {
        let {requireAnswer, shopInfo} = this.props.data;
        let userId = this.props.userId;
        return (
            <div className="item">
                <div className="top">
                    <div className="left fl">
                        <div className="img fl">
                            <div className="pic">
                                <a href={urlManager.pShopDetail + '?shopId=' + shopInfo.id}>
                                    <i style={{backgroundImage: 'url(' + shopInfo.image + ')'}}/>
                                </a>
                            </div>
                        </div>
                        <div className="info fl">
                            <div className="name">
                                <a href={urlManager.pShopDetail + '?shopId=' + shopInfo.id}>
                                    {shopInfo.shopName}
                                </a>
                            </div>
                            <div className="server">
                                服务范围：{shopInfo.shopServiceIdNameList.map((data) => {
                                return data.serviceName + ' '
                            })}
                            </div>
                            <div className="address">
                                公司 {shopInfo.provincesName} {shopInfo.cityName} {shopInfo.countyName}
                            </div>
                        </div>
                    </div>
                    <div className="right fl">
                        <div className="payData">
                            <ul>
                                <li>
                                    <span className="nums">{shopInfo.dealNum}笔</span>
                                    <span className="desc">成交量</span>
                                </li>
                                <li>
                                    <span className="nums">{shopInfo.positivePrecent}%</span>
                                    <span className="desc">好评率</span>
                                </li>
                            </ul>
                        </div>
                        {
                            requireAnswer.singing == 0 ?
                                userId == cookie.load('chatUid') ?
                                    this.props.status == 1 ?
                                        <a href={urlManager.pOrder + '#/OrderSubmit?id=' + requireAnswer.id + '&userType=1&orderType=4'}
                                           className="theme-button-bg on">确认签单</a>
                                        :
                                        null
                                    :
                                    null
                                :
                                <span>已签单</span>
                        }
                        <a href={urlManager.pShopDetail + '?shopId=' + shopInfo.id}
                           className="enterShop theme-button-bg on">进入店铺</a>
                        {
                            shopInfo.uid != cookie.load('chatUid') ?
                                <a href="javascript:;" onClick={this.handelIsChatInfo.bind(this)}>联系卖家</a>
                                :
                                null
                        }
                    </div>
                </div>
                {
                    (userId == cookie.load('chatUid') || shopInfo.uid == cookie.load('chatUid')) && this.props.status == 1 ?
                        <div className="btm">
                            <div className="sellerReply">
                                <div className="price clear">
                                    <span className="fl">报价：</span>
                                    <PriceFormat data={{
                                        type: requireAnswer.budgetType,
                                        min: requireAnswer.budgetMinPrice,
                                        max: requireAnswer.budgetMaxPrice,
                                        position: 'detail'
                                    }}/>
                                </div>
                                <div className="sererDec">
                                    服务描述：
                                    {
                                        requireAnswer.serviceDesc.length > 130
                                            ?
                                            <span>
                                    {this.state.look ? requireAnswer.serviceDesc : requireAnswer.serviceDesc.substring(0, 130) + '...'}
                                                {
                                                    this.state.look ?
                                                        <a href="javascript:;"
                                                           onClick={() => this.setState({look: false})}>收起</a>
                                                        :
                                                        <a href="javascript:;"
                                                           onClick={() => this.setState({look: true})}>查看全部</a>
                                                }
                                </span>
                                            :
                                            requireAnswer.serviceDesc
                                    }
                                </div>
                            </div>
                            {
                                requireAnswer && requireAnswer.annexList && requireAnswer.annexList.length > 0 ?
                                    <div className="quotes">
                                        报价单: <a href={requireAnswer.annexList[0].annexUrl}
                                                target="_bank"
                                                className="quotesItems">{requireAnswer.annexList[0].annexName}</a>
                                    </div>
                                    :
                                    null
                            }

                        </div>
                        :
                        null
                }

            </div>
        )
            ;
    }
}


class Supplier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            display: true,
            annexList: true, /*初始化 报价单状态*/
            annexListIndex: '', /*报价单所在 ID */
        };
    }

    demandShopList() {
        serviceApi('aDemandShopList', {requireId: this.props.requireId}, (data) => {
            this.setState({data: data});
        }, (data) => {
            layer.msg(data.message)
        })
    }

    /*报价单上传*/
    uploadPrice(dataProps) {
        if (!dataProps) {
            return
        }
        let {requireAnswer, shopInfo} = dataProps;
        $('#file1').change(function () {
            layer.loading.open();
            let input = this;
            let file = input.files[0];
            if (file) {
                let byteSize = file.size;
                if (byteSize > 10240000) {
                    layer.msg('文件不能超过10M');
                    return false;
                }
            } else {
                return false;
            }

            $.ajaxFileUpload({
                url: urlManager.aDemandUpload,
                type: 'post',
                secureuri: false, //一般设置为false
                fileElementId: 'file1', // 上传文件的id、name属性名
                dataType: 'text', //返回值类型，一般设置为json、application/json
                data: {type: 1}, //传递参数到服务器  需求相关附件，不传默认0    0- 需求附件  1-应答附件
                success: function (data, status) {
                    let dataParam = {
                        id: requireAnswer.id,
                        requireId: requireAnswer.requireId,
                        budgetType: requireAnswer.budgetType,
                        serviceDesc: requireAnswer.serviceDesc,
                        budgetMinPrice: requireAnswer.budgetMinPrice,
                        budgetMaxPrice: requireAnswer.budgetMaxPrice,
                        shopId: requireAnswer.shopId,
                        singing: requireAnswer.singing,
                        annexList: [
                            {
                                annexName: file.name,
                                annexUrl: JSON.parse(data).data.annexUrl
                            }
                        ]
                    };
                    serviceApi('aDemandAnswerEdit', dataParam, () => {
                        layer.msg('上传成功', () => {
                            location.reload()
                        });
                    }, (data) => {
                        layer.msg(data.message);
                    });
                },
                error: function (data, status, e) {
                    layer.loading.close();
                    layer.msg('上传失败');
                }
            });
        })
    }

    /*报价单上传 绑定事件*/
    componentDidUpdate() {
        if (!this.state.annexList) {
            this.uploadPrice(this.state.data[this.state.annexListIndex]);
        }
    }

    componentDidMount() {
        this.demandShopList();
    }

    render() {
        let dataDemandInfo = this.props.data;
        let state = this.state;
        let data = state.data;
        let dataOk = [];
        let dataNo = [];
        data.map((data) => {
            if (data.answerStatus == 1) {
                dataOk.push(data)
            } else if (data.answerStatus == 0) {
                dataNo.push(data)
            }
        });

        let isAnswer = false;
        /*判断是否应答*/
        let annexList = true;
        /*上传报价单*/
        data.map((data, index) => {
            if (cookie.load('chatUid') == data.shopInfo.uid) {
                if (data.answerStatus == 1)
                    isAnswer = true;
                if (!data.requireAnswer.annexList) {
                    annexList = false;
                    this.state.annexList = false;
                    this.state.annexListIndex = index;
                    this.uploadPrice();
                }
                return
            }
        });

        return (
            <div className="supplier">
                <div
                    className={"title " + (dataDemandInfo.userId == cookie.load('chatUid') && dataDemandInfo.answerType == 1 ? 'other' : '')}>
                    {
                        dataDemandInfo.userId == cookie.load('chatUid') && dataDemandInfo.answerType == 1 ?
                            <div className="nav">
                                <span onClick={() => {
                                    this.setState({display: true})
                                }}
                                      className={state.display ? "on" : ""}
                                >已应答服务商（{dataDemandInfo.answerNum}）</span>
                                <span onClick={() => {
                                    this.setState({display: false})
                                }}
                                      className={state.display ? " " : "on"}
                                >待应答服务商（{data.length - dataDemandInfo.answerNum}）</span>
                            </div>
                            :
                            <span>已应答服务商（{dataDemandInfo.answerNum}）</span>
                    }

                    {
                        /*判断需求状态 1/待审核 2/应答中 3/已结束 4/已关闭 5/已删除 */
                        dataDemandInfo.status == 2 ?
                            /*判断是否登录*/
                            cookie.load('token') ?
                                /*判断是否应答次数超出*/
                                dataDemandInfo.answerNum <= dataDemandInfo.maxAnswerNum ?
                                    /*判断是否是自己*/
                                    dataDemandInfo.userId != cookie.load('chatUid') ?
                                        /*判断是否可以应答*/
                                        dataDemandInfo.allowAnswer == 1 ?
                                            /*判断是否应答*/
                                            isAnswer ?
                                                /*上传报价单*/
                                                annexList ?
                                                    null
                                                    :
                                                    <div className="fr">
                                                        <a href="javascript:;" className="answerBtn fr theme-button-bg"
                                                           onClick={() => this.refs.Answer.show()}
                                                        >上传报价单</a>
                                                        <input type="file" name="file" id="file1" className="file"
                                                        />
                                                    </div>
                                                :
                                                <a href="javascript:;" className="answerBtn fr theme-button-bg"
                                                   onClick={() => this.refs.Answer.show()}
                                                >我要应答</a>
                                            :
                                            <span className="fr answerType1">该需求已指定应答</span>
                                        :
                                        null
                                    :
                                    null

                                :
                                <a href="javascript:;" className="answerBtn fr theme-button-bg"
                                   onClick={() => utils.loginReturnUrl()
                                   }
                                >我要应答</a>
                            :
                            null
                    }
                </div>
                <div className="content" style={{display: state.display ? 'block' : 'none'}}>
                    {/*status 1 已应答*/}
                    {
                        dataOk.length > 0 ?
                            dataOk.map((data) => {
                                return <Item data={data} userId={dataDemandInfo.userId} key={data.requireAnswer.id}
                                             status="1"/>
                            })
                            :
                            <p>暂时还没有服务商应答</p>
                    }
                </div>
                <div className="content" style={{display: !state.display ? 'block' : 'none'}}>
                    {/*status 0 未应答*/}
                    {
                        dataNo.length > 0 ?
                            dataNo.map((data) => {
                                return <Item data={data} userId={dataDemandInfo.userId} key={data.requireAnswer.id}
                                             status="0"/>
                            })
                            :
                            <p>暂时还没有服务商待应答</p>
                    }
                </div>
                <Answer ref="Answer" requireId={this.props.requireId}/>
            </div>
        );
    }
}


export default Supplier;