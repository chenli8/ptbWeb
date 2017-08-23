# 样式
* 参考: http://localhost:8000/demo.html#/Style         前提执行:npm run dev
* source:app/component/dome/Style.jsx

```
import React from 'react';
import '../../public/css/demo.css';
import '../../public/css/common.css';
class Style extends React.Component {
    render() {
        return (
            <div>
                <h2>样式示列</h2>
                <div>图片小于等于8k 输出base64</div>
                <i className="img-demo1"> </i>
                <div>图片大于8k 压缩后 输出到 resource 文件夹</div>
                <i className="img-demo2"> </i>
            </div>
        );
    }
}
export default Style;

```