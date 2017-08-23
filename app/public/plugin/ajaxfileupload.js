import $ from 'jquery'
(function( ajaxFileUpload ) {
    $.extend({
        createUploadIframe: function (id, uri) {
            //创建 frame
            var frameId = 'jUploadFrame' + id;
            var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
            if (window.ActiveXObject) {
                if (typeof uri == 'boolean') {
                    iframeHtml += ' src="' + 'javascript:false' + '"';
                }
                else if (typeof uri == 'string') {
                    iframeHtml += ' src="' + uri + '"';
                }
            }
            iframeHtml += ' />';
            $(iframeHtml).appendTo(document.body);
            return $('#' + frameId).get(0);
        },
        createUploadForm: function (id, fileElementId, data) {
            //创建 frame
            var formId = 'jUploadForm' + id;
            var fileId = 'jUploadFile' + id;
            var form = $('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');
            if (data) {
                for (var i in data) {
                    $('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
                }
            }
            var oldElement = $('#' + fileElementId);
            var newElement = $(oldElement).clone();
            $(oldElement).attr('id', fileId);
            $(oldElement).before(newElement);
            $(oldElement).appendTo(form);

            //设置属性
            $(form).css('position', 'absolute');
            $(form).css('top', '-1200px');
            $(form).css('left', '-1200px');
            $(form).appendTo('body');
            return form;
        },

        ajaxFileUpload: function (s) {
            s = $.extend({}, $.ajaxSettings, s);
            var id = new Date().getTime()
            var form = $.createUploadForm(id, s.fileElementId, (typeof (s.data) == 'undefined' ? false : s.data));
            var io = $.createUploadIframe(id, s.secureuri);
            var frameId = 'jUploadFrame' + id;
            var formId = 'jUploadForm' + id;
            // 监控请求
            if (s.global && !$.active++) {
                $.event.trigger("ajaxStart");
            }
            var requestDone = false;
            // 创建请求对象
            var xml = {}
            if (s.global)
                $.event.trigger("ajaxSend", [xml, s]);
            //等待一个响应返回
            var uploadCallback = function (isTimeout) {
                var io = document.getElementById(frameId);
                try {
                    if (io.contentWindow) {
                        xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
                        xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document;

                    } else if (io.contentDocument) {
                        xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
                        xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document;
                    }
                } catch (e) {
                    $.handleError(s, xml, null, e);
                }
                if (xml || isTimeout == "timeout") {
                    requestDone = true;
                    var status;
                    try {
                        status = isTimeout != "timeout" ? "success" : "error";
                        //请求成功
                        if (status != "error") {
                            // 处理数据
                            var data = $.uploadHttpData(xml, s.dataType);
                            if (s.success)
                                s.success(data, status);
                            // 触发全局返回
                            if (s.global)
                                $.event.trigger("ajaxSuccess", [xml, s]);
                        } else
                            $.handleError(s, xml, status);
                    } catch (e) {
                        status = "error";
                        $.handleError(s, xml, status, e);
                    }

                    // 请求完成
                    if (s.global)
                        $.event.trigger("ajaxComplete", [xml, s]);

                    // 处理全局AJAX计数器
                    if (s.global && !--$.active)
                        $.event.trigger("ajaxStop");

                    // 处理结果
                    if (s.complete)
                        s.complete(xml, status);

                    $(io).unbind()

                    setTimeout(function () {
                        try {
                            $(io).remove();
                            $(form).remove();

                        } catch (e) {
                            $.handleError(s, xml, null, e);
                        }

                    }, 100)

                    xml = null

                }
            }
            // 超时检查
            if (s.timeout > 0) {
                setTimeout(function () {
                    if (!requestDone) uploadCallback("timeout");
                }, s.timeout);
            }
            try {

                var form = $('#' + formId);
                $(form).attr('action', s.url);
                $(form).attr('method', 'POST');
                $(form).attr('target', frameId);
                if (form.encoding) {
                    $(form).attr('encoding', 'multipart/form-data');
                }
                else {
                    $(form).attr('enctype', 'multipart/form-data');
                }
                $(form).submit();

            } catch (e) {
                $.handleError(s, xml, null, e);
            }

            $('#' + frameId).load(uploadCallback);
            return {
                abort: function () {
                }
            };

        },

        uploadHttpData: function (r, type) {
            var data = !type;
            data = type == "xml" || data ? r.responseXML : r.responseText;
            if (type == "script")
                $.globalEval(data);
            if (type == "json")
                eval("data = " + data);
            if (type == "html")
                $("<div>").html(data).evalScripts();
            return data;
        },
        handleError: function( s, xml, status, e ) {
            // If a local callback was specified, fire it
            if ( s.error )
                s.error( xml, status, e );

            // Fire the global callback
            if ( s.global )
                $.event.trigger( "ajaxError", [xml, s, e] );
        }
    })
})($);
module.exports = $ ;