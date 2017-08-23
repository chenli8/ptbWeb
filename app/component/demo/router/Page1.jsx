/**
 * Created by Kirk liu on 2017/7/16.
 */
import React from 'react';

const Page1 = ({location,match}) =>{
    return (
        <div className="routerChildren">
            <h2>page1</h2>
            <h3>获取URL 传参值 {match.params.pageId}</h3>
        </div>
    );
};
export default Page1;