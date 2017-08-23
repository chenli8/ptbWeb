# 组件

## 第一种写法
```
// 引入react
import React from 'react'
// 建立组件
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                内容
            </div>
        );
    }
}
export default Index;
```
## 第二种写法
```
// 引入react
import React,{Component} from 'react' //区别在于提取 引入 Component
// 建立组件
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                内容
            </div>
        );
    }
}
export default Index;
```