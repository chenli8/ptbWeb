import Reflux from 'reflux'
import SearchAction from './SearchAction.js'
import layer from '../../../../../public/js/layer'
import serviceApi from '../../../../../public/js/serviceApi'
import utils from '../../../../../public/js/utils'

class SearchStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = SearchAction;
        this.state = {
            data: {
                betweenPrice: ['不限', '5000以下', '5000-1万', '1万-2万', '2万-3万', '3万-5万', '5万-10万', '10万-50万', '50万-100万', '100万以上'],
                fans: ['不限', '1万以下', '1万-5万', '5万-10万', '10万-30万', '30万-50万', '50万-100万', '100万以上'],
                online: ['不限', '5000以下', '5000-1万', '1万-2万', '2万-5万', '5万-10万', '10万-20万', '20万-50万', '50万-100万', '100万以上'],
                zone: ['不限', '北京', '上海', '广州', '成都', '深圳', '杭州', '台湾', '武汉', '西安', '香港'],
                sex: ['不限', '男', '女', '未知'],
                mediaType: [{type: 0, plat: '不限'}, {type: 3, plat: '映客'}, {type: 4, plat: '一直播'}, {
                    type: 6,
                    plat: '花椒'
                }],
                searchList: [], //搜索数据结果列表
                listTotal: 0,
                priceType: ['全部类型', '线下活动', '线上直播'],
                result: {
                    price: {id: 0, name: '0'},
                    fans: {id: 0, name: '0'},
                    online: {id: 0, name: '0'},
                    zone: {id: 0, name: '0'},
                    sex: {id: 0, name: '0'},
                    key: '',
                    priceType: {id: 0, name: '0'},
                    seller: false,
                    isAuth: false,
                    sort: 1,
                    mediaType: 0
                },
                dropDisplayPlat: false,
                dropDisplayZone: false,
                dropDisplaySex: false,
                dropDisplayPriceType: false,
                dropDisplaySortType: false,
                currPage: 1,
                isLoading: true
            }
        }
    }

    onQuestSearch(start, end) {
        var self = this;
        //console.log('quest zb search');
        if (this.state.data.isLoading) {
            this.state.data.isLoading = false;
            this.setState({data:this.state.data});
            var param = this.handleParam(start, end);
            param.platType = this.currentType();
            //console.log(param);
            serviceApi('aSearchZbComplex',param, (data) =>{
                this.state.data.listTotal = data.totalNum;
                this.state.data.searchList = data.list;
                this.state.data.currPage = end / 20;
                this.state.data.isLoading = true;
                this.setState({data:this.state.data});
            }, (data) =>{
                layer.msg(data.message);
                this.state.data.isLoading = true;
                this.setState({data:this.state.data});
                //console.log(data);
            });
        }
    }

    currentType() {
        switch (window.location.hash) {
            case "#/wx":
                return 1;
                break;
            case "#/wb":
                return 2;
                break;
            case "#/zb":
                return 3;
                break;
        }
    }

    onHandleToggle(dropType) {
        switch (dropType) {
            case 'zone':
                this.state.data.dropDisplaySex = false;
                this.state.data.dropDisplayPriceType = false;
                this.state.data.dropDisplaySortType = false;
                this.state.data.dropDisplayPlat = false;
                this.state.data.dropDisplayZone = !this.state.data.dropDisplayZone;
                break;
            case 'sex':
                this.state.data.dropDisplayZone = false;
                this.state.data.dropDisplayPriceType = false;
                this.state.data.dropDisplaySortType = false;
                this.state.data.dropDisplayPlat = false;
                this.state.data.dropDisplaySex = !this.state.data.dropDisplaySex;
                break;
            case 'zbPrice':
                this.state.data.dropDisplayZone = false;
                this.state.data.dropDisplaySex = false;
                this.state.data.dropDisplayPlat = false;
                this.state.data.dropDisplaySortType = false;
                this.state.data.dropDisplayPriceType = !this.state.data.dropDisplayPriceType;
                break;
            case 'd9zb':
                //排序
                this.state.data.dropDisplayZone = false;
                this.state.data.dropDisplaySex = false;
                this.state.data.dropDisplayPriceType = false;
                this.state.data.dropDisplayPlat = false;
                this.state.data.dropDisplaySortType = !this.state.data.dropDisplaySortType;
                break;
            case 'plat':
                this.state.data.dropDisplayZone = false;
                this.state.data.dropDisplaySex = false;
                this.state.data.dropDisplayPriceType = false;
                this.state.data.dropDisplaySortType = false;
                this.state.data.dropDisplayPlat = !this.state.data.dropDisplayPlat;
        }
        this.setState({data:this.state.data});
    }

    onHandleHideDropAll() {
        this.state.data.dropDisplaySex = false;
        this.state.data.dropDisplayZone = false;
        this.state.data.dropDisplayPriceType = false;
        this.state.data.dropDisplaySortType = false;
        this.state.data.dropDisplayPlat = false;
        this.setState({data:this.state.data});
    }

    onHandleCheck(isChecked, currObj) {
        var data = this.data;
        switch (currObj) {
            case 1:
                data.result.seller = isChecked;
                break;
            case 3:
                data.result.isAuth = isChecked;
                break;
        }
        //加搜索
        this.handleSearchParameter();
    }

    onHandleSort(sortIndex) {
        this.state.data.result.sort = sortIndex;
        //加搜索
        this.handleSearchParameter();
    }

    onHandleDrop(index, dropType) {
        var data = this.state.data.result;
        switch (dropType) {
            case 'zone':
                data.zone = {id: index, name: this.state.data.zone[index]};
                break;
            case 'sex':
                data.sex = {id: index, name: this.state.data.sex[index]};
                break;
            case 'zbPrice':
                //价格类型
                data.priceType = {id: index, name: this.state.data.priceType[index]};
                if (data.sort >= 5) {
                    switch (index) {
                        case 0:
                            data.sort = 5;
                            break;
                        case 1:
                            data.sort = 5;
                            break;
                        case 2:
                            data.sort = 7;
                            break;
                    }
                }
                break;
            case 'd9zb':
                data.sort = index;
                break;
            case 'plat':
                data.mediaType = index;
                break;
        }
        //加搜索
        this.handleSearchParameter();
    }

    onHandlePrice(priceIndex) {
        var data = this.state.data.result;
        data.price = {id: priceIndex, name: this.state.data.betweenPrice[priceIndex]};
        //加搜索
        this.handleSearchParameter();
    }

    onHandleOnline(onlineIndex) {
        var data = this.state.data.result;
        data.online = {id: onlineIndex, name: this.state.data.online[onlineIndex]};
        //加搜索
        this.handleSearchParameter();
    }

    onHandleFans(fanIndex) {
        var data = this.state.data.result;
        data.fans = {id: fanIndex, name: this.state.data.fans[fanIndex]};
        //加搜索
        this.handleSearchParameter();
    }

    onHandleAutoFans(fansIndex, name) {
        this.state.data.result.fans = {id: fansIndex, name: name};
        //加搜索
        this.handleSearchParameter();
    }

    onHandleAutoPrice(id, name) {
        this.state.data.result.price = {id: id, name: name};
        //加搜索
        this.handleSearchParameter();
    }

    onHandleAutoOnline(id, name) {
        this.state.data.result.online = {id: id, name: name};
        //加搜索
        this.handleSearchParameter();
    }

    onHandleSearch(keywords) {
        this.state.data.result.key = keywords;
        //加搜索
        this.handleSearchParameter();
    }

    onHandleDel(delKey) {
        var data = this.state.data.result;
        switch (delKey) {
            case 1:
                data.key = '';
                break;
            case 2:
                data.price = {id: 0, name: '0'};
                break;
            case 3:
                data.fans = {id: 0, name: '0'};
                break;
            case 4:
                data.online = {id: 0, name: '0'};
                break;
            case 5:
                data.zone = {id: 0, name: '0'};
                break;
            case 6:
                data.sex = {id: 0, name: '0'};
                break;
            case 7:
                data.priceType = {id: 0, name: '0'};
                break;
        }
        //加搜索
        this.handleSearchParameter();
    }

    tenThousandUnit(data) {
        return data.substr(0, data.indexOf('万')) * 10000;
    }

    calculatePrice(price) {
        var data = price, minPrice = 0, maxPrice = 0;
        if (data == 0 || data == '不限') {
            return {minPrice: 0, maxPrice: 0};
        } else if (data.indexOf('以上') != -1) {
            minPrice = data.indexOf('万') != -1 ? this.tenThousandUnit(data) : data.substr(0, data.indexOf('以')) * 1;
            return {minPrice: minPrice, maxPrice: 0};
        } else if (data.indexOf('以下') != -1) {
            maxPrice = data.indexOf('万') != -1 ? this.tenThousandUnit(data) : data.substr(0, data.indexOf('以')) * 1;
            return {minPrice: 0, maxPrice: maxPrice};
        } else if (data.indexOf('-') != -1) {
            var tempData = data.split('-');
            minPrice = tempData[0].indexOf('万') != -1 ? this.tenThousandUnit(tempData[0]) : tempData[0] * 1;
            maxPrice = tempData[1].indexOf('万') != -1 ? this.tenThousandUnit(tempData[1]) : tempData[1] * 1;
            return {minPrice: minPrice, maxPrice: maxPrice};
        }
    }

    /*handleSortVal:function (sort) {
     switch (sort){
     case 1:
     return 4;
     case 2:
     return 2;
     case 3:
     return 3;
     case 4:
     return 5;
     }
     },*/
    handleParam(pageStart, pageEnd) {
        var data = this.state.data.result,
            price = this.calculatePrice(data.price.name),
            fans = this.calculatePrice(data.fans.name),
            online = this.calculatePrice(data.online.name),
            param = {
                key: data.key,
                minPrice: price.minPrice,
                maxPrice: price.maxPrice,
                minFans: fans.minPrice,
                maxFans: fans.maxPrice,
                minOnline: online.minPrice,
                maxOnline: online.maxPrice,
                location: data.zone.name == '不限' || data.zone.name == 0 ? '' : data.zone.name,
                gender: data.sex.name == '不限' ? 0 : data.sex.id,
                seller: data.seller ? 1 : 0,
                isAuth: data.isAuth ? 1 : 0,
                sort: (data.sort == 1 && data.key.length == 0) ? 4 : data.sort,
                start: pageStart,
                end: pageEnd,
                liveMediaType: data.mediaType
            };
        return param;
    }

    handleSearchParameter() {
        this.onQuestSearch(0, 20);
        /* this.state.data.listTotal = 80;
         this.state.data.currpage = 1;*/
        this.setState({data:this.state.data});
    }

    init() {
        if (utils.urlParam('keywords')) {
            this.state.data.result.key = decodeURIComponent(utils.urlParam('keywords'));
        }
    }
}

export default SearchStore;