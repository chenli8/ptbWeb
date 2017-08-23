/*
* 密码框组件
* <PwInput position="right" ref="password"/>
* position    top right bottom 三个位置
* 获取 值 this.refs.XXXXXXX.state.password
*
 *  */

import React from 'react';
import '../../../../public/css/shopPayType.css'
class PwNumKey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleLiOnclick(type, data) {
        this.props.handlePasswordOutput(type, data)
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        var THIS = this;
        var keyLi = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (data) {
            return <li key={data} onClick={function (e) {
                THIS.props.handlePwNumKeyClickShow(e);
                THIS.handleLiOnclick(1, data)
            }}>{data}</li>;
        });
        return (
            <div className={"numKey buttonGrayLi " + this.props.position+'Pos'} >
                <ul>
                    {keyLi}
                    <li className="numKey_del" onClick={function (e) {
                        THIS.props.handlePwNumKeyClickShow(e);
                        THIS.handleLiOnclick(0);
                    }}><i className="ico_unmKeyDel"/></li>
                    <li onClick={function (e) {
                        THIS.props.handlePwNumKeyClickShow(e);
                        THIS.handleLiOnclick(1, 0);
                    }}>0
                    </li>
                    <li className="numKey_ok" onClick={this.handlePwNumKeyClickHide}>完成</li>
                </ul>
                <span>
                                <i className="triangleBlackLeftSort transform90"/>
                                <span style={{marginTop: '-15px'}}>请使用虚拟键盘输入支付密码</span>
                            </span>
            </div>
        )
    }
}
class PwInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pwNumKey: false,
            password: ''
        };
    }
    /*存储密码*/
    handlePasswordOutput(type,data){
        if(type===1){
            if(this.state.password.length<=5){
                this.setState({password:this.state.password + data},function(){
                })
            }
        }else if(type===0){
            this.setState({password:this.state.password.substring(0,this.state.password.length-1)},function(){
            })
        }

    }
    handlePwNumKeyClickHideToggle(e) {
        e.nativeEvent.stopImmediatePropagation();
        this.setState({pwNumKey: !this.state.pwNumKey});
    }

    handlePwNumKeyClickShow(e) {
        e.nativeEvent.stopImmediatePropagation();
        this.setState({pwNumKey: true});
    }

    handlePwNumKeyClickHide(e) {
        e.nativeEvent.stopImmediatePropagation();
        this.setState({pwNumKey: false});
    }

    handlePwNumKeyClickOther() {
        this.setState({pwNumKey: false});
    }

    componentDidMount() {
        document.addEventListener('click',this.handlePwNumKeyClickOther.bind(this))
    }

    componentWillUnmount() {
        document.removeEventListener('click',null)
    }

    render() {
        let state = this.state;
        return (
            <div className="payType_payPw fl">
                <div className="fl" style={{"position": "relative"}}>
                    <input type="hidden" id="password" unselectable="on" autoComplete="off" maxLength="6"
                           readOnly="readOnly" value={state.password}/>
                    <div className="passwordInput fl"/>
                    <div className="pwBackgroundSix">
                        <ul>
                            <li/>
                            <li/>
                            <li/>
                            <li/>
                            <li/>
                            <li/>
                        </ul>
                    </div>
                    <div className="pwBlackSpots" onClick={this.handlePwNumKeyClickHideToggle.bind(this)}>
                        <ul>
                            {
                                state.password.split('').map(function (data, index) {
                                    return <li key={index}><i/></li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                {
                    state.pwNumKey
                        ?
                        <PwNumKey handlePasswordOutput={this.handlePasswordOutput.bind(this)}
                                  handlePwNumKeyClickShow={this.handlePwNumKeyClickShow.bind(this)}
                                  handlePwNumKeyClickHide={this.handlePwNumKeyClickHide.bind(this)}
                                  position={this.props.position}
                        />
                        :
                        null
                }
            </div>
        )
    }
}
export default PwInput;