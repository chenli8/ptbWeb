/**
 * Created by Kirk liu on 2017/7/20.
 */
import "core-js/fn/object/assign";
function reducer(state = {
    /*请求数据*/
    /*公共部分*/
    key: '',
    commonPostData: {
        categoryId: '',//分类ID
        categoryLevel: '',//分类级别 1-一级，2-二级，3-三级
    },
    /*服务*/
    servicePostData: {
        regionId: '',//所在地
        regionType: '', //所在地级别 1-省，2-市，3-区县
        start: 0,//分页用 开始
        end: 12,//分页用 结束
        sortType: 0,//排序类型 为空时默认排序，1-成交量，2-好评率
        orderType: 1,//升降序 0-升序 1-降序，传sortType时此字段必传
        minPrice: '',//最小价格
        maxPrice: '',//最大价格
    },
    /*店铺*/
    supplierPostData: {
        provinces: '',//省
        city: '', //市
        start: 0,//分页用 开始
        end: 12,//分页用 结束
        sortType: 0,//排序类型 为空时默认排序，1-成交量，2-好评率
        orderType: 1,//升降序 0-升序 1-降序，传sortType时此字段必传
    },
    /*需求*/
    demandPostData: {
        status: 2,//需求状态 2：进行中 3：已结束
        start: 0,//分页用 开始
        end: 12,//分页用 结束
        regionId: '',//地区ID
        regionLevel: '',//地区等级  1:一级 2：二级  3：三级
        minPrice: '',//最小报价
        maxPrice: '',//最大报价
        sortType: 0,//排序类型 为空时默认排序，1-成交量，2-好评率
        orderType: 1,//升降序 0-升序 1-降序，传sortType时此字段必传
    },
    /*接收数据*/
    serviceGetData: '',//服务数据
    supplierGetData: '',//店铺数据
    demandGetData: '',//需求数据
    /*本地数据*/
    pageSize: 12,
    modelType: '',//1 服务 2 店铺 3 需求
    categoryData:''//分类数据
}, action) {
    switch (action.type) {
        /*业务模型判断*/
        case 'MODEL_TYPE':
            return Object.assign({}, state, {modelType: action.modelType});
        /*服务列表*/
        case 'SERVICE_AJAX_LIST_DATA':
            return Object.assign({}, state, {serviceGetData: action.data});
        /*店铺列表*/
        case 'SUPPLIER_AJAX_LIST_DATA':
            return Object.assign({}, state, {supplierGetData: action.data});
        /*需求列表*/
        case 'DEMAND_AJAX_LIST_DATA':
            return Object.assign({}, state, {demandGetData: action.data});
        /*服务筛选*/
        case 'SERVICE_SORT':
            return Object.assign({}, state, {
                servicePostData: Object.assign(state.servicePostData, {
                    sortType: action.sortType,
                    orderType: action.orderType
                })
            });
        /*店铺筛选*/
        case 'SUPPLIER_SORT':
            return Object.assign({}, state, {
                supplierPostData: Object.assign(state.supplierPostData, {
                    sortType: action.sortType,
                    orderType: action.orderType
                })
            });
        /*需求筛选*/
        case 'DEMAND_SORT':
            return Object.assign({}, state, {
                demandPostData: Object.assign(state.demandPostData, {
                    sortType: action.sortType,
                    orderType: action.orderType
                })
            });
        /*服务分类*/
        case 'CATEGORY':
            return Object.assign({}, state, {
                commonPostData: Object.assign(state.commonPostData, {
                    categoryLevel: action.categoryLevel,
                    categoryId: action.categoryId
                })
            });
        /*服务分页*/
        case 'SERVICE_PAGE':
            return Object.assign({}, state, {
                servicePostData: Object.assign(state.servicePostData, {
                    start: action.start,
                    end: action.start + state.pageSize
                })
            });
        /*店铺分页*/
        case 'SUPPLIER_PAGE':
            return Object.assign({}, state, {
                supplierPostData: Object.assign(state.supplierPostData, {
                    start: action.start,
                    end: action.start + state.pageSize
                })
            });
        /*需求分页*/
        case 'DEMAND_PAGE':
            return Object.assign({}, state, {
                demandPostData: Object.assign(state.demandPostData, {
                    start: action.start,
                    end: action.start + state.pageSize
                })
            });
        /*服务搜索*/
        case 'SERVICE_AJAX_SEARCH_DATA':
            return Object.assign({}, state, {serviceGetData: action.data});
        /*店铺搜索*/
        case 'SUPPLIER_AJAX_SEARCH_DATA':
            return Object.assign({}, state, {supplierGetData: action.data});
        /*需求搜索*/
        case 'DEMAND_AJAX_SEARCH_DATA':
            return Object.assign({}, state, {demandGetData: action.data});
        /*需求状态*/
        case 'DEMAND_AJAX_STATUS_DATA':
            return Object.assign({}, state, {
                demandPostData: Object.assign(state.demandPostData, {
                    status: action.status
                })
            });
        case 'KEYWORDS':
            return Object.assign({}, state, {key: action.keywords});
        /*服务所在地*/
        case 'SERVICE_REGION':
            return Object.assign({}, state, {
                servicePostData: Object.assign(state.servicePostData, {
                    regionId: action.regionId,
                    regionType: action.regionType
                })
            });
        /*店铺所在地*/
        case 'SUPPLIER_REGION':
            return Object.assign({}, state, {
                supplierPostData: Object.assign(state.supplierPostData, {
                    provinces: action.provinces,
                    city: action.city
                })
            });
        /*需求所在地*/
        case 'DEMAND_REGION':
            return Object.assign({}, state, {
                demandPostData: Object.assign(state.demandPostData, {
                    regionId: action.regionId,
                    regionLevel: action.regionLevel
                })
            });
        /*服务价格*/
        case 'SERVICE_PRICE':
            return Object.assign({}, state, {
                servicePostData: Object.assign(state.servicePostData, {
                    minPrice: action.minPrice,
                    maxPrice: action.maxPrice
                })
            });
        /*需求价格*/
        case 'DEMAND_PRICE':
            return Object.assign({}, state, {
                demandPostData: Object.assign(state.demandPostData, {
                    minPrice: action.minPrice,
                    maxPrice: action.maxPrice
                })
            });
        default:
            return state;
    }
}

export default reducer;
