import React, {Component} from 'react';
import "../../../public/css/about.css"

class About extends Component {

    constructor(props) {
        super(props)
        this.state = {};
    }

    render() {
        return (
            <div className="about clear">
                <div className="fl">
                    <i/>
                </div>
                <div className="fl aboutMain">
                    <h1>关于我们</h1>
                    <h2>企业介绍</h2>
                    <div className="aboutTxt">
                        <p>品推宝创立于2015年，主创团队来自国内一线互联网公司。</p>
                        <p>无论是信息内容本身的变迁，还是信息平台介质的演变，品推宝旨在创建新的信息传播领域的分工协作关系。</p>
                        <p>这也是品推宝的使命。</p>
                        <p>品推宝的产品或服务模式包括但不限于：</p>
                        <p>媒体交易平台，大数据中心，NLP，机器学习，新舆情，企业营销战略咨询......</p>
                        <p>品推宝团队是完全自主，开放，年轻，且富有激情的创业型团队。</p>
                        <p>我们拒绝任何鸡汤鸡血的公司管理文化，我们更注重团队里每一个人的阶段性成长。</p>
                        <p>品推宝一直秉持着一个信念： 失败的团队没有成功的个人</p>
                    </div>
                    <h2 id="contactUs">联系方式</h2>
                    <div className="aboutContact">
                        <div className="location">北京市朝阳区八里庄东里 莱锦创意产业园 CN02</div>
                        <div className="tel">010-85079618</div>
                        <div className="email">xiaomi@pintuibao.cn</div>
                        <div className="thirdInfo">
                            <span className="qq">
                                2582366402
                            </span>
                            <span className="wx">
                            summerxia99
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
