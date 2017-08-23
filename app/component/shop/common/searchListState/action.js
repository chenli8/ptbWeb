/**
 * Created by Kirk liu on 2017/7/28.
 */
import serviceApi from '../../../../public/js/serviceApi';
import layer from '../../../../public/js/layer';
/*服务*/
export const actionServiceAjaxListData = () => (dispatch, getState) => {
    layer.loading.open();
    serviceApi('aServiceList', Object.assign(getState().servicePostData, getState().commonPostData), (data) => {
        dispatch({type: 'SERVICE_AJAX_LIST_DATA', data: data});
        layer.loading.close();
    }, (data) => {
        layer.loading.close();
        layer.msg(data.message);
    });
};

export const actionServiceAjaxSearchData = () => (dispatch, getState) => {
    layer.loading.open();
    let data = Object.assign(getState().servicePostData, getState().commonPostData);
    data.key = getState().key;
    serviceApi('aServiceSearch', data, (data) => {
        dispatch({type: 'SERVICE_AJAX_SEARCH_DATA', data: data});
        layer.loading.close();
    }, (data) => {
        layer.loading.close();
        layer.msg(data.message);
    });
};

/*店铺*/
export const actionSupplierAjaxListData = () => (dispatch, getState) => {
    layer.loading.open();
    serviceApi('aSupplierList', Object.assign(getState().supplierPostData, getState().commonPostData), (data) => {
        dispatch({type: 'SUPPLIER_AJAX_LIST_DATA', data: data});
        layer.loading.close();
    }, (data) => {
        layer.loading.close();
        layer.msg(data.message);
    });
};
export const actionSupplierAjaxSearchData = () => (dispatch, getState) => {
    layer.loading.open();
    let data = Object.assign(getState().supplierPostData, getState().commonPostData);
    data.key = getState().key;
    serviceApi('aSupplierSearch', data, (data) => {
        dispatch({type: 'SUPPLIER_AJAX_SEARCH_DATA', data: data});
        layer.loading.close();
    }, (data) => {
        layer.loading.close();
        layer.msg(data.message);
    });
};
/*需求*/
export const actionDemandAjaxListData = () => (dispatch, getState) => {
    layer.loading.open();
    serviceApi('aDemandList', Object.assign(getState().demandPostData, getState().commonPostData), (data) => {
        dispatch({type: 'DEMAND_AJAX_LIST_DATA', data: data});
        layer.loading.close();
    }, (data) => {
        layer.loading.close();
        layer.msg(data.message);
    });
};
export const actionDemandAjaxSearchData = () => (dispatch, getState) => {
    layer.loading.open();
    let data = Object.assign(getState().demandPostData, getState().commonPostData);
    data.key = getState().key;
    serviceApi('aDemandSearch', data, (data) => {
        dispatch({type: 'DEMAND_AJAX_SEARCH_DATA', data: data});
        layer.loading.close();
    }, (data) => {
        layer.loading.close();
        layer.msg(data.message);
    });
};


