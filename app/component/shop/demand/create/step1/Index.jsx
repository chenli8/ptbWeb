/**
 * Created by Kirk liu on 2017/7/24.
 */
import React from 'react';
import Type from '../../../common/Type';
import Name from '../../../common/Name';
import Budget from '../../../common/Budget';
import Address from '../../../common/Address';
import AnswerType from '../../common/AnswerType';
import Desc from './Desc';
import Phone from './Phone';
import FileUpLoad from '../../common/FileUpLoad';

import serviceApi from './../../../../../public/js/serviceApi';
import layer from './../../../../../public/js/layer';
import '../../../../../public/css/demandDetail.css';

import Nav from '../../common/Nav';
import TimeStep from '../../../common/TimeStep';
const timeStepList = [
    {position: 0, title: "发布需求", subTitle: "", status: 1},
    {position: 1, title: "需求审核", subTitle: "", status: 0},
    {position: 2, title: "匹配服务商", subTitle: "", status: 0},
    {position: 3, title: "选择服务商,签单", subTitle: "", status: 0}
];

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            loading: false
        };
        this.requireId = this.props.match.params.id;
        this.type = this.props.match.params.type;
    }

    demandCreate() {
        let refs = this.refs;
        let val = (component, stateName) => {
            return refs[component].state[stateName];
        };
        let name = val('Name', 'name');//需求名称

        let requireCategoryOne = refs.Type.state.oneId;//需求类别 一级
        let requireCategory = refs.Type.state.twoId ;//需求类别 二级
        let budgetType = refs.Budget.state.priceType;//预算类别

        let provincesId = refs.Address.state.provincesId;//省ID
        let provincesName = refs.Address.state.provincesName;//省名称
        let cityId = refs.Address.state.cityId;//市ID
        let cityName = refs.Address.state.cityName;//市名称
        let countyId = refs.Address.state.countyId;//区/县ID
        let countyName = refs.Address.state.countyName;//区/县名称

        let budgetMinPrice = val('Budget', 'minPrice');//预算价格最小
        let budgetMaxPrice = val('Budget', 'maxPrice');//预算价格最大
        let requireDesc = val('Desc', 'requireDesc');//需求描述

        let answerType = val('AnswerType', 'answerType'); //应答类型 0：自由应答 1：指定应答
        let shopListTemp =this.refs.AnswerType.state.shopList;
        let shopList = [];
        shopListTemp.map((data)=>{
            shopList.push({id:data.id,uid:data.uid})
        });
        if (requireCategoryOne == '') {
            layer.msg('需求类别一级不能为空');
            return
        }
        if (requireCategory == '') {
            layer.msg('需求类别二级不能为空');
            return
        }
        if (name == '') {
            layer.msg('需求名称不能为空');
            return
        }
        if (budgetType != 1) {
            if (budgetMinPrice == '') {
                layer.msg('需求预算不正确');
                return
            }
            if (budgetMaxPrice == '') {
                layer.msg('需求预算不正确');
                return
            }
            if(budgetType == 2){
                if (parseInt(budgetMinPrice) >= parseInt(budgetMaxPrice)) {
                    layer.msg('需求预算区间不正确,应该是从小到大');
                    return
                }
            }
        }
        if (provincesId) {
            if (!cityId) {
                layer.msg('请选择市');
                return
            }
        }
        if (requireDesc.length < 15) {
            layer.msg('详细的需求描述(不少15字)');
            return
        }
        if(answerType == 1){
            if(shopList.length==0){
                layer.msg('请至少选择一个服务商');
                return
            }
        }
        let data = {
            requireName: name,//需求名称
            requireCategory: requireCategory,//需求类别
            budgetType: budgetType,//预算类型 1/可议价 2/预算区间 3/预算价格
            provincesId: provincesId,//省ID
            provincesName: provincesName,//省名称
            cityId: cityId,//市ID
            cityName: cityName,
            countyId: countyId,//区/县ID
            countyName: countyName,
            requireDesc: requireDesc,//需求描述
            annexList: refs.FileUpLoad.state.annexList,//附件地址
            budgetMinPrice: budgetMinPrice,//最小价格
            budgetMaxPrice: budgetMaxPrice,//最大价格
            answerType:answerType
        };
        if(answerType == 1){
            data.shopList = shopList;
        }
        if (this.requireId && !this.type) {
            /*如果有requireId 并且 没有 this.type  则修改*/
            data.requireId = this.requireId;
            serviceApi('aDemandEdit', data, (data) => {
                window.location.hash = '/Step2/' + data.id;
            }, (data) => {
                layer.msg(data.message)
            })
        } else {
            /*创建 或 复制*/
            serviceApi('aDemandCreate', data, (data) => {
                window.location.hash = '/Step2/' + data.id;
            }, (data) => {
                layer.msg(data.message)
            })
        }

    }

    /*获取需求详情*/
    demandDetail() {
        serviceApi('aDemandDetail', {requireId: this.requireId}, (data) => {
            this.setState({loading: true, data: data})
        }, (data) => {
            layer.msg(data.message)
        })
    }

    componentDidMount() {
        if (this.requireId) {
            this.demandDetail()
        } else {
            this.setState({loading: true})
        }
    }

    render() {
        let state = this.state;
        let data = state.data;
        return (
            <div>
                <Nav name={timeStepList[0].title}/>
                <div className="BuyerStep">
                    <TimeStep timeData={timeStepList}/>
                </div>
                {
                    state.loading ?
                        <div className="CreateDemand">
                            <div className="WriteDemand DemandTypeDiv fl">
                                <div className="title fl"><span >需求类别<b>(必填)</b>:</span></div>
                                <Type ref="Type" oneId={data.categoryOneId} twoId={data.categoryTwoId}/>
                            </div>
                            <div className="WriteDemand">
                                <span>需求名称<b>(必填)</b>:</span>
                                <Name ref="Name" name={data.requireName} placeholder="一句话描述你的需求(不多于30字) "/>
                            </div>
                            <div className="WriteDemand">
                                <span>需求预算<b>(必填)</b>:</span>
                                <Budget ref="Budget" priceType={data.budgetType} minPrice={data.budgetMinPrice} maxPrice={data.budgetMaxPrice}/>
                            </div>

                            <div className="WriteDemand address">
                                <span>执行地点<b>(选填)</b>:</span>
                                <Address ref="Address" switch={{province:true,city:true,county:false,unlimited:true}}
                                         provincesId={data && data.region.provincesId}
                                         cityId={data && data.region.cityId}
                                />
                            </div>
                            <div className="WriteDemand">
                                <span>具体需求描述<b>(必填)</b>:</span>
                                <Desc ref="Desc" data={state.data}/>
                                <FileUpLoad ref="FileUpLoad" data={state.data}/>
                            </div>
                            <div className="WriteDemand">
                                <span>应答方式<b>(必填)</b>:</span>
                                <AnswerType data={state.data} ref="AnswerType" requireId={this.requireId}/>
                            </div>
                            <Phone ref="Phone" data={state.data}/>
                            <div className="WriteDemand">
                                <a href="javascript:;" className="PublishBtn theme-button-bg"
                                   onClick={this.demandCreate.bind(this)}
                                >立即发布需求</a>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}
export default Main;