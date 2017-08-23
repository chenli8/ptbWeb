import React from 'react'
import TimeStep from "../common/TimeStep";
class OrderStatus extends React.Component {
    constructor(props) {
        super(props);
        this.onNewProps(props)
    }

    componentWillReceiveProps(nextProps) {
        this.onNewProps(nextProps)
    }

    onNewProps(props) {
        var orderInfo = props.orderInfo;
        var userType=this.props.userType;

        var data = [
            {title: "填写需求，签单", subTitle: "", status: 1},
            {title: "确认执行", subTitle: "", status: 0},
            {title: "验收并付款", subTitle: "", status: 0},
            {title: "评价", subTitle: "", status: 0}
        ]
        var title = '提交订单'
        var orderStatus = 0
        var orderStatusDesc = ''
        var orderStatusType=''
        var orderStatusDetail = ''
        if (orderInfo) {
            title = '订单详情'
            orderStatus = orderInfo.orderStauts;
            orderStatusDesc = orderInfo.orderStatusDesc
            orderStatusType=orderInfo.statusType;
            if(userType==1){
                 if(orderInfo.statusType==1){
                     orderStatusDetail = '订单创建成功，请等待卖家反馈订单价格'
                 }else if(orderInfo.statusType==2){
                     orderStatusDetail = '卖家已反馈价格，请尽快确认是否执行订单'
                 }else if(orderInfo.statusType==3){
                     orderStatusDetail = '请尽快支付预付款'
                 }else if(orderInfo.statusType==5){
                     orderStatusDetail = '等待卖家执行需求，提交投放结果'
                 }else if(orderInfo.statusType==6){
                     orderStatusDetail = '请确认执行结果并收货'
                 }else if(orderInfo.statusType==9 || orderInfo.statusType==13 || orderInfo.statusType==14){
                     orderStatusDetail = '订单执行完毕'
                 }else if(orderInfo.statusType==11){
                     orderStatusDetail = '买家取消订单'
                 }else if(orderInfo.statusType==12){
                     orderStatusDetail = '卖家拒单：' + orderInfo.sellerRefuseReason;
                 }else{
                     orderStatusDetail = ''
                 }
            }else{
                if(orderInfo.statusType==1){
                    orderStatusDetail = '收到订单，请反馈买家是否同意接单'
                }else if(orderInfo.statusType==2){
                    orderStatusDetail = '等待买家确认执行订单，在买家未确认前请不要开始服务'
                }else if(orderInfo.statusType==3){
                    orderStatusDetail = '等待买家支付预付款'
                }else if(orderInfo.statusType==5){
                    orderStatusDetail = '请按照需求执行服务投放，提交执行结果'
                }else if(orderInfo.statusType==6){
                    orderStatusDetail = '等待买家确认执行结果进行收货'
                }else if(orderInfo.statusType==9 || orderInfo.statusType==13 || orderInfo.statusType==14 ){
                    orderStatusDetail = '订单执行完毕'
                }else if(orderInfo.statusType==11){
                    orderStatusDetail = '买家取消订单'
                }else if(orderInfo.statusType==12){
                    orderStatusDetail = '卖家拒单：' + orderInfo.sellerRefuseReason;
                }else{
                    orderStatusDetail = ''
                }
            }
            if (orderInfo.orderStauts === 1) {
                data[1].status = 1
            } else if (orderInfo.orderStauts === 2) {
                data[1].status = 1
                data[2].status = 1
            } else if (orderInfo.orderStauts === 3) {
                data[1].status = 1
                data[2].status = 1
                data[3].status = 1
            }
        }
        this.state = {
            data: data,
            userType: userType,
            title: title,
            orderStatus: orderStatus,
            orderStatusDesc: orderStatusDesc,
            orderStatusType: orderStatusType,
            orderStatusDetail: orderStatusDetail
        };
    }

    getStatusClassName() {
        //返回不同的样式
        return "status fr"
    }

    render() {
        var state = this.state
        return (
            <div className="orderStatus">
                <div className="clear">
                    <span className="title">{state.title}</span>
                    <span className="content commonSingleLine">{state.orderStatusDetail}</span>
                    {
                        state.orderStatusDesc ?
                            <div className="status fr">
                                <i className={"orderStatus"+state.orderStatusType}></i>
                            </div>
                            :
                            null
                    }
                </div>
                {
                    state.orderStatus !== 4 ?
                        <div className="orderSteps"><TimeStep timeData={state.data}/></div>
                        :
                        null
                }

            </div>
        );
    }
}
export default OrderStatus;