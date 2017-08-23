/**
 * Created by Kirk liu on 2017/8/3.
 */
import React from 'react';
import utils from '../../public/js/utils';

/*
 <PriceFormat data={{
     type:prepayType, // 价格类型  1 可议价  , 2 ¥1.40万元起 or ¥2.00元－¥10.00元 , 3  ¥2.00元
     min:minPrice,
     max:maxPrice,
     position:'detail'　　// list列表页 显示如 ¥1.40万元起    ,  detail 详情页 显示如 ¥2.00元－¥10.00元
 }}/>
 直接复制下面的用
 <PriceFormat data={{
     type:prepayType,
     min:minPrice,
     max:maxPrice,
     position:'detail'
 }}/>
 生成后的元素对照表

 <span class="prefix">¥</span>
 <span class="dollars">元</span>
 <span class="tenThousand">万</span>
 <span class="rise">起</span>
 */


const PriceFormat = (props) => {
    let data = props.data;
    let type = data.type;
    let html = '';
    let min = '';
    let max = '';
    if (data.position === 'list') {
        min = data.min > 1000000 ? (data.min / 1000000).toFixed(2) + '<span class="tenThousand">万</span>' : utils.priceDollars(data.min);
        max = data.min > 1000000 ? (data.max / 1000000).toFixed(2) + '<span class="tenThousand">万</span>' : utils.priceDollars(data.max);
    }
    if (data.position === 'detail') {
        min = utils.priceDollars(data.min);
        max = utils.priceDollars(data.max);
    }
    switch (type) {
        case 1:
            html = '可议价';
            break;
        case 2:
            let htmlMin = '<span class="prefix">¥</span>' +
                min +
                '<span class="priceDollars"></span>';
            if (data.position === 'list') {
                html = htmlMin + '<span class="rise">起</span>';
            }
            if (data.position === 'detail') {
                html = htmlMin +
                    '－' +
                    '<span class="prefix">¥</span>' +
                    max +
                    '<span class="priceDollars"></span>';
            }
            break;
        case 3:
            html = '<span class="prefix">¥</span>' +
                max +
                '<span class="priceDollars"></span>';
            break;
        default:
            break;
    }
    return (
        <span className="priceFormat" dangerouslySetInnerHTML={{__html: html}}/>
    );
};
export default PriceFormat;