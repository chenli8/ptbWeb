# 生命周期

1. 设置状态：setState
2. 替换状态：replaceState
3. 设置属性：setProps
4. 替换属性：replaceProps
5. 强制更新：forceUpdate
6. 获取DOM节点：getDOMNode
7. 判断组件挂载状态：isMounted

## 初始化

* getDefaultProps               默认属性（只调用一次，实例之间共享引用）
* getInitialState               初始化状态（初始化每个实例特有的状态）
* componentWillMount            组件将装载（render之前最后一次修改状态的机会）（在渲染前调用,在客户端也在服务端。）
* render                        渲染（只能访问this.props和this.state，只有一个顶层组件，不允许修改状态和DOM输出）
* componentDidMount             （成功render并渲染完成真实DOM之后触发，可以修改DOM）在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异部操作阻塞UI)。

## 运行中

* componentWillReceiveProps     （父组件修改属性触发，可以修改新属性、修改状态）在组件接收到一个新的prop时被调用。这个方法在初始化render时不会被调用。
* shouldComponentUpdate         （返回false会阻止render调用）返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 
* componentWillUpdate           （不能修改属性和状态）在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
* render                        （只能访问this.props和this.state，只有一个顶层组件，不允许修改状态和DOM输出）
* componentDidUpdate            （可以修改DOM）在组件完成更新后立即调用。在初始化时不会被调用。

## 销毁
* componentWillUnmount           （在删除组件之前进行清理操作，比如计时器和事件监听器）在组件从 DOM 中移除的时候立刻被调用。
