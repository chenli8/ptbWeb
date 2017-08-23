/**
 * Created by Kirk liu on 2017/7/16.
 */
import React from 'react';

const Page3 = ({history,location,match}) =>{

    return (
        <div className="routerChildren">
            <h2>page3</h2>
            <h3>获取URL 传参值 {match.params.pageId}</h3>
            <h3>获取URL search {location.search}</h3>
            <h3>获取URL hash {location.hash}</h3>
            <h3>获取 state {location.state && location.state.name}</h3>
        </div>
    );
};
export default Page3;