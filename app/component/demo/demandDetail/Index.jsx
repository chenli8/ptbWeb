import React, {Component} from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import SearchBtn from '../../common/SearchBtn.jsx';

import '../../../public/css/demandDetail.css';
import TimeStep from "../TimeStep";

const timeStepList = [
    {position:0, title:"填写需求，签单", subTitle:"审核通过", status:2},
    {position:1, title:"确认执行", subTitle:"审核中", status:1},
    {position:2, title:"验收并付款", subTitle:"", status:0},
    {position:3, title:"评价", subTitle:"", status:0}
];

const Index =()=>(
    <div>
        <Header/>
         <div className="container">
             <div className="demandDetail">
                 <SearchBtn/>
                 <div className="demandNav">
                     <ul>
                         <li>首页<i className="ico-right"> </i></li>
                         <li>需求大厅<i className="ico-right"> </i></li>
                         <li>需求详情<i className="ico-right"> </i></li>
                     </ul>
                 </div>
                 <div className="BuyerStep">
                     <TimeStep data={timeStepList}/>
                 </div>

                 {/*<div className="BuyerStep">*/}
                     {/*<div className="icoStep fl">*/}
                         {/*<i>1</i>*/}
                         {/*<span className="stepState">填写需求，签单</span>*/}
                     {/*</div>*/}
                     {/*<div className="fl solid firstSolid"> </div>*/}
                     {/*<div className="icoStep fl">*/}
                         {/*<i>1</i>*/}
                         {/*<span>确认执行</span>*/}
                     {/*</div>*/}
                     {/*<div className="fl solid secondSolid"> </div>*/}
                     {/*<div className="icoStep fl">*/}
                         {/*<i>1</i>*/}
                         {/*<span>验收并付款</span>*/}
                     {/*</div>*/}
                     {/*<div className="fl solid thirdSolid"> </div>*/}
                     {/*<div className="icoStep fl lastStep">*/}
                         {/*<i>1</i>*/}
                         {/*<span>评价</span>*/}
                     {/*</div>*/}
                 {/*</div>*/}
                 {/*待审核*/}
                  <div className="Review">
                      <div className="head">
                           <div className="fl">需求暂未发布，请耐心等待审核...</div>
                           <a href="javascript:;" className="fr theme-button-bg">修改需求</a>
                           <a href="javascript:;" className="fr changeBtn">取消需求</a>
                      </div>
                      <div className="main">
                            <div className="top">
                               <div className="title">
                                   我需要微信营销我需要微信营销
                                   <b>可议价</b>
                               </div>
                               <div className="num">
                                   <ul>
                                       <li>
                                            <b>0</b>名服务商应答需求 / 剩余<b>5</b>次机会
                                       </li>
                                       <li></li>
                                       <li>
                                             距离结束还剩    <b>12小时</b>
                                       </li>
                                   </ul>
                               </div>
                            </div>
                            <div className="btm">
                                <div className="btmNum">
                                    <div>需求号：</div>
                                    <b>323123414143131</b>
                                </div>
                                <div className="btmdesc">
                                    <div>需求描述:</div>
                                    <div className="desc">
                                        一、活动简介
                                        南川有31.4万亩水稻处于海拔600—900米的倒置山区，无污染源，受金佛山小气候的影响，其日平均气温相对较低，昼夜温差大，作物生长期长，有利于优质米的形成。南川是天然的优质稻米产区，为重庆市中高档优质稻最适宜的种植区域之一。

                                        南川贡米色泽白润如玉，煮饭香软适口，煮粥粘而不腻，营养价值极高。均产自南川富硒和足硒区域，是货真价实的”富硒”土特产品。袁隆平先生亲临种植现场并题字“南川米好”。

                                        如今借助猪八戒平台千万网民的力量，征集南川米宣传口号，为以后南川的市场开拓打下坚实的基础。

                                        二、大赛要求
                                        1. 征集范围：面向全社会公开征集，企业、社会团体、自然人均可参与。
                                        2.作品要求围绕南川贡米
                                        3.宣传口号要求：主题鲜明、文字简练、朗朗上口并有美感，通俗易懂易记且突出南川本地特色。

                                        三、活动组织
                                        主办单位：重庆市金佛山粮油（集团）有限公司
                                        承办单位：猪八戒网
                                        协办单位：南川区农委
                                        四、大赛奖金
                                        第一名      1名     奖金40000元
                                        第二名      4名     奖金5000元
                                        第三名      10名    奖金2000元
                                        ps：所有大赛奖项奖金均为税前金额
                                        五、大赛征集时间
                                        2015年12月31日----2016年1月31日
                                    </div>
                                    <div className="attach">
                                       <p>附件</p>
                                        <ul>
                                            <li>
                                                千家快服人工智能O2O项目商业计划书_网页.pptx
                                                <a href="javascript:;">下载</a>
                                            </li>
                                            <li>
                                                千家快服人工智能O2O项目商业计划书_网页.pptx
                                                <a href="javascript:;">下载</a>
                                            </li>
                                            <li>
                                                千家快服人工智能O2O项目商业计划书_网页.pptx
                                                <a href="javascript:;">下载</a>
                                            </li>
                                            <li>
                                                千家快服人工智能O2O项目商业计划书_网页.pptx
                                                <a href="javascript:;">下载</a>
                                            </li>
                                            <li>
                                                千家快服人工智能O2O项目商业计划书_网页.pptx
                                                <a href="javascript:;">下载</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                      </div>
                  </div>
                 <div className="supplier">
                     <div className="title">
                         已应答服务商（6）
                         <a href="javascript:;" className="answerBtn fr theme-button-bg">我要应答</a>
                     </div>
                     <div className="content">
                          {/* <p>暂时还没有服务商应答</p>*/}
                          <div className="item">
                              <div className="top">
                                  <div className="left fl">
                                     <div className="img fl">
                                          <div className="pic">
                                              <i></i>
                                          </div>
                                     </div>
                                      <div className="info fl">
                                            <div className="name">
                                                北京墨言堂图文设计有限公司
                                            </div>
                                          <div className="server">
                                              服务范围：设计 户外广告 书籍设计 卡片印刷
                                          </div>
                                             <div className="address">
                                                 公司 北京 朝阳
                                             </div>
                                      </div>
                                  </div>
                                  <div className="right fl">
                                      <div className="payData">
                                          <ul>
                                              <li>
                                                  <span className="nums">100笔</span>
                                                  <span className="desc">成交量</span>
                                              </li>
                                              <li>
                                                  <span className="nums">90%</span>
                                                  <span className="desc">好评率</span>
                                              </li>
                                          </ul>
                                      </div>
                                     {/* <a href="javascript:;">联系卖家</a>
                                      <a href="javascript:;">进入店铺</a>
                                      <a href="javascript:;">确认签单</a>*/}
                                      <a href="javascript:;" className="enterShop">进入店铺</a>
                                  </div>
                              </div>
                              <div className="btm">
                                     <div className="price">
                                         报价：<b>￥12123</b>
                                     </div>
                                     <div className="sererDec">
                                         服务描述：我曾经做过什么什么，我觉得挺符合的。我曾经做过什么什么，我觉得挺符合的。
                                         我曾经做过什么什么，我觉得挺符合的。我曾经做过什么什么，我觉得挺符合的。
                                         我曾经做过什么什么，我觉得挺符合的。我曾经做过什么什么，我觉得挺符… <a href="javascript:;" className="allShow">展开全部</a>
                                     </div>
                              </div>
                          </div>
                     </div>
                 </div>
                 {/*创建需求*/}
                 {/* <div className="CreatDemand">
                      <div className="WriteDemand">
                          <span>需求类别<b>(必填)</b>:</span>
                          <select name="" id="" className="DemandType">
                              <option value="请选择您要的服务类型">请选择您要的服务类型 </option>
                          </select>
                      </div>
                     <div className="WriteDemand">
                         <span>需求名称<b>(必填)</b>:</span>
                         <input type="text" placeholder="一句话描述你的服务需求(不少于15字) " className="DemandName"/>
                     </div>
                     <div className="WriteDemand">
                         <span>需求预算<b>(必填)</b>:</span>
                         <div className="DemandDudget">
                              <div>
                                  <input type="radio"/><span>可议价</span>
                                  <input type="radio"/><span>预算区间</span>
                                  <input type="radio"/><span>预算价格</span>
                              </div>
                         </div>
                     </div>
                     <div className="WriteDemand">
                         <span>执行地点<b>(选填)</b>:</span>
                         <div>
                             <select name="" id="" className="DemandLocal">
                                 <option value="">省 </option>
                             </select>
                             <select name="" id="" className="DemandLocal">
                                 <option value="">市 </option>
                             </select>
                         </div>
                     </div>
                     <div className="WriteDemand">
                         <span>具体需求描述:</span>
                         <textarea className="Demanddesc" placeholder="详细的需求描述(不少15字)">
                         </textarea>
                         <a href="javascript:;" className="addAttach fl">添加附件</a>
                         <div className="fl Attachtip">最多可添加5个附件，每个大小不超过10M。<a href="javascript:;">上传遇到问题？</a></div>
                     </div>
                     <div className="WriteDemand">
                         <span>手机验证<b>(必填):</b></span>
                         <div>
                             <input type="text" className="writeInput" placeholder="手机号"/>
                             <input type="text" className="wirteTest writeInput" placeholder="短信验证码"/>
                             <a  href="javascript:;" className="getTest fr">获取短信验证</a>
                             <a  href="javascript:;" className="PublishBtn theme-button-bg">立即发布需求</a>
                         </div>
                     </div>
                 </div>*/}
             </div>
         </div>
        <Footer/>
    </div>
)

export default Index;
