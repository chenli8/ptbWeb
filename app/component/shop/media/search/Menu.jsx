import React from 'react'
import urlManager from '../../../../public/js/urlManager.js'

const Nav = (props) =>{
    let pathname = props.location.pathname;
    return (
        <div>
             {/* <div className="nav">
                 <ul className="clear">
                     <li className={pathname == '/wx' ? 'on' : null}
                     ><a href={urlManager.pMediaSearch + '?date='+ new Date().getTime() +'#/wx'}>微信</a></li>
                     <li className={pathname == '/wb' ? 'on' : null}
                     ><a href={urlManager.pMediaSearch + '?date='+ new Date().getTime() +'#/wb'}>微博</a></li>
                     <li className={pathname == '/zb' ? 'on' : null}
                     ><a href={urlManager.pMediaSearch + '?date='+ new Date().getTime() +'#/zb'}>直播</a></li>
                 </ul>
             </div>*/}
            <div className="subNav">
                <a href={urlManager.pMediaSearch + '?date='+ new Date().getTime() +'#/wx'} className={pathname == '/wx' ? 'on' : null}>微信</a>
                <a href={urlManager.pMediaSearch + '?date='+ new Date().getTime() +'#/wb'} className={pathname == '/wb' ? 'on' : null}>微博</a>
                <a href={urlManager.pMediaSearch + '?date='+ new Date().getTime() +'#/zb'} className={pathname == '/zb' ? 'on' : null}>直播</a>
            </div>
        </div>
    )
};
export default Nav;