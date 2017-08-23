import React from 'react'

class SortType extends React.Component {
    handleDrop(index) {
        this.props.onDrop(index, this.props.dropType)
    }

    handleToggle(e) {
        e.nativeEvent.stopImmediatePropagation();
        this.props.onToggle(this.props.dropType);
    }

    handleSort(index) {
        this.props.onSort(index)
    }

    render() {
        var data = this.props.data;
        var name = data.filter(function (data) {
            return data.type == this.props.currIndex
        }.bind(this));
        var currData = name.length == 0 ? data[0] : name[0];
        var maxCurrNum = null;
        switch (this.props.dropType) {
            case 'd9':
                maxCurrNum = 4;
                break;
            case 'd9wb':
                maxCurrNum = 7;
                break;
            case 'd9zb':
                maxCurrNum = 5;
                break;
        }

        return (
            <div className={this.props.currIndex >= maxCurrNum ? "selectInput curr fl" : "selectInput fl"}
                 style={{width: '141px', height: '24px', lineHeight: '22px'}}>
                <div className="selected fl" onClick={this.handleToggle.bind(this)}>{currData.name}
                </div>
                <i className="arrowGrayDown fr" onClick={this.handleToggle.bind(this)}><i
                    className="arrowGrayDownCopyBackH fl"/></i>
                {this.props.isDisplayed ?
                    <div className="list" ref="list">
                        <ul>
                            {data.map(function (data) {
                                return <li key={this.props.dropType + data.type}
                                           onClick={this.handleDrop.bind(this, data.type)}>{data.name}</li>
                            }.bind(this))}
                        </ul>
                    </div> : null
                }
            </div>
        )
    }
}
SortType.defaultProps = {
    currIndex: 0
};
export default SortType