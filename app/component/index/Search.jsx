/**
 * Created by Kirk liu on 2017/7/19.
 */
import React from 'react';
import urlManager from '../../public/js/urlManager.js';
import serviceApi from '../../public/js/serviceApi';
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchName: [
                {name: "找服务", url: urlManager.pService + '#/ShopService', id: 1},
                {name: "找需求", url: urlManager.pDemand + '#/Ongoing', id: 2}
            ],
            searchId: 1,
            searchUrl: urlManager.pService + '#/ShopService',
            serviceHot:'',
            demandHot:''
        };
    }
    commonBlock(){
        serviceApi("aCommonBlock",{code:'WEB_hotword_v2'},(data)=>{
            let dataList = JSON.parse(data);
            this.setState({serviceHot:dataList[0].children,demandHot:dataList[1].children});
        },()=>{

        })
    }
    componentDidMount() {
        this.commonBlock()
    }

    render() {
        let state = this.state;
        return (
            <div className="search">
                <a href={urlManager.pNotice} className="anonDetail" target="_black">
                <div className="announcement"/>
                </a>
                <div className="searchCon">
                    <div className="subNav">
                        {
                            state.searchName.map((data) => {
                                return (
                                    <a href="javascript:;" key={data.id}
                                       className={data.id == state.searchId ? "on" : null}
                                       onClick={() => {
                                           this.setState({searchId: data.id, searchUrl: data.url})
                                       }}
                                    >
                                        {data.name}
                                    </a>
                                )
                            })
                        }
                    </div>
                    <div className="searchInput">
                        <i className="ico-search"> </i>
                        <div className="searchLeft fl">
                            <input type="text" className="searchText fl" placeholder="请输入关键词" ref="searchInput"
                                   onKeyPress={(e) => {
                                       if (e.which === 13) {
                                           this.refs.searchSub.click();
                                       }
                                   }
                                   }
                            />
                            <a href="javascript:;" className="searchBtn fl theme-orange" ref="searchSub"
                               onClick={() => {
                                   window.location.href = state.searchUrl + '/' + encodeURIComponent(this.refs.searchInput.value)
                               }}
                            >搜索</a>
                        </div>
                        <a href={urlManager.pDemandCreate} className="publishBtn fr theme-orange">发布需求</a>
                    </div>
                    <div className="serachHot">
                        <span className="fl">热门搜索 ：</span>
                    {
                        state.searchId == 1 ?
                            state.serviceHot ?
                                state.serviceHot.map((data)=>{
                                    if(data.type.length>0){
                                        if(data.type.length == 1){
                                            return <a href={urlManager.pService + '#/ShopService/?c1=' + data.type[0].id + '&l1=1'} key={data.id}>{data.name}</a>
                                        }
                                        if(data.type.length == 2){
                                            return <a href={urlManager.pService + '#/ShopService/?c1=' + data.type[0].id + '&l1=1' +
                                            '&c2=' + data.type[1].id + '&l2=2'} key={data.id}>{data.name}</a>
                                        }
                                    }else{
                                        return <a href={urlManager.pService + '#/ShopService/' + data.name} key={data.id}>{data.name}</a>
                                    }
                                })
                                :
                                null
                            :
                            state.demandHot ?
                                state.demandHot.map((data)=>{
                                    if(data.type.length>0){
                                        if(data.type.length == 1){
                                            return <a href={urlManager.pDemand + '#/Ongoing/?c1=' + data.type[0].id + '&l1=1'} key={data.id}>{data.name}</a>
                                        }
                                        if(data.type.length == 2){
                                            return <a href={urlManager.pDemand + '#/Ongoing/?c1=' + data.type[0].id + '&l1=1' +
                                            '&c2=' + data.type[1].id + '&l2=2'} key={data.id}>{data.name}</a>
                                        }
                                    }else{
                                        return <a href={urlManager.pDemand + '#/Ongoing/' + data.name} key={data.id}>{data.name}</a>
                                    }
                                })
                                :
                                null
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;