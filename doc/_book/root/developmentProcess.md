## 开发流程

1. 建立组件
    * /app/component/ 固定目录,所有业务组件在此目录下.
    * demo 模块目录,所有模块放在单独的文件夹下
    * Index.jsx 模块输出 入口文件,固定写法,统一以Index命名

2. 配置输出入口文件 /app/entry/demo/index.js
    * /app/entry/ 固定目录
    * demo 模块名称
    * index.js 模块输出入口文件. 
    * 统一写法,只需要修改模块名即可 demo -> xxxx
    ```
    import React from 'react';
    import ReactDOM from 'react-dom';
    import Index from '../../component/demo/Index.jsx';
    
    ReactDOM.render(<Index />,document.getElementById('app'));
    ```

3. 建立页面 config/webpack/webpack.entry.conf.js
    ```
    name:['src','title'] //demo: ['./app/entry/demo/index.js','案例']
    ```
    * name: 将来生成的html文件名 如:name.html
    * src: 输出文件的入口地址 
    * title: 将来生成的html内容标题 
    



