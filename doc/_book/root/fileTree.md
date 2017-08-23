## 文件组织
    ptb-web 工程目录
        --app 主目录
            |--component 组件目录
                |--common 所有页面公共部分
                |--demo 示例目录
                |--shop 交易目录
                    |--demand 需求大厅
                    |--service 服务大厅
                    |--supplier 服务商库
                |--user 用户中心
                    |--buyer 买家中心
                    |--seller 卖家中心
                    |--common 用户中心公共部分
                    |--account 账户设置
            |---entry 生成HTML配置目录
            |---public 公共目录
            |---service 接口目录
        --appConfig
            |-gulp
            |-webpack webpack 配置目录
        --backup 生产:备份目录RAR(自动生成)
        --build 构建目录(自动生成)
        --node_modules 包目录(自动生成)
        --doc 工程使用说明
        --pc 发布上线目录(自动生成)
        --.gitignore git排除目录
        --gulpfile.js gulp 任务配置
        --package.json 包管理文件
        --README.md 说明
