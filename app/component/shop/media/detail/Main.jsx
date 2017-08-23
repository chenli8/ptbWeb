/**
 * Created by Kirk liu on 2017/8/7.
 */
import React from 'react';
import utils from '../../../../public/js/utils';
import layer from '../../../../public/js/layer';
import serviceApi from '../../../../public/js/serviceApi';
import MediaInfo from './MediaInfo';
import ServiceAndArticle from './ServiceAndArticle';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            pMid: utils.urlParam('pMid'),
            type: utils.urlParam('type'),
            mbInfo: {},
            contact: '',
            statistics: {},
            hlRead: [],
            hlRead30: [],
            sdRead: [],
            sdRead30: [],
            tdRead: [],
            tdRead30: [],
            spread: [],
            spread30: [],
            comment: [],
            comment30: [],
            zan: [],
            zan30: [],
            isModify: false,
            tags: [],
            binded: 0,
            fansData: []
        };
    }

    ajaxGetMediaDetail() {
        let pMid = this.state.pMid;
        let type = this.state.type;
        //媒体资料信息（头像，名称，标签等信息）
        serviceApi('aMediaDetail', {pMid: pMid, type: type}, (data) => {
            this.setState({
                isLoad: true,
                mbInfo: data.mbInfo,
                contact: data.mbInfo.contact,
                statistics: data.statistics,
                hlRead: data.hlRead,
                hlRead30: data.hlRead30,
                sdRead: data.sdRead,
                sdRead30: data.sdRead30,
                tdRead: data.tdRead,
                tdRead30: data.tdRead30,
                spread: data.spread,
                spread30: data.spread30,
                comment: data.comment,
                comment30: data.comment30,
                zan: data.zan,
                zan30: data.zan30,
                tags: data.tags,
                binded: data.binded,
                fansData: data.fansData || []
            }, () => {
                utils.documentTitle([this.state.mbInfo.mediaName, (type == 1 ? '微信' : type == 2 ? '微博' : '直播') + '媒体'])
            });
        }, (data) => {
            layer.msg(data.message);
        });
    }

    componentDidMount() {
        this.ajaxGetMediaDetail();
    }

    render() {
        let state = this.state;
        let mbInfo = state.mbInfo;
        return (
            <div>
                {
                    this.state.isLoad ?
                        <div className="mediaDetail">
                            <MediaInfo data={mbInfo} type={state.type} pMid={state.pMid} state={state} statistics={state.statistics} binded={state.binded}/>
                            <ServiceAndArticle pMid={state.pMid} type={state.type} pubArticle={state.statistics.pubArticle}/>
                        </div>
                        : null
                }
            </div>
        );
    }
}
export default Main;