import _  from 'lodash';
import Reflux from 'reflux'
import SearchAction from './SearchAction.js'
import layer from '../../../../../public/js/layer'
import serviceApi from '../../../../../public/js/serviceApi'
import utils from '../../../../../public/js/utils'

function getItemByKey(list, itemKey) {
    return _.find(list, function (item) {
        return item.typeId === itemKey;
    });
}
class SearchStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = SearchAction;
        this.state = {
            data: {
                labelList: [],
                betweenPrice: ['不限', '5000以下', '5000-1万', '1万-2万', '2万-3万', '3万-5万', '5万-10万', '10万-30万', '30万-50万', '50万-70万', '70万-100万', '100万以上'],
                fans: ['不限', '20万以下', '20万-50万', '50万-100万', '100万-200万', '200万-500万', '500万-700万', '700万-1000万', '1000万-2000万', '2000万以上'],
                comments: ['不限', '100以下', '100-1000', '1000-5000', '5000-1万', '1万-10万', '10万-50万', '50万-100万', '100万以上'],
                spreads: ['不限', '100以下', '100-1000', '1000-5000', '5000-1万', '1万-10万', '10万-50万', '50万-100万', '100万以上'],
                zan: ['不限', '100以下', '100-1000', '1000-5000', '5000-1万', '1万-10万', '10万-50万', '50万-100万', '100万以上'],
                searchList: [], //搜索数据结果列表
                listTotal: 0,
                priceType: ['全部类型', '直发报价', '转发报价', '微任务直发报价', '微任务转发报价'],
                result: {
                    category: {id: 0, name: '0'},
                    price: {id: 0, name: '0'},
                    fans: {id: 0, name: '0'},
                    comment: {id: 0, name: '0'},
                    spread: {id: 0, name: '0'},
                    zan: {id: 0, name: '0'},
                    priceType: {id: 0, name: '0'},
                    key: '',
                    seller: false,
                    isAuth: false,
                    sort: 1
                },
                dropDisplayComment: false,
                dropDisplaySpread: false,
                dropDisplayZan: false,
                dropDisplayPriceType: false,
                dropDisplaySortType: false,
                currPage: 1,
                isLoading: true
            }
        }
    }

    onQuestSearch(start, end) {
        var self = this;
        ///console.log('quest wb search');
        if (this.state.data.isLoading) {
            this.state.data.isLoading = false;
            this.setState({data:this.state.data});
            var param = this.handleParam(start, end);
            param.platType = this.currentType();
            //console.log(param);
            serviceApi('aSearchWbComplex', param, (data)=> {
                if (data) {
                    this.state.data.listTotal = data.totalNum;
                    this.state.data.isLoading = true;
                    this.state.data.currPage = end / 20;
                    this.state.data.searchList = data.list;
                    this.setState({data:this.state.data});
                } else {
                    this.state.data.listTotal = 0;
                    this.state.data.isLoading = true;
                    this.state.data.currPage = end / 20;
                    this.state.data.searchList = [];
                    this.setState({data:this.state.data});
                }
            }, (data)=> {
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

    onRequestLabel(data) {
        var self = this;
        serviceApi('aTypeListV2', data, (data)=> {
            this.state.data.labelList.push({name: '不限', typeId: '0'});
            this.state.data.labelList = this.state.data.labelList.concat(data.mediaTypes);
            if (utils.urlParam('typeId')) {
                var labelItem = getItemByKey(this.state.data.labelList, parseInt(utils.urlParam('typeId')));
                if (labelItem) {
                    this.state.data.result.category = {id: labelItem.typeId, name: labelItem.name};
                }
            }
            this.setState({data:this.state.data});
        },  (data)=> {
            layer.msg(data.message);
            //console.log(data);
        });
    }

    onHandleToggle(dropType) {
        switch (dropType) {
            case 'zf':
                this.state.data.dropDisplayComment = false;
                this.state.data.dropDisplayZan = false;
                this.state.data.dropDisplayPriceType = false;
                this.state.data.dropDisplaySortType = false;
                this.state.data.dropDisplaySpread = !this.state.data.dropDisplaySpread;
                break;
            case 'pl':
                //this.state.data.dropDisplayComment = false;
                this.state.data.dropDisplayZan = false;
                this.state.data.dropDisplayPriceType = false;
                this.state.data.dropDisplaySortType = false;
                this.state.data.dropDisplaySpread = false;
                this.state.data.dropDisplayComment = !this.state.data.dropDisplayComment;
                break;
            case 'dz':
                this.state.data.dropDisplayComment = false;
                //this.state.data.dropDisplayZan = false;
                this.state.data.dropDisplayPriceType = false;
                this.state.data.dropDisplaySortType = false;
                this.state.data.dropDisplaySpread = false;
                this.state.data.dropDisplayZan = !this.state.data.dropDisplayZan;
                break;
            case 'jq':
                this.state.data.dropDisplayComment = false;
                this.state.data.dropDisplayZan = false;
                //this.state.data.dropDisplayPriceType= false;
                this.state.data.dropDisplaySortType = false;
                this.state.data.dropDisplaySpread = false;
                this.state.data.dropDisplayPriceType = !this.state.data.dropDisplayPriceType;
                break;
            case 'd9wb':
                this.state.data.dropDisplaySpread = false;
                this.state.data.dropDisplayComment = false;
                this.state.data.dropDisplayZan = false;
                this.state.data.dropDisplayPriceType = false;
                this.state.data.dropDisplaySortType = !this.state.data.dropDisplaySortType;
                break;
        }
        this.setState({data:this.state.data});
    }

    onHandleHideDropAll() {
        this.state.data.dropDisplaySpread = false;
        this.state.data.dropDisplayComment = false;
        this.state.data.dropDisplayZan = false;
        this.state.data.dropDisplayPriceType = false;
        this.state.data.dropDisplaySortType = false;
        this.setState({data:this.state.data});
    }

    onHandleCategory(id) {
        var foundItem = getItemByKey(this.state.data.labelList, id);
        if (!foundItem) {
            return;
        }
        this.state.data.result.category = {id: foundItem.typeId, name: foundItem.name};
        //加搜索
        this.handleSearchParameter();
    }

    onHandleCheck(isChecked, currObj) {
        var data = this.state.data;
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
            case 'zf':
                data.spread = {id: index, name: this.state.data.spreads[index]};
                break;
            case 'pl':
                data.comment = {id: index, name: this.state.data.comments[index]};
                break;
            case 'dz':
                data.zan = {id: index, name: this.state.data.zan[index]};
                break;
            case 'jq':
                data.priceType = {id: index, name: this.state.data.priceType[index]};
                if (data.sort >= 7) {
                    switch (index) {
                        case 0:
                            data.sort = 7;
                            break;
                        case 1:
                            data.sort = 7;
                            break;
                        case 2:
                            data.sort = 9;
                            break;
                        case 3:
                            data.sort = 11;
                            break;
                        case 4:
                            data.sort = 13;
                            break;
                    }
                }
                break;
            case 'd9wb':
                data.sort = index;
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
                data.category = {id: 0, name: '0'};
                break;
            case 3:
                data.price = {id: 0, name: '0'};
                break;
            case 4:
                data.fans = {id: 0, name: '0'};
                break;
            case 5:
                data.spread = {id: 0, name: '0'};
                break;
            case 6:
                data.comment = {id: 0, name: '0'};
                break;
            case 7:
                data.zan = {id: 0, name: '0'};
                break;
            case 8:
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

    handleParam(pageStart, pageEnd) {
        var data = this.state.data.result,
            price = this.calculatePrice(data.price.name),
            fans = this.calculatePrice(data.fans.name),
            spread = this.calculatePrice(data.spread.name),
            comment = this.calculatePrice(data.comment.name),
            zan = this.calculatePrice(data.zan.name),
            param = {
                key: data.key,
                classify: data.category.id,
                minPrice: price.minPrice,
                maxPrice: price.maxPrice,
                minFans: fans.minPrice,
                maxFans: fans.maxPrice,
                minForward: spread.minPrice,
                maxForward: spread.maxPrice,
                minComment: comment.minPrice,
                maxComment: comment.maxPrice,
                minLike: zan.minPrice,
                maxLike: zan.maxPrice,
                priceType: data.priceType.id,
                seller: data.seller ? 1 : 0,
                isAuth: data.isAuth ? 1 : 0,
                sort: (data.sort == 1 && data.key.length == 0) ? 6 : data.sort,
                start: pageStart,
                end: pageEnd
            };
        return param;
    }

    handleSearchParameter() {
        this.onQuestSearch(0, 20);
        /*this.state.data.listTotal = 80;
         this.state.data.currpage = 1;*/
        this.setState({data:this.state.data});
    }

    init() {
        if (utils.urlParam('keywords')) {
            this.state.data.result.key = decodeURIComponent(utils.urlParam('keywords'));
        }
        if (utils.urlParam('typeId')) {
            this.state.data.result.category.id = decodeURIComponent(utils.urlParam('typeId'));
        }
    }
}

export default SearchStore;