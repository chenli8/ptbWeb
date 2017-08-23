/**
 * Created by Kirk liu on 2017/7/19.
 */
import React from 'react';
import cookie from 'react-cookie';
import urlManager from './../../public/js/urlManager';
import layer from './../../public/js/layer';

const Footer = () =>(
    <div className="footer">
        <div className="footerCon">
            <div className="footerConTop">
                <div className="codeCon fl">
                    <dl>
                        <dt>
                          <i className="ico-code1"> </i>
                        </dt>
                        <dd>
                            下载 APP
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <i className="ico-code2"> </i>
                        </dt>
                        <dd>
                            微信公众号
                        </dd>
                    </dl>
                </div>
                <div className="Contact fl">
                    <ul>
                        <li>
                            <i className="fl ico-phone"> </i>
                            <span>010-85079450</span>
                        </li>
                        <li>
                            <i className="fl ico-email"> </i>
                            <span>service@pintuibao.cn</span>
                        </li>
                        <li>
                            <i className="fl ico-qq"> </i>
                            <span>616433741 交流群</span>
                        </li>
                    </ul>
                </div>
                <div className="aboutOur fl">
                    <ul className="fl">
                        <li>我是需求方</li>
                        <li>
                            <ol>
                               {/* <li><a href="javascript:;">常见问题</a></li>*/}
                                <li><a href={urlManager.pDemandCreate}>发布需求</a></li>
                                <li><a href={urlManager.pService+"#/ShopSupplier"}>找服务商 </a></li>
                            </ol>
                        </li>
                    </ul>
                    <ul className="fl">
                        <li>我是服务商</li>
                        <li>
                            <ol>
                               {/* <li><a href="javascript:;">常见问题</a></li>*/}
                                <li><a href="javascript:;" onClick={()=>{
                                    if(cookie.load('shopId') > 0){
                                        layer.msg('已开通店铺');
                                    }else{
                                        window.location.href = urlManager.pCreateShop;
                                    }
                                }}>入驻开店</a></li>
                            </ol>
                        </li>
                    </ul>
                    <ul className="fl">
                        <li>关于我们</li>
                        <li>
                            <ol>
                                <li><a href={urlManager.pAbout}>企业介绍</a></li>
                            </ol>
                        </li>
                        <li>
                            <ol>
                                <li><a href={urlManager.pAgreement}>平台规则</a></li>
                            </ol>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footerConBtm">
                <p className="fl">
                    版权所有©北京品推宝移动科技有限公司
                    <b>京ICP备16029394号-1</b>
                </p>
            </div>
        </div>
    </div>
);
export default Footer;