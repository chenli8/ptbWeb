/**
 * 修改店铺名称记录组件
 */
import React from 'react';
import '../../../public/css/sellerShopBaseInfo.css';
import layer from '../../../public/js/layer';
import serviceApi from '../../../public/js/serviceApi';
import urlManager from "../../../public/js/urlManager";
import $ from 'jquery';
import '../../../public/plugin/ajaxfileupload';
import moment from 'moment-kirk';
import Address from "../../shop/common/Address";
import cookie from 'react-cookie'

class EditShopNameRecord extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recordList:[]
        };
    }

    componentDidMount() {
        this.getRecordList();
    }

    getRecordList(){
        var params = {
            shopId:this.props.shopId
        }
        this.postApi = serviceApi('aGetchangenamelog', params, (data) => {
            layer.loading.close();
            this.setState({
                recordList:data.changeNameVOList
            })
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    close(){
        this.props.onCloseClick();
    }

    render() {
        return (
            <div className="layerModal">
                <div className="editShopNameRecordCon">
                    <a href="javascript:;" className="fr" onClick={this.close.bind(this)}></a>
                    <ul className="editShopNameRecordList">
                        {this.state.recordList.map((item, index) => {
                            return  <li key={index}>
                                <div className="nameLog fl">{item.nameLog}</div>
                                <div className="time fr">{moment(item.createTime, "x").format('YYYY-MM-DD HH:mm')}</div>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}


class ShopBaseInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad:false,
            isShowEditShopNameRecord:false,
            editType:-1,
            editShopImageUrl:"",
            editShopImagePath:"",
            editShopName:"",
            editShopDesc:"",
            editShopAddressDetail:"",
            shopInfo:{},
            categories: [],
            selectedCategory: []
        };
    }

    componentDidMount() {
        this.getShopInfo()
    }

    getShopInfo() {
        layer.loading.open();
        this.postApi = serviceApi('aGetshopinfo', {
            userid: cookie.load('uid')
        }, (data) => {
            layer.loading.close();
            this.setState({
                isLoad:true,
                shopInfo: data,
                selectedCategory:data.shopServiceIdNameList,
            });
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    onEditShopInfoClick(editType, inputId){
        if(editType == 2){
            if(this.state.categories.length === 0){
                this.getCategoryList();
            } else{
                $('#categoryId').removeClass("hide");
            }
        }

        this.setState({
            editType:editType
        });
    }

    getCategoryList(){
        var THIS = this;

        if(THIS.state.categories.length > 0){
            $('#categoryId').removeClass("hide");
            return;
        }

        serviceApi('aCategoryList', {}, (data) => {
            THIS.setState({
                categories: data.categoryList
            },function () {
                $('#categoryId').removeClass("hide");
            })
        }, (data) => {
            layer.msg(data.message)
        })
    }

    isCategorySelected(category){
        if(category === null){
            return false;
        }
        if(this.state.selectedCategory.length == 0){
            return false;
        }

        for(let i =0; i < this.state.selectedCategory.length; i++){
            let item = this.state.selectedCategory[i];
            if(item.serviceTypeId === category.categoryId){
                return true;
            }
        }
        return false;
    }

    onCategoryItemClick(category){
        if(category === null){
            return;
        }

        if(this.isCategorySelected(category)){
            $('#categoryId').addClass("hide");
            var tempArr = [];
            for(let i = 0; i < this.state.selectedCategory.length; i++){
                let selectedCategoty = this.state.selectedCategory[i];
                if(selectedCategoty.serviceTypeId != category.categoryId){
                    tempArr.push(selectedCategoty);
                }
            }
            this.setState({
                selectedCategory:tempArr
            }, function () {
                this.updateShopService();
            })

        } else{
            if(this.state.selectedCategory.length >= 3){
                layer.msg("店铺服务类别最多选3个");
                return;
            }
            $('#categoryId').addClass("hide");
            this.setState({
                selectedCategory:this.state.selectedCategory.concat([{serviceTypeId:category.categoryId, serviceName:category.categoryName}])
            }, function () {
                this.updateShopService();
            })
        }
    }

    onCloseChooseCategory(){
        $('#categoryId').addClass("hide");
    }

    updateShopService(){
        var THIS = this;
        var params = {
            shopId:THIS.state.shopInfo.id,
            serviceTypeList:[]
        }
        for(let i =0; i < this.state.selectedCategory.length; i++){
            let item = this.state.selectedCategory[i];
            params.serviceTypeList.push(item.serviceTypeId);
        }

        layer.loading.open();
        this.postApi = serviceApi('aUpdateservice', params, (data) => {
            layer.loading.close();

            var tempObj = THIS.state.shopInfo;
            tempObj.shopServiceIdNameList = THIS.state.selectedCategory;
            this.setState({
                shopInfo:tempObj
            });
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        });
    }

    readFile(elId){
        this.setState({
            editType:0
        });

        var THIS = this;
        let input = document.getElementById(elId);
        if (typeof FileReader === 'undefined') {
            layer.msg("抱歉，你的浏览器不支持 FileReader");
            input.setAttribute('disabled', 'disabled');
            return;
        }

        let file = input.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            $("#shopImageId").attr("src", this.result);
        }

        if (file) {
            let byteSize = file.size;
            if (byteSize > 1024000) {
                layer.msg('文件不能超过1M');
                return false;
            }
            THIS.uploadPic();
        }
    }

    uploadPic() {
        var THIS = this;

        let id = "shopImageInputId";

        layer.loading.open();
        $.ajaxFileUpload({
            url: urlManager.aUploadPic,
            type: 'post',
            secureuri: false, // 一般设置为false
            fileElementId: id, // 上传文件的id、name属性名
            dataType: 'text', // 返回值类型，一般设置为json、application/json
            data: {type: 6}, // 传递参数到服务器
            success: function (data, status) {
                layer.loading.close();
                layer.msg('上传成功');
                THIS.setState({
                    editShopImagePath:JSON.parse(data).data.url
                }, function () {
                    THIS.updateShopInfo();
                });
            },
            error: function (data, status, e) {
                layer.loading.close();
                layer.msg('上传失败');
                if(this.state.editShopImageUrl === ''){
                    $("#shopImageId").attr("src", this.state.shopInfo.image);
                } else{
                    $("#shopImageId").attr("src", this.state.editShopImageUrl);
                }
            }
        });
    }

    onShopNameChange(e){
        this.state.editShopName = e.target.value;
    }

    onShopDescChange(e){
        this.state.editShopDesc = e.target.value;
    }

    onShopNameInputBlur(e){
        // this.setState({
        //     editType:-1
        // });
    }

    updateShopInfo(){
        var params = {
            shopId:this.state.shopInfo.id,
        }
        if(this.state.editType == 0){
            if(this.state.editShopImagePath === ''){
                this.resetEditType();
                return;
            }

            params.image = this.state.editShopImagePath;
        } else if(this.state.editType == 1){
            if(this.state.editShopName === ''){
                this.resetEditType();
                return;
            }

            params.shopName = this.state.editShopName;
        }else if(this.state.editType == 3){
            if(this.state.editShopAddressDetail === ''){
                this.resetEditType();
                return;
            }

            params.provinces = this.refs.Address.state.provincesId;
            params.city = this.refs.Address.state.cityId;
            params.county = this.refs.Address.state.countyId;
            params.detailInfo = this.state.editShopAddressDetail;
        }  else if(this.state.editType == 4){
            if(this.state.editShopDesc === ''){
                this.resetEditType();
                return;
            }

            params.serviceDesc = this.state.editShopDesc;
        }

        layer.loading.open();
        this.postApi = serviceApi('aUpdateShopInfo', params, (data) => {
            layer.loading.close();
            this.updateShopInfoSuccess();
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
            this.updateShopInfoFail(data);
        });
    }

    updateShopInfoFail(data){
        if(this.state.editType == 0){
            if(this.state.editShopImageUrl){
                $("#shopImageId").attr("src", this.state.editShopImageUrl);
            } else if(this.state.shopInfo.image){
                $("#shopImageId").attr("src", this.state.shopInfo.image);
            } else{
                // TODO 不知道怎么动态设置img的src为本地默认图片
            }
            if(data.code == 50028){
                this.resetEditType();
            }
        } else if(this.state.editType == 1 && data.code == 50026){
            this.resetEditType();
        } else if(this.state.editType == 4 && data.code == 50027){
            this.resetEditType();
        }
    }

    updateShopInfoSuccess(){
        if(this.state.editType != 0){
            layer.msg('修改成功');
        }

        if(this.state.editType == 0){
            this.state.shopInfo.editShopImageUrl = this.state.editShopImagePath;
        }else if(this.state.editType == 1){
            this.state.shopInfo.shopName = this.state.editShopName;
        } else if(this.state.editType == 3){
            this.state.shopInfo.provinces = this.refs.Address.state.provincesId;
            this.state.shopInfo.provincesName = this.refs.Address.state.provincesName;
            this.state.shopInfo.city = this.refs.Address.state.cityId;
            this.state.shopInfo.cityName = this.refs.Address.state.cityName;
            this.state.shopInfo.county = this.refs.Address.state.countyId;
            this.state.shopInfo.countyName = this.refs.Address.state.countyName;
            this.state.shopInfo.detailInfo = this.state.editShopAddressDetail;
        }else if(this.state.editType == 4){
            this.state.shopInfo.serviceDesc = this.state.editShopDesc;
        }

        this.resetEditType();
    }

    resetEditType(){
        this.setState({
            editType:-1
        });
    }

    onEditShopNameRecordClick(){
        this.setState({
            isShowEditShopNameRecord:true
        });
    }

    onHideEditShopNameRecordClick(){
        this.setState({
            isShowEditShopNameRecord:false
        });
    }

    onEnsureEditAddress(){
        var provincesName = this.refs.Address.state.provincesName;
        var cityName = this.refs.Address.state.cityName;
        var countyName = this.refs.Address.state.countyName;

        if(provincesName === null || cityName === null || countyName === null || this.state.editShopAddressDetail === null){
            this.resetEditType();
            return;
        }

        this.updateShopInfo();
    }

    onCloseEditAddress(){
        this.resetEditType();
    }

    onAddressDetailChange(e) {
        this.state.editShopAddressDetail = e.target.value;
    }

    render() {
        var state = this.state;
        var shopInfo = state.shopInfo;
        return (
            <div>
                {
                    state.isLoad ?
                        shopInfo.auditStatus === 3 ?
                            <div className="shopInfoCon">
                                <div className="shopInfoTop">
                                    <div className="con">
                                        <div className="shop clear">
                                            <div className="shopImageCon fl">
                                                {
                                                    shopInfo.image ?
                                                        <img src={shopInfo.image} alt="" id="shopImageId"/>
                                                        :
                                                        <img src={require("../../../public/img/ico-shop-default-cover.png")} alt="" id="shopImageId"/>
                                                }
                                                <div className="editShopImage">
                                                    修改
                                                </div>
                                                <input type="file" id="shopImageInputId" name="file" accept=".jpg,.jpeg,.png" onChange={this.readFile.bind(this, "shopImageInputId")}/>
                                            </div>
                                            <div className="fl">
                                                <div className="name clear">
                                                    {
                                                        this.state.editType == 1 ?
                                                            <input type="text" id="shopNameInputId" defaultValue={shopInfo.shopName} placeholder="请输入店铺名称(15字以内)" maxLength={15} className="commonSingleLine fl"
                                                                   onChange={this.onShopNameChange.bind(this)} onBlur={this.onShopNameInputBlur.bind(this)}/>
                                                            :
                                                            <span className="fl">{shopInfo.shopName}</span>
                                                    }
                                                    <i className={this.state.editType == 1 ? "edit fr" : "fr"} onClick={this.state.editType == 1 ? this.updateShopInfo.bind(this) : this.onEditShopInfoClick.bind(this, 1, "shopNameInputId")}/>
                                                </div>
                                                <div className="nameChangePrompt commonMT-5 commonText-12-gray">一个自然月内可主动修改2次店铺LOGO，一个自然年内可主动修改5次店铺名称</div>
                                            </div>
                                            <div className="changeNameRecord fr">
                                                查看<a href="javascript:;" onClick={this.onEditShopNameRecordClick.bind(this)}>改名记录</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="info fr">
                                    <div className="id">
                                        <div className="left fl">
                                            <div className="commonText-16 fl">店铺ID：</div>
                                            <div className="commonSingleLine commonText-16 fr">{shopInfo.id}</div>
                                        </div>
                                        <div className="right fr">
                                            <div className="commonText-16 fl">店铺主人：</div>
                                            <div className="commonSingleLine commonText-16 fr">{shopInfo.userName}</div>
                                        </div>
                                    </div>
                                    <div className="category commonMT-60">
                                        <div className="commonText-16 fl">店铺类别：</div>
                                        <a href="javascript:;" className="commonEdit fr" onClick={this.onEditShopInfoClick.bind(this, 2, "")}></a>
                                        <div className="categoryDetail commonSingleLine commonText-16 fr">
                                            {
                                                shopInfo.shopServiceIdNameList ?
                                                    shopInfo.shopServiceIdNameList.map(function(data){
                                                        return (<span key={data.serviceName}>{data.serviceName}</span>)
                                                    })
                                                    :
                                                    null
                                            }
                                        </div>
                                    </div>
                                    <div className="address commonMT-60">
                                        <div className="commonText-16 fl">所在地：</div>
                                        <a href="javascript:;" className="commonEdit fr" onClick={this.onEditShopInfoClick.bind(this, 3, "")}></a>
                                        <div className="addressDetail commonSingleLine commonText-16 fr">
                                            {shopInfo.provincesName}{shopInfo.cityName}{shopInfo.countyName}
                                            <span>{shopInfo.detailInfo}</span>
                                        </div>
                                    </div>
                                    <div className="desc commonMT-60 clear">
                                        <div className="commonText-16 fl">店铺服务描述：</div>
                                        <div className="descDetail commonText-16 fr">
                                            {
                                                this.state.editType == 4 ?
                                                    <textarea type="text" id="shopDescInputId" defaultValue={shopInfo.serviceDesc} placeholder="请输入服务描述，例如：提供的服务类型，合作过的品牌等。" maxLength={100} className="fl"
                                                              onChange={this.onShopDescChange.bind(this)}/>
                                                    :
                                                    <span className="fl">{shopInfo.serviceDesc}</span>
                                            }
                                            <i className={this.state.editType == 4 ? "edit fr" : "fr"} onClick={this.state.editType == 4 ? this.updateShopInfo.bind(this) : this.onEditShopInfoClick.bind(this, 4, "shopDescInputId")}/>
                                        </div>
                                    </div>
                                    <div className="prompt commonMT-10 commonText-12-gray fr">
                                        一个自然月内可主动修改2次服务描述
                                    </div>
                                </div>
                                {/*店铺名称修改记录弹窗*/}
                                {this.state.isShowEditShopNameRecord ?
                                    <EditShopNameRecord shopId={shopInfo.id} onCloseClick={this.onHideEditShopNameRecordClick.bind(this)}/> : null}
                                {/*选择服务类别弹窗*/}
                                {
                                    this.state.editType == 2 ?
                                        <div className="layerModal hide" id="categoryId">
                                            <div className="categoryCon">
                                                <div className="top">
                                                    <div className="title fl">一级分类</div>
                                                    <a href="javascript:;" className="fr" onClick={()=>this.onCloseChooseCategory()}></a>
                                                </div>
                                                <div className="subTitle">请选择</div>
                                                <ul className="categoryList">
                                                    {this.state.categories.map((item) => {
                                                        return  <li key={item.categoryId} className={this.isCategorySelected(item)?  "item-s" : ""} onClick={(category)=>this.onCategoryItemClick(item)}>
                                                            {item.categoryName}
                                                        </li>
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                                {/*修改地址弹框*/}
                                {
                                    this.state.editType == 3 ?
                                        <div className="layerModal" id="addressId">
                                            <div className="editShopAddressCon">
                                                <a href="javascript:;" className="close fr" onClick={this.onCloseEditAddress.bind(this)}></a>
                                                <div className="selectAddress">
                                                    <div className="title fl">中国大陆</div>
                                                    <Address ref="Address" switch={{province:true,city:true,county:true,unlimited:false}}/>
                                                </div>
                                                <div className="editShopAddressSubTitle">
                                                    详细地址
                                                </div>
                                                <input type="text" placeholder="请输入详细地址" className="commonSingleLine" id="addressDetailId" onChange={(e)=> this.onAddressDetailChange(e)}/>
                                                <div className="bottomBtn">
                                                    <a href="javascript:;" className="ensure theme-button-bg" onClick={() => this.onEnsureEditAddress()}>确定</a>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                            :
                            <div className="shopInfoCon">
                                <div className="authPrompt">我们正在审核您的资料，请等待消息通知，有服务才能正常营业呦！</div>
                            </div>
                        :
                        null
                }
            </div>
        );
    }
}
export default ShopBaseInfo;
