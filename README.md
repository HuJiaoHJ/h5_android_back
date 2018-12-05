# H5页面监听Android物理返回键

移动端H5页面是监听不了Android物理返回键的点击事件，一般webview的默认行为同 `window.history.go(-1)` ，但是在实际需求场景下，简单的页面回退并不能满足需求，所以需要H5页面监听Android物理返回键从而自定义处理方法。

## 使用

两种方式：

1、将对象挂在window上，支持任意页面接入，使用如下：

**index.js**

```JavaScript
// 监听Android物理返回键，自定义处理方法
window.AndroidBack.listen(() => {
    console.log('back');
});
// 新增Android物理返回键监听事件，使用场景，比如：页面内弹出浮层，点击Android物理返回键，不是回退页面，而是关闭浮层
window.AndroidBack.push('close_modal', () => {
    // 关闭弹窗
    console.log('close_modal');
});
```

2、封装了React高阶组件，支持React项目接入，使用如下：

**index_react.js**

```JavaScript
import * as React from 'react';
import AndroidBack from 'h5_android_back/index_react.js';

class App extends React.Component {
    // ...
    openModal = () => {
        // 新增Android物理返回键监听事件，使用场景，比如：页面内弹出浮层，点击Android物理返回键，不是回退页面，而是关闭浮层
        this.props._android_back_push('close_modal', () => {
            // 关闭弹窗
            console.log('close_modal');
        });
    }
}

// 监听Android物理返回键，自定义处理方法
export default AndroidBack(App, () => {
    console.log('back');
})
```