'use strict';
import $ from 'jquery'
/*加载提示*/
const loading = {
    open: () => {
        $('body').append('<div id="layerLoading" class="layer"><div class="layerMask"></div><i class="ico-loading"></i></div>')
    },
    close: () => {
        $('#layerLoading').remove()
    }
};
/*消息框*/
const msg = (str, cb) => {
    if (!str) {
        str = '出了点小问题，请稍后重试';
    }
    $('#layerMsg').remove();
    $('body').append('<i id="layerMsg" class="layerMsg">' + str + '</i>');
    var $msg = $('#layerMsg')
    $msg.css({'margin-left': 0 - $msg.width() / 2});
    setTimeout(function () {
        $msg.remove();
        if (cb) {
            cb();
        }
    }, 2000)
};
export default {
    "loading": loading,
    "msg": msg
};