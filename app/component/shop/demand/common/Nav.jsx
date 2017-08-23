/**
 * Created by Kirk liu on 2017/7/25.
 */
import React from 'react';
const Nav = (props) =>(
    <div className="demandNav">
        <ul>
            <li>首页<i className="ico-right"/></li>
            <li>需求大厅<i className="ico-right"/></li>
            <li>{props.name}<i className="ico-right"/></li>
        </ul>
    </div>
)
export default Nav;