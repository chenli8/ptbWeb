/**
 * Created by Kirk liu on 2017/8/7.
 */
import React from 'react';
import Article from './Article.jsx';

class ServiceAndArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isServiceArticleList:true,
            pMid:this.props.pMid,
            type:this.props.type,
            pubArticle:this.props.pubArticle
        };
    }
    componentDidMount() {

    }

    render() {
        let state = this.state;
        return (
            <div className="serviceArticle">
                <div className="isServiceArticleList fl">
                    {/*<a href="javascript:;" onClick={this.isServiceArticleList.bind(this,1)} className={state.isServiceArticleList ? "on" : ""}>代理信息</a>
                    <a href="javascript:;" onClick={this.isServiceArticleList.bind(this,0)} className={state.isServiceArticleList ? "" : "on"}>近期发布</a>*/}
                   {/* <div className='tips'>
                        发现恶意报价?
                        <a href='#'
                           onClick={function () {
                               chatUtils.chatServiceShow()
                           }}
                        >
                            点此举报</a>
                    </div>*/}
                </div>
                {
                    state.isServiceArticleList ?
                        <Article pMid={state.pMid} type={state.type} pubArticle={state.pubArticle} />
                        :
                        null
                }
            </div>
        );
    }
}
export default ServiceAndArticle;