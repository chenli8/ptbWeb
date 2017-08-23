import React from 'react'

import moment from 'moment-kirk';
class OrderNotes extends React.Component {
    constructor(props) {
        super(props);
        this.onNewProps(props)
    }

    componentWillReceiveProps(nextProps) {
        this.onNewProps(nextProps)
    }

    onNewProps(props) {

        this.state = {
            notes: props.notes,
        };
    }

    render() {
        var notes = this.state.notes;
        return (
            <div className="orderNotes fl">
                {notes.map((item) => {
                    return <li key={item.time}>
                                {item.operateDesc + "时间"}：{moment(item.time, "x").format('YYYY-MM-DD HH:mm')}
                                {
                                    item.type === 9 ?
                                        <span className="red">{"  " + item.addMessage}</span>
                                        :
                                        null
                                }
                        </li>
                })}
            </div>
        );
    }
}
export default OrderNotes;