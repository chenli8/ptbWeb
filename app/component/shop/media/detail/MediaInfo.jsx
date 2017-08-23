/**
 * Created by Kirk liu on 2017/8/7.
 */
import React from 'react';
import ChartsZhibo from './ChartsZhibo';
import Charts7And30 from './Charts7And30';
import chatUtils from '../../../common/chat/chatUtils';
import pubFun from '../../../../public/js/pubFun';
import urlManager from '../../../../public/js/urlManager';
class ContLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qrCodeMax: false,
            descFolding: false
        };
    }

    /*微信二维码*/
    handleClickMediaPage(e) {
        e.nativeEvent.stopImmediatePropagation();
        this.setState({qrCodeMax: !this.state.qrCodeMax});
    }

    handleClickOther() {
        this.setState({qrCodeMax: false, descFolding: false});
    }

    componentDidMount() {
        document.onclick = this.handleClickOther;//*其他地方*/
    }

    componentDidMount() {

    }

    render() {
        let data = this.props.data;
        let type = this.props.type;
        return (
            <div className="cont-left">
                <div className="left-top">
                    <div className="img fl">
                        {
                            type == 1
                                ?
                                <div className="pic fl">
                                    <i className="ico-picListWx fl"
                                       style={{backgroundImage: 'url(' + data.mediaImage + ')'}}/>
                                    <i className={ data.isAuth == 1 ? "icn_wxAuth" : null}/>
                                </div>
                                :
                                <div className="pic fl">
                                    <i className="ico-picListWb fl"
                                       style={{backgroundImage: 'url(' + data.mediaImage + ')'}}/>
                                    {
                                        type == 2 ?
                                            data.isAuth == 1 ? <i className="ico_wbAuthYellow"/> :
                                                data.isAuth == 2 ? <i className="ico_wbAuthBlue"/> : null : null
                                    }
                                </div>
                        }
                    </div>
                    <div className="info fl">
                        <div className="title">
                            {
                                type == 1 ? <i className="icn_wechat"/>
                                    :
                                    type == 2 ?
                                        <i className="icn_weibo"/>
                                        :
                                        <i className={"fl icn_zhibo" + data.type}/>
                            }

                            <span className="username">{data.mediaName}</span>
                            {
                                type == 1 ?
                                    data.isOriginal ? <i className="ico_isOriginal"/>
                                        :
                                        null
                                    : null
                            }
                        </div>
                        <div className="id">
                            {
                                type == 1 ? <span className="mediaId">微信号: {data.mediaId}</span>
                                    :
                                    type == 2 ?
                                        <span className="mediaId">ID: {data.mediaId}</span>
                                        :
                                        'ID: ' + data.mediaId
                            }
                            <div className="searchNew fr"><a href={urlManager.pService + '?date='+ new Date().getTime() + '#/ShopService/' + encodeURIComponent(data.mediaName)} target="_bank">去选购</a></div>
                            <div className='NumCon'>
                                <p className="fansNum">
                                    {data.fansNum > 0 ? <span
                                        dangerouslySetInnerHTML={{__html: pubFun.toFixedNumInfo(data.fansNum) + '<b>粉丝</b>'}}/> : null}
                                </p>
                                <p className="payData"><span className="ptbAFont">{data.dealNum}</span><span
                                    className="desc">成交</span></p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="left-btm">
                    <div className="lable">
                        <p className="tags">标签：</p>
                        <ul>
                            {
                                data.tagList ? data.tagList.map(function (data, index) {
                                    return <li key={index}>{data.length > 6 ? data.substring(0, 5) + '...' : data }</li>
                                }) : <span>暂无标签</span>
                            }
                        </ul>
                    </div>
                    {
                        data.authInfo ?
                            <p className="Authentication">认证：{data.authInfo}</p>
                            :
                            <p className="Authentication">暂无认证</p>
                    }

                    <div className="desc">
                        <span className="descBase fl">简介：{data.brief || '暂无'}</span>
                        {
                            this.state.descFolding ?
                                <span className="descFolding">简介：{data.brief}<i className="triangle-up"><i
                                    className="triangle-up-copy"/></i></span> : null
                        }
                    </div>
{/*                    <Head pMid={this.props.pMid} type={type} collection={data.collection}
                          binded={this.props.binded}/>*/}
                    <div className="mediaPage">
                        {
                            type == 1 ? <i className="ico-qrCodeMin" onClick={this.handleClickMediaPage}/>
                                :
                                type == 2 ?
                                    <a href={'http://weibo.com/u/' + data.pMid} target="_blank" className="mediaIndex">媒体主页<i
                                        className="arrowGrayDown transform90 fl"><i
                                        className="arrowGrayDownCopyBackFFF fl"/></i></a>
                                    :
                                    null
                        }
                        {
                            this.state.qrCodeMax ?
                                <i className="ico-qrCodeMax fr" onClick={this.handleClickMediaPage}
                                   style={{backgroundImage: 'url(' + data.mediaImage + ')'}}/>
                                :
                                ""
                        }
                    </div>
                </div>
            </div>
        );
    }
}
const MediaInfo = (props) => {
    let data = props.data;
    let type = props.type;
    let state = props.state;
    let statistics = props.statistics;
    return (
        <div className="mediaInfo fl">
            <div className="cont">
                <ContLeft data={data} type={type} binded={props.binded} pMid={props.pMid}/>
                <div className="cont-right">
                    <div className="medata-title">
                        媒体数据
                        <div className='fr error'>数据有误?
                            <a href='javascript:;'
                               onClick={() => {
                                   chatUtils.chatServiceShow()
                               }}
                            >点此反馈</a>
                        </div>
                    </div>
                    <div className="right-btm">
                        {
                            state.type >= 3 && state.type <= 6 ?
                                <ChartsZhibo data={state} type={state.type} mbInfo={data} statistics={statistics}/>
                                :
                                <Charts7And30 data={state} type={state.type} mbInfo={data} statistics={statistics}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};
export default MediaInfo;