/**
 * Created by Kirk liu on 2017/7/17.
 */
import React from 'react';
import serviceApi from '../../public/js/serviceApi';

class Api extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:""
        };
    }
    postApi(){
        this.postApi = serviceApi('aBanner_01',{},(data)=>{
            this.setState({data:data})
        },()=>{});
    }
    componentDidMount() {
        this.postApi();
    }
    componentWillUnmount(){
        this.postApi.abort(); /*组件卸载 停止ajax请求*/
    }
    render() {
        return (
            <div>
                接口请求 {this.state.data ? this.state.data.list[0].home_lbt.id : 0}
            </div>
        );
    }
}
export default Api;