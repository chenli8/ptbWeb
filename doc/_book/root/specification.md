## 命名规范:
1. 样式: 文件和类名 全是小驼峰命名. 如:indexHello.css   .indexHello
2. 组件: 文件和组件名 全是大驼峰命名. 如: LoginReg.jsx  class LoginReg
3. js: 文件名小驼峰: indexHello.js  变量小驼峰:var indexHello = 'hello'.
      常量名 全大写:INDEXHELLO
      方法名: 小驼峰 function indexHello(){}    var indexHello = () => {}
4. 文件夹：小驼峰式 如:loginReg

## 样式规范
1. 小图标名称一律以 ico-xxx 命名.
2. css小图标样式名称一律以该小图标文件名命名, 如:.ico-xxx
3. 所有图标 放在 i 标签中. 如:<i className="ico-xxx"> </i>
4. 所有本地资源图片一律存放在样式背景中.如:background-image: url("../img/demo1.png"); 尽量让图片小于8k.
5. 所有模块在根目录上定义一个全站唯一样式名.如 .index,子标签全部写成 如:.index .left
6. 禁止定义全局名. 如: .left , .right

## 文件组织
 以模块来区分存放
 如：媒体
 media 媒体 文件夹
    --detail 媒体详情 文件夹
    --library 媒体库 文件夹
    --search 媒体搜索 文件夹

## 静态文件
 存放在 public 文件夹下 js css img