import React from 'react'

class SelectInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleDrop(index) {
        this.props.onDrop(index, this.props.dropType)
    }

    handleToggle(e) {
        e.nativeEvent.stopImmediatePropagation();
        this.props.onToggle(this.props.dropType, e);
    }

    render() {
        let data = this.props.data;
        let currName = '';
        switch (this.props.dropType) {
            case 'plat':
                currName = data.filter(function (data) {
                    return data.type == this.props.currIndex
                }.bind(this))[0].plat;
                break;
            default:
                currName = data[this.props.currIndex];
        }
        return (
            <div className="selectInput fl" style={{width: '120px', height: '24px', lineHeight: '22px'}}
                 onClick={this.handleToggle.bind(this)}>
                <div className="selected fl">{currName}
                </div>
                <i className="arrowGrayDown fr"><i className="arrowGrayDownCopyBackH fl"/></i>
                {this.props.isDisplayed ?
                    <div className="list" ref="list">
                        {
                            this.props.dropType == 'plat' ?
                                <ul>
                                    {data.map(function (data) {
                                        return <li key={this.props.dropType + data.type}
                                                   onClick={this.handleDrop.bind(this, data.type)}>{data.plat}</li>
                                    }.bind(this))}
                                </ul> :
                                <ul>
                                    {data.map(function (data, index) {
                                        return <li key={this.props.dropType + index}
                                                   onClick={this.handleDrop.bind(this, index)}>{data}</li>
                                    }.bind(this))}
                                </ul>
                        }

                    </div> : null
                }
            </div>
        )
    }
}
SelectInput.defaultProps = {
    currIndex: 0
};
export default SelectInput;