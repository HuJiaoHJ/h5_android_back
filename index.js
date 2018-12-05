(function (pkg) {
    var STATE = '_android_back';

    var _android_back_handles = [];

    var handlePopstate = function () {
        var handle = _android_back_handles.pop();
        handle && handle();
    };

    var listen = function (handle) {
        _android_back_handles.push(handle);
    };

    var push = function (state, handle) {
        if (handle) {
            history.pushState(state, null, location.href);
            handle && _android_back_handles.push(handle);
        }
    };
    
    const init = function () {
        history.pushState(STATE, null, location.href);
        window.addEventListener('popstate', handlePopstate);
        this.listen = listen;
        this.push = push;
    };

    init.call(window[pkg] = window[pkg] || {});
})('AndroidBack');