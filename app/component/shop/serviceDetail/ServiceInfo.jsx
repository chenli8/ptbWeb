import React from 'react'
import $ from 'jquery'
import cookie from 'react-cookie'
import moment from 'moment-kirk';
import PriceFormat from '../../common/PriceFormat';
import urlManager from './../../../public/js/urlManager'
import layer from '../../../public/js/layer';
import serviceApi from '../../../public/js/serviceApi';

class ServiceDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceInfo: this.props.serviceInfo
        }
    }

    componentDidMount() {
        //图片格式
        $('.serviceDetails img').each(function () {
            let $this = $(this);
            let src = $this.attr('src');
            let imgTemp = new Image();//创建一个image对象
            imgTemp.src = src;
            imgTemp.onload = () => {//图片加载完成后执行
                let width = this.width;
                if (width>1128) {
                    $this.css({width:1128})
                }
            }
        })
    }

    render() {
        var serviceInfo = this.state.serviceInfo;
        return (
            <div className="serviceDetails" dangerouslySetInnerHTML={{__html: serviceInfo.desc}}/>
        )
    }

}

class ServiceComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: props.serviceInfo.productId,
            comments: [],
            commentQuality: 0,
            pageSize: 10,
            start: 0,
            totalNum: 0,

        }
    }

    componentDidMount() {
        //获取数据
        this.getCommentList()
    }

    getCommentList() {
        layer.loading.open();
        var data = {
            productId: this.state.productId,
            start: this.state.start,
            end: this.state.start + this.state.pageSize,
            commentQuality: this.state.commentQuality,
        }
        this.postApi = serviceApi('aServiceCommentList', data, (data) => {
            layer.loading.close();
            this.setState({
                comments: data,
            });

        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    onCommentTypeClick(types) {
        if (this.state.commentQuality === types)
            return
        this.setState({
            commentQuality: types,
            start: 0
        }, () => {
            this.getCommentList()
        })
    }

    componentWillUnmount() {
        this.postApi.abort()
    }

    render() {
        var comments = this.state.comments;
        var state = this.state;
        return (
            <div className="serviceComment">
                <div className="comSubNav">
                    <a href="javascript:;">
                        <i className={state.commentQuality === 0 ? "ico-onradio" : 'ico-radio'}
                           onClick={(commentQuality) => this.onCommentTypeClick(0)}> </i>
                        <span>全部</span>
                    </a>
                    <a href="javascript:;">
                        <i className={state.commentQuality === 1 ? "ico-onradio" : 'ico-radio'}
                           onClick={(commentQuality) => this.onCommentTypeClick(1)}> </i>
                        <span>好评</span>
                    </a>
                    <a href="javascript:;">
                        <i className={state.commentQuality === 2 ? "ico-onradio" : 'ico-radio'}
                           onClick={(commentQuality) => this.onCommentTypeClick(2)}> </i>
                        <span>中评</span>
                    </a>
                    <a href="javascript:;">
                        <i className={state.commentQuality === 3 ? "ico-onradio" : 'ico-radio'}
                           onClick={(commentQuality) => this.onCommentTypeClick(3)}> </i>
                        <span>差评</span>
                    </a>
                </div>
                <div className="comContent">
                    {
                        comments.length ?
                            comments.map(function (item) {
                                return (
                                    <div className="comItems" key={item.userInfo.userId}>
                                        <div className="uerImgs fl">
                                            <dl>
                                                <dt style={{background: "url(" + item.userInfo.userImage + ")"}}></dt>
                                                <dd>{item.userInfo.userName}</dd>
                                            </dl>
                                        </div>
                                        <div className="uerComment fl">
                                            <div className="uerComDetail">
                                                {item.commentInfo.content}
                                                <div className="times">
                                                    {moment(item.commentInfo.addTime, "x").format('YYYY-MM-DD HH:mm')}
                                                </div>
                                            </div>
                                            {
                                                item.replyInfo ?
                                                    <div className="sellerBack">
                                                        <b className="fontBold">卖家回复 : </b>
                                                        {item.replyInfo.content}
                                                        <div style={{color: "#252525"}}>
                                                            {moment(item.replyInfo.addTime, "x").format('YYYY-MM-DD HH:mm')}
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                            }

                                        </div>
                                    </div>

                                )
                            })
                            :
                            null
                    }
                </div>
            </div>
        )
    }
}

class ServiceInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceInfo: this.props.serviceInfo,
            tabIndex: 0,
            isCollection: this.props.serviceInfo.isCollection
        };
    }

    onClickBuy() {
        var serviceId = this.state.serviceInfo.serviceId;
        window.location.href = urlManager.pOrder + '#/OrderSubmit?id=' + serviceId + '&userType=1&orderType=3';
    }

    collection() {
        serviceApi('aCollection', {dataId: this.state.serviceInfo.serviceId, type: 2}, () => {
            this.setState({isCollection: 1});
            layer.msg('收藏成功')
        }, (data) => {
            layer.msg(data.message)
        })
    }
    collectionDel() {
        serviceApi('aDelCollection', {dataId: this.state.serviceInfo.serviceId, type: 2}, () => {
            this.setState({isCollection: 0});
            layer.msg('取消成功')
        }, (data) => {
            layer.msg(data.message)
        })
    }

    render() {
        var tabIndex = this.state.tabIndex;
        var serviceInfo = this.state.serviceInfo;
        var shopInfo = this.props.shopInfo;
        return (
            <div className="serviceInfo">
                <div className="baseInfo">
                    <div className="pic">
                        <img className="serviceImg fl" src={serviceInfo.img} alt=""/>
                    </div>
                    <div className="fl">
                        <p className="title">{serviceInfo.serviceName}</p>
                        <div className="priceLl">
                            <span className="priceTitle fl">价格</span>
                            <span className="price fl">
                                <PriceFormat data={{
                                    type: serviceInfo.prepayType,
                                    min: serviceInfo.minPrice,
                                    max: serviceInfo.maxPrice,
                                    position: 'detail'
                                }}/>
                            </span>

                        </div>
                        <div className="btnLl">
                            {
                                this.state.isCollection == 0 ?
                                    <a href="javascript:;" className="addLink fl" onClick={this.collection.bind(this)}>
                                        <i
                                            className="ico-collects"> </i>添加收藏</a>
                                    :
                                    <a href="javascript:;" onClick={this.collectionDel.bind(this)} className="addLink fl"><i className="ico-onCollects"/>取消收藏</a>
                            }

                            {/*<a href="javascript:;" className="addLink  fl"><i className="ico-shares"> </i>分享</a>*/}
                            {
                                cookie.load('chatUid') == shopInfo.uid ? null :
                                    <a href="javascript:;" className="buy theme-button-bg fr"
                                       onClick={() => this.onClickBuy()}>立刻购买</a>
                            }
                        </div>
                    </div>
                </div>
                <div className="tab_containers">
                            <span to="/ServiceInfo" className={tabIndex ? 'tab' : 'on'}
                                  onClick={() => {
                                      this.setState({tabIndex: 0})
                                  }}>服务详情</span>
                    <span to="/SalerAuthInfo" className={tabIndex ? 'on' : 'tab'}
                          onClick={() => {
                              this.setState({tabIndex: 1})
                          }}>累计评价</span>
                </div>
                <div className="detail">
                    {tabIndex ?
                        <ServiceComment serviceInfo={serviceInfo}/>
                        :
                        <ServiceDetail serviceInfo={serviceInfo}/>
                    }
                </div>
            </div>
        );
    }
}

export default ServiceInfo;