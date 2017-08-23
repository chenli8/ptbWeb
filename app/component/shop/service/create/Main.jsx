/**
 * Created by Kirk liu on 2017/7/27.
 */
import React from 'react';
import $ from 'jquery';

import SearchBtn from '../../../common/SearchBtn';
import Type from '../../common/Type';
import Name from '../../common/Name';
import Budget from '../../common/Budget';
import Address from '../../common/Address';
import FileUpload from './FileUpload';

import layer from './../../../../public/js/layer';
import serviceApi from './../../../../public/js/serviceApi';
import urlManager from './../../../../public/js/urlManager';
import '../../../../public/plugin/ajaxfileupload';
import '../../../../public/css/demandDetail.css';
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:'',
            desc: '',
            statusName: [{name:'上架',status:1},{name:'下架',status:0}],
            status: 1,
            agreement: false,
            numTotal: 0,
            loading:false,
        };
        this.serviceId = this.props.match.params.serviceId;
    }

    serviceCreate() {
        let refs = this.refs;
        let val = (component, stateName) => {
            return refs[component].state[stateName];
        };
        let serviceCategoryIdTop = refs.Type.state.oneId;//服务类别 一级
        let serviceCategoryId = refs.Type.state.twoId;//服务类别 二级
        if (serviceCategoryIdTop == '') {
            layer.msg('服务类别一级不能为空');
            return
        }
        if (serviceCategoryId == '') {
            layer.msg('服务类别二级不能为空');
            return
        }
        let serviceName = val('Name', 'name');
        if (serviceName == '') {
            layer.msg('服务名称不能为空');
            return
        }
        let img = refs.FileUpload.state.img;//封面图片
        if (!img) {
            layer.msg('封面图片不能为空');
            return
        }
        let budgetType = refs.Budget.state.priceType;//预算类别

        let provincesId = refs.Address.state.provincesId;//省ID
        let provincesName = refs.Address.state.provincesName;//省名称
        let cityId = refs.Address.state.cityId;//市ID
        let cityName = refs.Address.state.cityName;//市名称
        let countyId = refs.Address.state.countyId;//区/县ID
        let countyName = refs.Address.state.countyName;//区/县名称

        let budgetMinPrice = val('Budget', 'minPrice');//预算价格最小
        let budgetMaxPrice = val('Budget', 'maxPrice');//预算价格最大

        if (budgetType != 1) {
            if (budgetMinPrice == '') {
                layer.msg('需求预算不正确');
                return
            }
            if (budgetMaxPrice == '') {
                layer.msg('需求预算不正确');
                return
            }
            if (budgetMinPrice > budgetMaxPrice) {
                layer.msg('需求预算区间不正确,应该是从小到大');
                return
            }
        }
        let desc = UE.getEditor('editor').getContent();//服务描述 this.state.desc
        if (desc.length < 15) {
            layer.msg('详细的服务描述(不少15字)');
            return
        }
        if (!this.state.agreement) {
            layer.msg('必须同意《品推宝服务发布协议》');
            return
        }
        let data = {
            serviceName: serviceName,//服务名称
            img: img,//封面
            price: budgetMaxPrice,//服务价格 报价类型为 3.预算价格 有效
            prepayType: budgetType,//服务报价类型 1.可议价  2.预算区间 3.预算价格
            desc: desc,//描述
            status: this.state.status,//是否上架  1上架 0下架
            minPrice: budgetMinPrice,//服务报价最低价 报价类型为 2.预算区间 有效
            maxPrice: budgetMaxPrice,//服务报价最高价 报价类型为 2.预算区间 有效
            provinceCode: provincesId || 0,//服务地域 市级code region表
            cityCode: cityId || 0,//服务地域 市级code region表
            serviceCategoryId: serviceCategoryId,//服务分类二级ID
            serviceCategoryIdTop: serviceCategoryIdTop,//	服务分类一级ID
            serviceId: this.serviceId,//服务ID 如果该值不为null，则更新，如果为null则创建
        };
        serviceApi('aServiceCreate', data, () => {
            layer.msg('操作成功', () => {
                window.location.href = urlManager.pSellerCenter + '#/MannageServer'
            });
        }, (data) => {
            layer.msg(data.message)
        })
    }

    getServiceDetail() {
        serviceApi('aServiceDetail', {serviceId: this.serviceId}, (data) => {
            this.setState({loading: true, data: data.serviceInfo,status:data.serviceInfo.status,desc:data.serviceInfo.desc},()=>{
                this.uEditBind({content:data.serviceInfo.desc});/*bind编辑器*/
            })
        }, (data) => {
            layer.msg(data.message)
        })
    }
    uEditBind(uEditObj){
        function fun(){
            $('#file1').change(function(){
                let input = document.getElementById('file1');
                if (typeof FileReader === 'undefined') {
                    layer.msg("抱歉，你的浏览器不支持 FileReader");
                    input.setAttribute('disabled', 'disabled');
                    return;
                }
                let file = input.files[0];
                let reader = new FileReader();
                let width = '';
                let height = '';
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    let image = new Image();
                    image.src = this.result;
                    image.onload = function () {
                        width = this.width;
                        height = this.height;
                    };
                };
                if (file) {
                    let byteSize = file.size;
                    if (byteSize > 1024000000) {
                        layer.msg('文件不能超过10M');
                        return false;
                    }
                } else {
                    return false;
                }

                layer.loading.open();
                $.ajaxFileUpload({
                    url: urlManager.aUploadPic,
                    type: 'post',
                    secureuri: false, //一般设置为false
                    fileElementId: 'file1', // 上传文件的id、name属性名
                    dataType: 'text', //返回值类型，一般设置为json、application/json
                    data: {type: 2}, //传递参数到服务器
                    success: function (data, status) {
                        layer.loading.close();
                        layer.msg('上传成功');
                        setTimeout(()=>{
                            UE.getEditor('editor').execCommand('insertHtml', '<img src="' + JSON.parse(data).data.url + '" />');
                        },200);
                        $('#file1').replaceWith('<input type="file" name="file" id="file1" class="upLoadPicFile" />');
                        fun();
                    },
                    error: function (data, status, e) {
                        layer.loading.close();
                        layer.msg('上传失败');
                    }
                });
            })
        }

        $.getScript("plugin/ueditor/ueditor.config.js", function () {
            console.log('ueditor 配置加载成功');
            $.getScript("plugin/ueditor/ueditor.all.min.js", function () {
                UE.getEditor('editor',{maximumWords:1000}).ready(function(){
                    this.setContent(uEditObj.content);
                });
                fun();
            })
        });
    }
    componentDidMount() {
        if (this.serviceId) {
            this.getServiceDetail();
        }else{
            this.setState({loading: true},()=>{
                this.uEditBind({content:''});/*bind编辑器*/
            });
        }
    }

    render() {
        let state = this.state;
        let data = state.data;
        return (
            <div className="container">
                <div className="demandDetail serviceDetail">
                    <SearchBtn />
                    {
                        state.loading ?
                            <div className="CreateDemand">
                                <div className="WriteDemand DemandTypeDiv fl">
                                    <div className="title fl"><span >服务类别<b>(必填)</b>:</span></div>
                                    <Type ref="Type" oneId={data.serviceCategoryIdTop} twoId={data.serviceCategoryId} type="service"/>
                                </div>
                                <div className="WriteDemand">
                                    <span>服务名称<b>(必填)</b>:</span>
                                    <Name ref="Name" placeholder="一句话描述你的服务需求(不多于30字) " name={data.serviceName}/>
                                </div>
                                <div className="WriteDemand cover">
                                    <span>服务封面<b>(必填)</b>:</span>
                                    <FileUpload ref="FileUpload" img={data.img}/>
                                </div>
                                <div className="WriteDemand">
                                    <span>服务报价<b>(必填)</b>:</span>
                                    <Budget ref="Budget" type="1" priceType={data.prepayType} minPrice={data.minPrice} maxPrice={data.maxPrice}/>
                                </div>
                                <div className="WriteDemand address">
                                    <span>服务地点<b>(选填)</b>:</span>
                                    <Address ref="Address" switch={{province: true, city: true, county: false,unlimited:true}}
                                             provincesId={data.provinceCode}
                                             cityId={data.cityCode}
                                    />
                                </div>
                                <div className="WriteDemand">
                                    <span>具体服务描述<b>(必填)</b>:</span>
                                    <div className="textarea">
                                        <div className="UEditor">
                                            <i className="upLoadPic" />
                                            <input type="file" name="file" id="file1" className="upLoadPicFile" accept=".jpg,.jpeg,.png" />
                                            <script id="editor" type="text/plain" style={{width: 1024, height: 500}}/>
                                        </div>
                                         {/*<textarea className="Demanddesc" placeholder="详细的服务描述(不少15字)"
                                                   onInput={(e) => {
                                                       let val = e.target.value;
                                                       this.setState({desc: val, numTotal: val.length})
                                                   }}
                                                   maxLength={state.numTotal == 1000 ? 1000 : 2000}
                                                   defaultValue={data.desc}
                                         />*/}
                                        {/*<span className="numTotal">{data.desc ? data.desc.length : state.numTotal}/1000</span>*/}
                                    </div>
                                </div>
                                <div className="WriteDemand">
                                    <span>发布状态:</span>
                                    <div className="demandBudget">
                                        <div className="price fl">
                                            {
                                                state.statusName.map((data) => {
                                                    return (
                                                        <li key={data.status}>
                                                            <i className={state.status == data.status ? "ico-radio on" : "ico-radio" }
                                                               onClick={() => {
                                                                   this.setState({status: data.status})
                                                               }}
                                                            />
                                                            <span>{data.name}</span>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="WriteDemand tips">
                                    <i className={state.agreement ? "ico-check-blue on fl" : "ico-check-blue fl"}
                                       onClick={() => {
                                           this.setState({agreement: !state.agreement})
                                       }}/>
                                    <span className="fl">
                                   我承诺以上图文信息不涉及侵权，如若侵权发生纠纷，与品推宝无关，并同意
                                    <a href={urlManager.pAgreement+'#/ServiceGuarantee'} target="_bank">《品推宝服务发布规定》</a>
                                </span>
                                </div>
                                <div className="WriteDemand">
                                    <a href="javascript:;" className="PublishBtn theme-button-bg"
                                       onClick={this.serviceCreate.bind(this)}
                                    >立即发布服务</a>
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}
export default Main;