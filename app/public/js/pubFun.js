var utils = require("./utils");
module.exports =
    {
        "txtSubstr": function (txt, maxVal) {
            txt = utils.trim(txt);
            if (utils.getBytesCount(txt) > maxVal) {
                txt = txt.substr(0, utils.getBytes(txt, maxVal)) + '...';
            }
            return txt;
        },
        "toFixedNum": function (num) {
            var returnVal = '--';
            if (num == -1) {
                returnVal = '--'
            } else if (num >= 100000) {
                returnVal = Math.floor(num / 1000) / 10 + "万";
            } else {
                returnVal = num;
            }
            return returnVal;
        },
        "toFixedNumW": function (num) {
            var returnVal = '--';
            if (num == -1) {
                returnVal = '--'
            } else if (num >= 10000) {
                returnVal = Math.floor(num / 1000) / 10 + "W+";
            } else {
                returnVal = num;
            }
            return returnVal;
        },
        "toFixedNumInfo": function (num,str) {
            str = str || '万';
            var returnVal = '--';
            if (num != -1) {
                returnVal = num >= 10000 ? (num / 10000).toFixed(1) + '<i>'+str+'</i>' : num;
            }
            return returnVal;
        },
        "toFixedNumOne": function (num) {
            var returnVal = '--';
            if (num != -1) {
                returnVal = num >= 10000 ? (num / 10000).toFixed(1) + '万' : num;
            }
            return returnVal;
        },

        "toFixedNumPriceOne": function (num,start) {
            var returnVal = '<span class="no">暂无报价</span>';
            var startStr = '';
            if(start){
                startStr = '起';
            }
            if (num) {
                returnVal ='<i class="sub">¥</i>'+num.toFixed(2)+startStr;
            }
            return returnVal;
        },
        "scrollFixed": function (obj1, obj2, left, top) {
            var $window = $(window);

            var oDiv = document.getElementById(obj1);
            var _oDiv = document.getElementById(obj2);

            var divT = $(oDiv).offset().top;

            $window.on('scroll', function () {
                var scrollT = document.documentElement.scrollTop || document.body.scrollTop;

                if (scrollT >= divT) {
                    $(oDiv).css({
                        position: 'fixed',
                        left: left,
                        top: top
                    });
                    _oDiv.style.display = 'block';
                } else {
                    $(oDiv).css({
                        position: '',
                        left: 0,
                        top: 0,
                        display: 'block'
                    });
                    _oDiv.style.display = 'none';
                }
            });

            $window.resize(function () {
                $window.trigger('scroll');
            });
        }
    };