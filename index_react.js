import * as React from 'react';

export default (Target, handleBack) => {
    return class AndroidBack extends React.Component {
        _handles = []
        back = () => {
            window.history.go(-1);
        }
        componentDidMount () {
            history.pushState('_android_back', null, location.href);
            window.addEventListener('popstate', this.handlePopstate);
            if (handleBack) {
                this._handles.push(handleBack);
            } else {
                this._handles.push(this.back);
            }
        }
        componentWillUnmount () {
            window.removeEventListener('popstate', this.handlePopstate);
        }
        handlePopstate = () => {
            const handle = this._handles.pop();
            handle && handle();
        }
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