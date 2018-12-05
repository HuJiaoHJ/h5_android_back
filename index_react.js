import * as React from 'react';

export default (Target, handleBack) => {
    return class AndroidBack extends React.Component {
        _handles = []
        back = () => {
            window.history.go(-1);
        }
        componentDidMount () {
            // 通过调用 history.pushState() 方法添加一条历史记录
            history.pushState('_android_back', null, location.href);
            // 监听 popstate 事件，当点击Android物理返回键时，会触发该事件
            window.addEventListener('popstate', this.handlePopstate);
            if (handleBack) {
                // 添加自定义处理方法
                this._handles.push(handleBack);
            } else {
                // 如果没有自定义处理方法，默认调用 window.history.go(-1);
                this._handles.push(this.back);
            }
        }
        componentWillUnmount () {
            window.removeEventListener('popstate', this.handlePopstate);
        }
        // 触发一次popstate方法，则调用最新处理方法
        handlePopstate = () => {
            const handle = this._handles.pop();
            handle && handle();
        }
        // 通过调用push方法，新增一条历史记录，并添加对应处理方法
        push = (state, handle) => {
            if (handle) {
                history.pushState(state, null, location.href);
                this._handles.push(handle);
            }
        }
        render () {
            return (
                <Target {...this.props} _android_back_push={this.push}/>
            );
        }
    };
};