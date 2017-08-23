import React from 'react';
import serviceApi from '../../../../public/js/serviceApi';
import urlManager from '../../../../public/js/urlManager';
import Address from "../../../shop/common/Address";
import layer from "../../../../public/js/layer";
import cookie from "react-cookie";

/**
 * 编辑服务类别弹框
 */
class EditServiceCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: this.props.categories,
            selectedCategories: this.props.selectedCategories,
            editCategory: this.props.editCategory,
            tempEditCategory: this.props.editCategory,
        }
    }

    close() {
        this.props.changeLayerIndex(-1);
    }

    /**
     * 是否是其他已选的一级分类
     */
    isOtherSelected(category) {
        if (category === null) {
            return false;
        }
        for (let i = 0; i < this.state.selectedCategories.length; i++) {
            let item = this.state.selectedCategories[i];
            if (item.categoryId == category.categoryId) {
                if (this.state.editCategory == null) {
                    return true;
                }
                if (this.state.editCategory && category.categoryId != this.state.editCategory.categoryId) {
                    return true;
                }
                return false;
            }
        }
        return false;
    }

    /**
     * 是否是当前选中的一级分类
     */
    isCurrentTempEdit(category) {
        if (category === null) {
            return false;
        }
        if (this.state.tempEditCategory && this.state.tempEditCategory.categoryId == category.categoryId) {
            return true;
        }
        return false;
    }

    onFirstCategoryItemClick(category) {
        if (category === null) {
            return;
        }
        // 其他已选的不可编辑
        if (this.isOtherSelected(category)) {
            return;
        }
        // 当前已选的不做处理
        if (this.isCurrentTempEdit(category)) {
            return;
        }
        this.setState({
            tempEditCategory: category
        })
    }

    onEditEnsure() {
        this.props.onEditCategoryEnsure(this.state.tempEditCategory);
    }

    render() {
        var state = this.state;
        return (
            <div className="layerModal" id="editCategoryId">
                <div className="editCategoryCon">
                    <div className="top">
                        <div className="title fl">请选择店铺服务类型</div>
                        <a href="javascript:;" className="fr" onClick={() => this.close()}/>
                    </div>
                    <div className="categoryContent">
                        <div className="firstCategoryCon fl">
                            <div className="firstCategoryTitle">请选择一级分类</div>
                            <ul className="firstCategoryList">
                                {
                                    state.categories.map((item) => {
                                        return <li key={item.categoryId}>
                                            <a href="javascript:;"
                                               className={this.isCurrentTempEdit(item) ? "select commonSingleLine" : this.isOtherSelected(item) ? "dis commonSingleLine" : "commonSingleLine"}
                                               onClick={this.onFirstCategoryItemClick.bind(this, item)}>
                                                {item.categoryName}
                                            </a>
                                            {
                                                this.isOtherSelected(item) ?
                                                    <span>已选</span>
                                                    :
                                                    null
                                            }
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                        <div className="secondCategoryCon fr">
                            <div className="secondCategoryTitle">二级分类展示</div>
                            <ul className="secondCategoryList">
                                {
                                    state.tempEditCategory ?
                                        state.tempEditCategory.children.map((item) => {
                                            return <li className="commonSingleLine"
                                                       key={item.categoryId}>{item.categoryName}</li>
                                        })
                                        :
                                        null
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="editCategoryBottom">
                        <a href="javascript:;" className="fr theme-button-bg" onClick={this.onEditEnsure.bind(this)}>确认提交</a>
                        <a href="javascript:;" className="fr" onClick={this.close.bind(this)}>取消</a>
                    </div>
                </div>
            </div>
        )
    }
}

class CreateShopStep1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            shopId: "",
            shopName: "",
            serviceTypeList: [],
            provincesName: "",
            provinces: "",
            cityName: "",
            city: "",
            countyName: "",
            county: "",
            detailInfo: "",
            serviceDesc: "",
            categories: [],
            selectedCategories: [],
            editCategory: null,
            layerIndex: -1,
            step: 0,
            numTotal: 0
        }
    }

    componentDidMount() {
        this.getShopInfo();
    }

    getShopInfo() {
        layer.loading.open();
        this.postApi = serviceApi('aGetshopinfo', {
            userid: cookie.load('uid')
        }, (data) => {
            layer.loading.close();
            this.getServiceCategory(data);
            if (data == null) {
                this.setState({
                    isLoad: true
                })
            }
        }, (data) => {
            layer.loading.close();
            layer.msg("获取数据失败，请重试")
        });
    }

    getServiceCategory(shopInfo) {
        serviceApi('aCategoryList', {}, (data) => {
            this.initShopInfo(shopInfo, data.categoryList);
        }, (data) => {
            this.setState({
                isLoad: true
            })
        })
    }

    initShopInfo(shopInfo, categoryList) {
        if (shopInfo == null) {
            this.setState({
                isLoad: true,
                categories: categoryList,
                selectedCategories: [],
            })
            return;
        }


        var tempSelectCategoryList = [];
        if (shopInfo.shopServiceIdNameList && categoryList) {
            for (let i = 0; i < shopInfo.shopServiceIdNameList.length; i++) {
                for (let j = 0; j < categoryList.length; j++) {
                    if (shopInfo.shopServiceIdNameList[i].serviceTypeId == categoryList[j].categoryId) {
                        tempSelectCategoryList.push(categoryList[j]);
                    }
                }
            }
        }

        this.setState({
            isLoad: true,
            shopId: shopInfo.id,
            shopName: shopInfo.shopName,
            provincesName: shopInfo.provincesName,
            provinces: shopInfo.provinces,
            cityName: shopInfo.cityName,
            city: shopInfo.city,
            countyName: shopInfo.countyName,
            county: shopInfo.county,
            detailInfo: shopInfo.detailInfo,
            serviceDesc: shopInfo.serviceDesc,
            categories: categoryList,
            selectedCategories: tempSelectCategoryList,
        })
    }

    onCategoryItemDelete(category) {
        if (category === null) {
            return;
        }
        let tempArr = [];
        for (let i = 0; i < this.state.selectedCategories.length; i++) {
            let item = this.state.selectedCategories[i];
            if (item.categoryId !== category.categoryId) {
                tempArr.push(item);
            }
        }
        this.setState({
            selectedCategories: tempArr
        })
    }

    onShowEditCategory(category) {
        if (this.state.layerIndex == 1) {
            return;
        }
        if (this.state.categories.length > 0) {
            this.setState({
                layerIndex: 1,
                editCategory: category
            })
        } else {
            serviceApi('aCategoryList', {}, (data) => {
                this.setState({
                    layerIndex: 1,
                    categories: data.categoryList
                })
            }, (data) => {
                layer.msg(data.message)
            })
        }
    }

    onEditCategoryEnsure(tempEditCategory) {
        if (tempEditCategory == null) {
            this.changeLayerIndex(-1);
            return;
        }
        if (this.state.editCategory && this.state.editCategory.categoryId == tempEditCategory.categoryId) {
            this.changeLayerIndex(-1);
            return;
        }

        let tempArr = [];
        if (this.state.editCategory == null) {
            tempArr = tempArr.concat(this.state.selectedCategories);
        } else {
            for (let i = 0; i < this.state.selectedCategories.length; i++) {
                let item = this.state.selectedCategories[i];
                if (item.categoryId !== this.state.editCategory.categoryId) {
                    tempArr.push(item);
                }
            }
        }
        tempArr.push(tempEditCategory);

        this.setState({
            layerIndex: -1,
            editCategory: tempEditCategory,
            selectedCategories: tempArr
        })
    }

    changeLayerIndex(index) {
        if (this.state.layerIndex == index) {
            return;
        }
        this.setState({
            layerIndex: index
        })
    }

    onNext() {
        let state = this.state;
        let provincesName = this.refs.Address.state.provincesName;
        let provinces = this.refs.Address.state.provincesId;
        let cityName = this.refs.Address.state.cityName;
        let city = this.refs.Address.state.cityId;
        let countyName = this.refs.Address.state.countyName;
        let county = this.refs.Address.state.countyId;

        if (state.shopName === '') {
            layer.msg('请填写店铺名称');
            return
        }

        if (state.selectedCategories.length === 0) {
            layer.msg('请选择服务类别');
            return
        }

        if (provinces === '') {
            layer.msg('请选择省');
            return
        }

        if (city === '') {
            layer.msg('请选择市');
            return
        }

        if (county === '') {
            layer.msg('请选择区');
            return
        }

        if (state.detailInfo === '') {
            layer.msg('请填写详细地址');
            return
        }

        if (state.serviceDesc === '') {
            layer.msg('请填写店铺描述');
            return
        }
        let serviceTypeList = [];
        for (let i = 0; i < this.state.selectedCategories.length; i++) {
            let item = this.state.selectedCategories[i];
            serviceTypeList.push(item.categoryId);
        }

        this.setState({
            provincesName: provincesName,
            provinces: provinces,
            cityName: cityName,
            city: city,
            countyName: countyName,
            county: county,
            serviceTypeList: serviceTypeList,
            step: 1,
        });
    }

    onSubmit() {
        let state = this.state;
        let data = {
            shopName: state.shopName,
            provinces: state.provinces,
            city: state.city,
            county: state.county,
            detailInfo: state.detailInfo,
            serviceDesc: state.serviceDesc,
            serviceTypeList: state.serviceTypeList
        };
        if (state.shopId) {
            data.shopId = state.shopId;
            this.updateShop(data);
        } else {
            this.createShop(data);
        }
    }

    createShop(data) {
        layer.loading.open();
        serviceApi('aShopCreate', data, (data) => {
            layer.loading.close();
            window.location.href = urlManager.pCreateShop + '?date=' + new Date().getTime() + '#/Shop/Success'
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        })
    }

    updateShop(data) {
        layer.loading.open();
        serviceApi('aUpdateShopInfo', data, (data) => {
            layer.loading.close();
            window.location.href = urlManager.pCreateShop + '?date=' + new Date().getTime() + '#/Shop/Success'
        }, (data) => {
            layer.loading.close();
            layer.msg(data.message)
        })
    }

    onBack() {
        this.setState({
            step: 0,
        });
    }

    render() {
        let state = this.state;
        return (
            <div style={{"height": 960}}>
                {
                    state.isLoad ?
                        <div>
                            <div className="shopInfo" style={{display: state.step == 0 ? 'block' : 'none'}}>
                                <div className="shopName">
                                    <div className="commonSubTitle">
                                        店铺名称
                                        <span className="commonInputPrompt">(必填)</span>
                                    </div>
                                    <input type="text" placeholder="请输入店铺名称(15字以内)"
                                           className="commonInput commonSingleLine"
                                           maxLength={15} defaultValue={state.shopName} onInput={(e) => {
                                        this.setState({shopName: e.target.value})
                                    }}/>
                                </div>
                                <div className="serviceCategory clear">
                                    <div className="commonSubTitle">
                                        服务类别<span className="commonInputPrompt">(必填)</span>：每个店铺最多只能选择<span
                                        className="commonInputPrompt">3</span>个一级分类，已选<span
                                        className="commonInputPrompt">{this.state.selectedCategories.length}</span>个
                                    </div>
                                    <div className="chooseCategory">
                                        <ul className="fl">
                                            {this.state.selectedCategories.map((item) => {
                                                return <li key={item.categoryId}>
                                                    <div className="categoryItem">
                                                        <div
                                                            className="categoryName commonSingleLine">{item.categoryName}</div>
                                                        <div className="bottom">
                                                            <a href="javascript:;"
                                                               onClick={(category) => this.onShowEditCategory(item)}>编辑</a>
                                                            <a href="javascript:;"
                                                               onClick={(category) => this.onCategoryItemDelete(item)}>删除</a>
                                                        </div>
                                                    </div>
                                                </li>
                                            })}
                                        </ul>
                                        <div className="addCategory fl" onClick={() => this.onShowEditCategory()}>
                                            <div className="add">
                                                <i/>
                                                <p className="commonSubTitle">添加类别</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="address clear">
                                    <div className="commonSubTitle">
                                        所在地<span className="commonInputPrompt">(必填)</span>
                                    </div>
                                    <div className="selectAddress">
                                        <div className="title fl">中国大陆</div>
                                        <Address ref="Address" provincesId={state.provinces} cityId={state.city}
                                                 countyId={state.county}
                                                 switch={{province: true, city: true, county: true, unlimited:false}}/>
                                    </div>
                                </div>
                                <div className="addressDetail">
                                    <div className="commonSubTitle">
                                        详细地址<span className="commonInputPrompt">(必填)</span>
                                    </div>
                                    <input type="text" placeholder="请输入详细地址" className="commonInput commonSingleLine"
                                           defaultValue={state.detailInfo} onInput={(e) => {
                                        this.setState({detailInfo: e.target.value})
                                    }}/>
                                </div>
                                <div className="desc">
                                    <div className="commonSubTitle">
                                        店铺描述<span className="commonInputPrompt">(必填)</span>
                                    </div>
                                    <textarea placeholder="准确描述公司的经营范围和服务能力，可以获得更多关注！（100字以内）" className="descInput"
                                              maxLength={100}
                                              defaultValue={state.serviceDesc}
                                              onInput={(e) => {
                                                  let val = e.target.value;
                                                  this.setState({serviceDesc: e.target.value, numTotal: val.length});
                                              }}
                                    />
                                    <span className="numTotal">{state.numTotal}/100</span>
                                </div>
                                <a href="javascript:;" className="next theme-button-bg" onClick={() => this.onNext()}>下一步</a>
                                {
                                    state.layerIndex == 1 ?
                                        <EditServiceCategory editCategory={state.editCategory}
                                                             categories={state.categories}
                                                             selectedCategories={state.selectedCategories}
                                                             onEditCategoryEnsure={this.onEditCategoryEnsure.bind(this)}
                                                             changeLayerIndex={this.changeLayerIndex.bind(this)}/>
                                        :
                                        null
                                }
                            </div>
                            <div className="shopBaseInfo" style={{display: state.step == 1 ? 'block' : 'none'}}>
                                <div className="baseInfoTitle commonTitle">
                                    店铺基本信息
                                </div>
                                <div className="name">
                                    <div className="title fl">店铺名称：</div>
                                    <div className="content commonSingleLine fr">{state.shopName}</div>
                                </div>
                                <div className="category">
                                    <div className="title fl">服务类别：</div>
                                    <div className="content commonSingleLine fr">
                                        {
                                            state.selectedCategories.length > 0 ?
                                                state.selectedCategories.map((data, index) => {
                                                    return <span
                                                        key={data.categoryId}>{data.categoryName}{index + 1 != state.selectedCategories.length ? '/' : null}</span>
                                                })
                                                : null
                                        }
                                    </div>
                                </div>
                                <div className="address">
                                    <div className="title fl">所在地：</div>
                                    <div className="content fr">
                                        <div className="city commonSingleLine">
                                            {state.provincesName + "  " + state.cityName + "  " + state.countyName}
                                        </div>
                                        <div className="detailAddress commonSingleLine">{state.detailInfo}</div>
                                    </div>
                                </div>
                                <div className="desc">
                                    <div className="title">店铺服务描述：</div>
                                    <div className="content">{state.serviceDesc}</div>
                                </div>
                                <div className="bottom">
                                    <a href="javascript:;" className="back" onClick={() => this.onBack()}>返回修改</a>
                                    <a href="javascript:;" className="submit theme-button-bg"
                                       onClick={() => this.onSubmit()}>确认提交</a>
                                </div>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}

export default CreateShopStep1;