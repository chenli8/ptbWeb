import urlManager from './urlManager';
import utils from './utils';

var serviceApi = (apiName, data, successCb, errorCb) => {
    return utils.post(
        urlManager[apiName],
        data,
        function (data, status, xhr) {
            successCb(data.data,data.systemDate)
        },
        errorCb
    )
};

export default serviceApi