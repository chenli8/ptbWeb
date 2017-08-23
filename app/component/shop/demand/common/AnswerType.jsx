/**
 * Created by Kirk liu on 2017/8/9.
 */
import React from 'react';
import serviceApi from '../../../../public/js/serviceApi';
import layer from '../../../../public/js/layer';
import Confirm from './../../../common/layer/Confirm';
import Page from '../../../common/Page';
import urlManager from './../../../../public/js/urlManager';
import $ from "jquery";

class Supplier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            key: '',
            total: 0,
            start: 0,
            pageSize: 5,
            loading: false
        };
    }

    onPageClick(start) {
        this.setState({
            start: start
        }, () => {
            this.getSupplierList();
        });
    }

    getSupplierList() {
        let dataParam = {
            key: this.state.key,
            categoryId: '',
            provinces: '',
            city: '',
            start: this.state.start,
            end: this.state.start + this.state.pageSize,
            sortType: 0,
            orderType: 0
        };
        layer.loading.open();
        serviceApi("aSupplierSearch", dataParam, (data) => {
            layer.loading.close();
            this.setState({
                loading: true,
                data: data.shopInfoVOList,
                total: data.total
            })
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        })
    }

    handleShopList(isCheck, shopData) {
        let requireId = this.props.requireId;
        /*判断是否选中  如果是选中 则删除,没有选中 添加*/
        if (isCheck) {
            let del = () => {
                let shopList = this.props.shopList;
                let temp = [];
                shopList.map((data) => {
                    if (data.id != shopData.id) {
                        temp.push(data);
                    }
                });
                this.props.handleShopList(temp)
            };
            del();
        } else {
            if (this.props.shopList.length === 5) {
                layer.msg('最多选择5个');
                return
            }
            let temp = this.props.shopList;
            temp.push({
                id: shopData.id,
                uid: shopData.uid,
                shopName: shopData.shopName,
                image: shopData.image,
                provincesName: shopData.provincesName,
                cityName: shopData.cityName,
                countyName: shopData.countyName
            });
            this.props.handleShopList(temp)
        }

    }

    componentDidMount() {

    }

    render() {
        let state = this.state;
        let totalNum = state.total;
        let pageSize = state.pageSize;
        let start = state.start;
        return (
            <div className="suppliers">
                <div className="search">
                    <input className="fl" type="text" ref="searchInput" placeholder="请搜索服务商店铺名称"
                           onKeyPress={(e) => {
                               if (e.which === 13) {
                                   this.refs.searchSubmit.click();
                               }
                           }}
                           onInput={(e) => {
                               this.setState({key: e.target.value})
                           }}
                    /> <a href="javascript:;" className="searchSubmit theme-button-bg fl" ref="searchSubmit"
                          onClick={() => {
                              this.setState({start: 0}, () => {
                                  this.getSupplierList();
                              })
                          }}
                >搜索</a>
                    <div className="fr">
                        <span>服务商数： {state.total}</span>
                    </div>
                </div>
                <div className="list">
                    <ul className="listCon">

                        {
                            state.loading ?
                                state.data.length > 0 ?
                                    state.data.map((data) => {
                                        let isCheck = false;
                                        this.props.shopList.map((dataShopList) => {
                                            if (dataShopList.id == data.id) {
                                                isCheck = true;
                                            }
                                        });
                                        return (
                                            <li key={data.id} className={isCheck ? ' on' : ''} onClick={() => {
                                                this.handleShopList(isCheck, data)
                                            }}>
                                                <i className={"ico-check-blue fl" + (isCheck ? ' on' : '')}
                                                   />
                                                <a href={urlManager.pShopDetail + "?shopId=" + data.id} target="_bank" onClick={(e)=>e.stopPropagation()}>
                                                    <i className="pic fl"
                                                       style={{backgroundImage: 'url(' + data.image + ')'}}/>
                                                </a>
                                                <div className="desc fl">
                                                    <div className="title">
                                                        <a href={urlManager.pShopDetail + "?shopId=" + data.id} onClick={(e)=>e.stopPropagation()}
                                                           target="_bank">
                                                            {data.shopName}
                                                        </a>
                                                    </div>
                                                    <div className="service">
                                                        <span className="fl">服务范围：</span>
                                                        {
                                                            data.shopServiceIdNameList ?
                                                                data.shopServiceIdNameList.map(function (item) {
                                                                    return (
                                                                        <span
                                                                            key={item.serviceTypeId}>{item.serviceName} </span>
                                                                    )
                                                                })
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                </div>
                                                <div className="address fr">
                                                    <div className="fr">
                                                        <i className="ico-address fl"/>
                                                        <span className="commonSingleLine">{data.provincesName == data.cityName ? data.provincesName : data.provincesName + ' ' + data.cityName} {data.countyName}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                    :
                                    <p className="searchTap">空空如也</p>
                                :
                                <p className="searchTap">请搜索你想指定应答的服务商</p>
                        }
                    </ul>
                    {
                        totalNum > pageSize ?
                            <Page totalNum={totalNum} pageSize={pageSize} start={start}
                                  onPageClick={this.onPageClick.bind(this)}/>
                            : null
                    }
                </div>
                <div className="ensure">
                    <div className="fl">
                        已选服务商:{this.props.shopList.length}个
                    </div>
                    <a href="javascript:;" onClick={() => this.props.close()}
                       className={"ensureBtn  fr " + (this.props.shopList.length > 0 ? "theme-button-bg" : "noEnsureBtn")}>确认提交</a>
                </div>
            </div>
        );
    }
}


class AnswerType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answerName: [{name: '自由应答', id: 0}, {name: '指定服务商应答', id: 1}],
            answerType: this.props.data.answerType || 0,
            selectButton: this.props.data.answerType == 1 ? true : false,
            close: false,
            shopList: this.props.data.shopList || [],
        };
    }

    close() {
        this.setState({close: !this.state.close})
    }

    handleShopList(data) {
        this.setState({shopList: data})
    }

    layerModalPos() {
        var clientHeight = $(window).height();
        if (clientHeight > 615) {
            var dis = (clientHeight - 615) / 2;
            $(".SupplierModal").css("top", dis)
        } else {
            $(".SupplierModal").css({"top": 0, "overflowY": "scroll"});
        }
    }
    ConfirmAnswerTypeShopDelCallBack(){
        this.refs.Supplier.handleShopList(this.AnswerTypeShopDelData[0], this.AnswerTypeShopDelData[1]);
    }
    componentDidMount() {
        this.layerModalPos()
    }

    render() {
        let state = this.state;
        return (
            <div className="answerType">
                <ul>
                    {
                        state.answerName.map((data) => {
                            return (
                                <li key={data.id}>
                                    <i className={"ico-radio fl" + (state.answerType === data.id ? ' on' : '')}
                                       onClick={() => {
                                           this.setState({answerType: data.id}, () => {
                                               if (data.id == 1) {
                                                   this.setState({selectButton: true})
                                               } else {
                                                   this.setState({selectButton: false})
                                               }
                                           })
                                       }}
                                    />
                                    <span>{data.name}</span>
                                </li>
                            )
                        })
                    }
                </ul>
                {
                    state.selectButton ?
                        state.shopList.length >= 5 ? null :
                            <a href="javascript:;" onClick={() => this.close()} className="serviceBtn">选择服务商</a>
                        :
                        null
                }
                <div className="layerModal answerSupplier" style={{display: state.close ? 'block' : 'none'}}
                     id="layerModal">
                    <div className="Modal SupplierModal">
                        <div className="head">
                            <div className="title fl">选择服务商应答</div>
                            <i className="ico-close fr" onClick={this.close.bind(this)}/>
                        </div>
                        <Supplier close={this.close.bind(this)} handleShopList={this.handleShopList.bind(this)}
                                  requireId={this.props.requireId}
                                  shopList={state.shopList} ref="Supplier"/>
                    </div>
                </div>
                {
                    state.answerType == 1 ?
                        <div className="selectList">
                            {
                                state.shopList.length > 0 ?
                                    state.shopList.map((data) => {
                                        return (
                                            <li key={data.id}>
                                                <a href={urlManager.pShopDetail + "?shopId=" + data.id} target="_bank" onClick={(e)=>e.stopPropagation()}>
                                                <i style={{background: 'url(' + data.image + ')'}}
                                                   className="serviceImg fl"> </i>
                                                <div className="serviceTitle fl">{data.shopName}</div>
                                                </a>
                                                <div
                                                    className="serviceAddress fl">{data.provincesName == data.cityName ? data.provincesName : data.provincesName + ' ' + data.cityName} {data.countyName}</div>
                                                <a href="javascript:;" onClick={() => {
                                                    this.AnswerTypeShopDelData = [true,data];
                                                    this.refs.ConfirmAnswerTypeShopDel.show();
                                                }} className="fr deleteBtn">删除</a>
                                            </li>
                                        )
                                    })
                                    :
                                    null
                            }
                        </div>
                        :
                        null
                }
                <Confirm ref="ConfirmAnswerTypeShopDel" callBack={this.ConfirmAnswerTypeShopDelCallBack.bind(this)}/>
            </div>
        );
    }
}
export default AnswerType;